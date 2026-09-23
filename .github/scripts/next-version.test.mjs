import { test } from 'node:test'
import assert from 'node:assert/strict'
import { nextVersion, increment, compare } from './next-version.mjs'

test('uses the package.json floor when it is ahead of what was released', () => {
  // The move from 0.1.x to 0.100.0.
  assert.equal(nextVersion({ releasedTag: '0.1.104', published: '0.1.104', pkg: '0.100.0' }), '0.100.0')
})

test('bumps the released version once the floor has been passed', () => {
  assert.equal(nextVersion({ releasedTag: '0.100.0', published: '0.100.0', pkg: '0.100.0' }), '0.100.1')
})

test('takes the higher of the tag and npm, so a run that published but never tagged is not repeated', () => {
  assert.equal(nextVersion({ releasedTag: '0.100.0', published: '0.100.1', pkg: '0.100.0' }), '0.100.2')
})

test('follows the release label', () => {
  assert.equal(nextVersion({ releasedTag: '0.100.3', published: '0.100.3', pkg: '0.100.0', bump: 'minor' }), '0.101.0')
  assert.equal(nextVersion({ releasedTag: '0.100.3', published: '0.100.3', pkg: '0.100.0', bump: 'major' }), '1.0.0')
})

test('compares numerically, not as text', () => {
  // 0.100.0 sorts before 0.99.0 as a string.
  assert.ok(compare('0.100.0', '0.99.0') > 0)
  assert.equal(nextVersion({ releasedTag: '0.99.9', published: '', pkg: '0.1.0' }), '0.99.10')
})

test('with nothing released yet, starts at the package.json version', () => {
  assert.equal(nextVersion({ releasedTag: '', published: '', pkg: '0.100.0' }), '0.100.0')
})

test('refuses a package.json version it cannot reason about', () => {
  assert.throws(() => nextVersion({ releasedTag: '0.1.0', published: '0.1.0', pkg: '1.0.0-beta.1' }))
  assert.throws(() => increment('0.1.0', 'sideways'))
})
