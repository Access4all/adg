import childProcess from 'node:child_process'
import crypto from 'node:crypto'

const excludedCommitIds = [
  'ac195754a6e64604066dafe2f5ad373c2a949ac4', // May 2, 2018   Absolutise paths
  '2c9c894097e3aaa65b4775f96c595b476c9b29b9', // May 16, 2018  JSONs
  '6b45656eb96adfcf23c6f47dc3564cf64e84d77f', // May 16, 2018  Fix examples links for GitHub
  'f0de1b4faceb9623b881d993e9df44f3f27fa8f3', // May 31, 2018  Fix relative links
  'f03b52f2b54b1c0d0de23027f574202852d3d21a', // Jun 12, 2018  Cleanup
  '077c23bfd14a84ba32faac7984231bfb6bfed089', // Jun 15, 2018  Cleanup
  '45a0b144e22e3179466b515a70550a409b4ab42c', // Sep 22, 2021  chore: update changed date
  'f6c1a521625159db489d65f7f98030482e418eab', // Aug 20, 2021  feat: change toc placeholder
  '8d2f1cf458bd1769c828cff79743d8878cf71276', // Jun 28, 2021  feat: change ToC insertion to manual mode
  'f84cdc3b77f12dc3170717f6025aeadf4c337bbb', // Jan 18, 2024  feat: replace http in urls with https
  'aac742ff1c64c608985a1be3777da79fa70bf292', // Jun 29, 2023  feat: remove manual changed date from markdown files
  'a3f8584dd30b0404cab50cb982b62a132e8e0582', // Jan 2, 2024   ADG-338 feat: rename contribution page
  '34da02f9b8caf03abc590e28d5bae79f8fc89e08', // Jan 27, 2024  ADG-338 feat: unify card text endings
  'c8cac292ac104b3dcd406c61091a5491448af7ea' // Dec 4, 2025   ADG-434 fix: remove duplicate positions
]

const excludedCommitIdsSet = new Set(
  excludedCommitIds.map(id => id.toLowerCase())
)
const gitHistoryRef = (() => {
  for (const ref of ['main', 'master', 'HEAD']) {
    const result = childProcess.spawnSync(
      'git',
      ['rev-parse', '--verify', ref],
      {
        encoding: 'utf8'
      }
    )

    if (result.status === 0) {
      return result.stdout.trim()
    }
  }

  return 'HEAD'
})()
const gravatarImageSize = 48

const getGravatarUrl = email => {
  if (!email) {
    return ''
  }

  const normalizedEmail = String(email).trim().toLowerCase()

  if (!normalizedEmail) {
    return ''
  }

  const hash = crypto.createHash('sha256').update(normalizedEmail).digest('hex')

  return `https://gravatar.com/avatar/${hash}?s=${gravatarImageSize}&d=mp`
}

export default () => {
  const changedMetadata = {}
  const fileMergeHistoryCache = {}
  const fileChangeStatsCache = new Map()

  const parseGitHistory = historyStdout =>
    historyStdout
      .split('\x1e')
      .map(item => item.trim())
      .filter(Boolean)
      .map(item => {
        const [
          commitId = '',
          changed = '',
          changedTimestamp = '',
          changedBy = '',
          changedByEmail = '',
          commitMessage = ''
        ] = item.split('\x1f')

        return {
          commitId,
          changed,
          changedTimestamp: Number(changedTimestamp),
          changedBy,
          changedByEmail,
          commitMessage,
          gravatarUrl: getGravatarUrl(changedByEmail)
        }
      })
      .filter(
        entry =>
          entry.commitId &&
          !excludedCommitIdsSet.has(entry.commitId.toLowerCase())
      )

  const getFileMergeHistory = filePath => {
    if (fileMergeHistoryCache[filePath]) {
      return fileMergeHistoryCache[filePath]
    }

    const historyStdout = childProcess.spawnSync(
      'git',
      [
        'log',
        gitHistoryRef,
        '--pretty=format:%H%x1f%ci%x1f%ct%x1f%an%x1f%ae%x1f%s%x1e',
        '-m',
        '--merges',
        '--first-parent',
        '--',
        filePath
      ],
      { encoding: 'utf8' }
    ).stdout

    const history = parseGitHistory(historyStdout)

    fileMergeHistoryCache[filePath] = history
    return history
  }

  const getFileChangeStats = (commitId, filePath) => {
    if (!commitId || !filePath) {
      return { linesAdded: 0, linesDeleted: 0 }
    }

    const cacheKey = `${commitId}\x1f${filePath}`

    if (fileChangeStatsCache.has(cacheKey)) {
      return fileChangeStatsCache.get(cacheKey)
    }

    const numstatStdout = childProcess.spawnSync(
      'git',
      [
        'show',
        '-m',
        '--first-parent',
        '--numstat',
        '--format=tformat:',
        commitId,
        '--',
        filePath
      ],
      { encoding: 'utf8' }
    ).stdout

    const [numstatLine = ''] = numstatStdout
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
    const [added = '0', deleted = '0'] = numstatLine.split('\t')
    const stats = {
      linesAdded: added === '-' ? 0 : Number(added) || 0,
      linesDeleted: deleted === '-' ? 0 : Number(deleted) || 0
    }

    fileChangeStatsCache.set(cacheKey, stats)
    return stats
  }

  const getGitMetadata = filePath => {
    if (changedMetadata[filePath]) {
      return changedMetadata[filePath]
    }

    const latestEntry = getFileMergeHistory(filePath)[0]

    const metadata = {
      changed: latestEntry ? latestEntry.changed : '',
      changedTimestamp: latestEntry ? latestEntry.changedTimestamp : 0,
      changedBy: latestEntry ? latestEntry.changedBy : '',
      gravatarUrl: latestEntry ? latestEntry.gravatarUrl : '',
      commitId: latestEntry ? latestEntry.commitId : '',
      commitMessage: latestEntry ? latestEntry.commitMessage : ''
    }

    changedMetadata[filePath] = metadata
    return metadata
  }

  return { getGitMetadata, getFileChangeStats, getFileMergeHistory }
}
