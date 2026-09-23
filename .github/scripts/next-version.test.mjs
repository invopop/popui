import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bumpFromMessages, nextVersion, increment, compare } from './next-version.mjs'

test('uses the package.json floor when it is ahead of what was released', () => {
  // The move from 0.1.x to 0.100.0, whatever the messages say.
  assert.equal(nextVersion({ releasedTag: '0.1.104', published: '0.1.104', pkg: '0.100.0' }), '0.100.0')
  assert.equal(
    nextVersion({ releasedTag: '0.1.104', published: '0.1.104', pkg: '0.100.0', bump: 'patch' }),
    '0.100.0'
  )
})

test('bumps by a minor once the floor has been passed, unless told otherwise', () => {
  assert.equal(nextVersion({ releasedTag: '0.100.0', published: '0.100.0', pkg: '0.100.0' }), '0.101.0')
  assert.equal(
    nextVersion({ releasedTag: '0.100.0', published: '0.100.0', pkg: '0.100.0', bump: 'patch' }),
    '0.100.1'
  )
  assert.equal(
    nextVersion({ releasedTag: '0.100.4', published: '0.100.4', pkg: '0.100.0', bump: 'major' }),
    '1.0.0'
  )
})

test('takes the higher of the tag and npm, so a run that published but never tagged is not repeated', () => {
  assert.equal(nextVersion({ releasedTag: '0.100.0', published: '0.101.0', pkg: '0.100.0' }), '0.102.0')
})

test('compares numerically, not as text', () => {
  // 0.100.0 sorts before 0.99.0 as a string.
  assert.ok(compare('0.100.0', '0.99.0') > 0)
  assert.equal(nextVersion({ releasedTag: '0.99.9', published: '', pkg: '0.1.0', bump: 'patch' }), '0.99.10')
})

test('with nothing released yet, starts at the package.json version', () => {
  assert.equal(nextVersion({ releasedTag: '', published: '', pkg: '0.100.0' }), '0.100.0')
})

test('refuses a package.json version it cannot reason about', () => {
  assert.throws(() => nextVersion({ releasedTag: '0.1.0', published: '0.1.0', pkg: '1.0.0-beta.1' }))
  assert.throws(() => increment('0.1.0', 'sideways'))
})

test('reads a minor by default, as the Go releases do', () => {
  assert.equal(bumpFromMessages(''), 'minor')
  assert.equal(bumpFromMessages('Merge pull request #218 from invopop/chore/automate-releases'), 'minor')
})

test('reads #patch, #minor and #major anywhere in a message', () => {
  assert.equal(bumpFromMessages('Fix the dropdown z-index #patch'), 'patch')
  assert.equal(bumpFromMessages('Rename the Sidebar props\n\n#major'), 'major')
  assert.equal(bumpFromMessages('#minor add a footer to DrawerContext'), 'minor')
  assert.equal(bumpFromMessages('fix: (#PATCH) spacing'), 'patch')
})

test('takes the largest marker across all the messages since the last release', () => {
  const messages = ['Tidy the stories #patch', 'Drop the old Button API #major', 'Add a prop #minor'].join('\n')
  assert.equal(bumpFromMessages(messages), 'major')
})

test('ignores what only looks like a marker', () => {
  // PR references, longer words and hashtags that merely start the same way.
  assert.equal(bumpFromMessages('Merge pull request #patch-notes from someone/branch'), 'minor')
  assert.equal(bumpFromMessages('Mention #patching and #majority and #minority'), 'minor')
  assert.equal(bumpFromMessages('Anchor link to docs##patch'), 'minor')
})
