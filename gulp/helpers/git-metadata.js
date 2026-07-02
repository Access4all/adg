import childProcess from 'node:child_process'
import crypto from 'node:crypto'

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

// Persist across watch rebuilds; git history does not change on every markdown save.
const changedMetadata = {}
const fileMergeHistoryCache = {}
const fileChangeStatsCache = new Map()
const commitMetadataCache = new Map()

export default () => {
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
      .filter(entry => entry.commitId)

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

  const getCommitMetadata = commitRef => {
    if (!commitRef) {
      return null
    }

    if (commitMetadataCache.has(commitRef)) {
      return commitMetadataCache.get(commitRef)
    }

    const result = childProcess.spawnSync(
      'git',
      [
        'log',
        '-1',
        '--pretty=format:%H%x1f%ci%x1f%ct%x1f%an%x1f%ae%x1f%s%x1e',
        commitRef
      ],
      { encoding: 'utf8' }
    )

    const metadata =
      result.status === 0 ? parseGitHistory(result.stdout)[0] || null : null

    commitMetadataCache.set(commitRef, metadata)

    if (metadata) {
      commitMetadataCache.set(metadata.commitId, metadata)
    }

    return metadata
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

  return {
    getGitMetadata,
    getFileChangeStats,
    getFileMergeHistory,
    getCommitMetadata
  }
}
