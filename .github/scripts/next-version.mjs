// Works out the next @invopop/popui version for the release workflow.
//
// The released version is whichever is higher of the newest `popui@*` tag and
// the latest version on npm. Both, because a run can publish to npm and then
// fail before tagging; taking the higher means the next run never tries to
// publish a version npm already has.
//
// svelte/package.json is a floor rather than the version: when it is higher
// than what was last released, it is used as-is, which is how a deliberate
// jump (0.100.0, 1.0.0) is made. Otherwise the released version is bumped by
// the PR's release label — patch unless told otherwise.
//
// Usage: node next-version.mjs --released-tag 0.1.104 --published 0.1.104 \
//          --package 0.100.0 --bump patch

const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/

export function parse(version) {
  const m = SEMVER.exec(String(version ?? '').trim())
  return m ? m.slice(1).map(Number) : null
}

export function compare(a, b) {
  const [pa, pb] = [parse(a), parse(b)]
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i]
  return 0
}

export function increment(version, bump) {
  const [major, minor, patch] = parse(version)
  if (bump === 'major') return `${major + 1}.0.0`
  if (bump === 'minor') return `${major}.${minor + 1}.0`
  if (bump === 'patch') return `${major}.${minor}.${patch + 1}`
  throw new Error(`unknown bump "${bump}"`)
}

export function nextVersion({ releasedTag, published, pkg, bump = 'patch' }) {
  const known = [releasedTag, published].filter((v) => parse(v))
  if (!parse(pkg)) throw new Error(`svelte/package.json has no plain x.y.z version: "${pkg}"`)
  if (known.length === 0) return pkg

  const released = known.reduce((a, b) => (compare(a, b) >= 0 ? a : b))
  if (compare(pkg, released) > 0) return pkg
  return increment(released, bump)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = Object.fromEntries(
    process.argv
      .slice(2)
      .reduce((pairs, arg, i, all) => (arg.startsWith('--') ? [...pairs, [arg.slice(2), all[i + 1]]] : pairs), [])
  )
  process.stdout.write(
    nextVersion({
      releasedTag: args['released-tag'],
      published: args.published,
      pkg: args.package,
      bump: args.bump || 'patch'
    }) + '\n'
  )
}
