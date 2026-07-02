import path from 'node:path'
import appConfig from '../../config.js'
import recentPagesConfig from '../../config/recent-pages.js'
import getGitMetadataFactory from './git-metadata.js'

const MIN_MEANINGFUL_REVISION_LINES = 4

const pathSeparatorRegExp = new RegExp('\\' + path.sep, 'g')

const {
  getGitMetadata,
  getFileChangeStats,
  getFileMergeHistory,
  getCommitMetadata
} = getGitMetadataFactory()

const githubRepoUrl = appConfig.repoUrl
const mergeOptions = {
  getFileMergeHistory,
  getFileChangeStats
}

const getCurrentUrl = (filePath, base) => {
  const relPath = path.relative(base, filePath)
  const lastSeparatorIndex = relPath.lastIndexOf(path.sep)

  return (
    lastSeparatorIndex >= 0 ? relPath.substring(0, lastSeparatorIndex) : ''
  ).replace(pathSeparatorRegExp, '/')
}

const trim = value => (typeof value === 'string' ? value.trim() : '')

const normalizeRecentPagesConfig = recentPages => {
  if (!Array.isArray(recentPages)) {
    return { urlOnly: [], commits: [] }
  }

  const urlOnly = []
  const commits = []

  for (const entry of recentPages) {
    if (typeof entry === 'string') {
      const url = entry.replace(/^\/+/, '').trim()

      if (url) {
        urlOnly.push(url)
      }

      continue
    }

    if (!entry || typeof entry !== 'object') {
      continue
    }

    const commit = trim(entry.commit)
    const pages = Array.isArray(entry.pages)
      ? [
          ...new Set(
            entry.pages
              .filter(page => typeof page === 'string')
              .map(page => page.replace(/^\/+/, '').trim())
              .filter(Boolean)
          )
        ]
      : []
    const authorCommit = trim(entry.authorCommit)

    if (commit && pages.length) {
      commits.push(
        authorCommit ? { commit, authorCommit, pages } : { commit, pages }
      )
    }
  }

  return {
    urlOnly: [...new Set(urlOnly)],
    commits
  }
}

const findMergeByCommit = (merges, commitRef) => {
  if (!commitRef) {
    return null
  }

  return (
    merges.find(
      merge =>
        merge.commitId === commitRef || merge.commitId.startsWith(commitRef)
    ) || null
  )
}

const commitUrl = commitId =>
  commitId && githubRepoUrl ? `${githubRepoUrl}/commit/${commitId}` : ''

const applyMetadata = (page, metadata) => ({
  ...page,
  changed: metadata.changed,
  changedTimestamp: metadata.changedTimestamp,
  changedBy: metadata.changedBy,
  gravatarUrl: metadata.gravatarUrl,
  commitId: metadata.commitId,
  commitMessage: metadata.commitMessage,
  commitUrl: metadata.commitUrl || commitUrl(metadata.commitId)
})

const resolveConfiguredPage = (base, { commit, authorCommit }, merges) => {
  const metadata =
    findMergeByCommit(merges, commit) || getCommitMetadata(commit)
  let page = metadata ? applyMetadata(base, metadata) : base

  if (authorCommit) {
    const author = getCommitMetadata(authorCommit)

    if (author) {
      page = {
        ...page,
        changedBy: author.changedBy,
        gravatarUrl: author.gravatarUrl
      }
    }
  }

  return page
}

const isGuideNavigationPage = file => !file.frontMatter.navigation_ignore

const getRecentlyUpdatedPages = ({
  currentFilePath,
  files,
  config,
  navigation
}) => {
  const entries = ensureUpdatedPageEntries({
    currentFilePath,
    files,
    config,
    navigation
  })
  const { urlOnly, commits } = normalizeRecentPagesConfig(recentPagesConfig)

  if (!urlOnly.length && !commits.length) {
    return entries
  }

  if (commits.length) {
    const entryByUrl = new Map(entries.map(entry => [entry.url, entry]))
    const merges = groupPageEntriesByMerge(entries, mergeOptions)
    const results = []

    for (const item of commits) {
      for (const url of item.pages) {
        const base = entryByUrl.get(url)

        if (!base) {
          continue
        }

        results.push(resolveConfiguredPage(base, item, merges))
      }
    }

    return results
  }

  const selectedUrlSet = new Set(urlOnly)

  return entries.filter(page => selectedUrlSet.has(page.url))
}

const isMeaningfulRevision = (linesAdded, linesDeleted) =>
  linesAdded >= MIN_MEANINGFUL_REVISION_LINES ||
  linesDeleted >= MIN_MEANINGFUL_REVISION_LINES

const groupPageEntriesByMerge = (pages, mergeOptions = {}) => {
  const { getFileMergeHistory, getFileChangeStats } = mergeOptions
  const mergesByCommitId = new Map()

  for (const page of pages) {
    if (!page.filePath || !getFileMergeHistory || !getFileChangeStats) {
      continue
    }

    for (const mergeEntry of getFileMergeHistory(page.filePath)) {
      const { linesAdded, linesDeleted } = getFileChangeStats(
        mergeEntry.commitId,
        page.filePath
      )

      if (!isMeaningfulRevision(linesAdded, linesDeleted)) {
        continue
      }

      const affectedPage = {
        title: page.title,
        url: page.url,
        section: page.section,
        sectionTitle: page.sectionTitle,
        linesAdded,
        linesDeleted,
        linesChanged: linesAdded + linesDeleted
      }
      const existingMerge = mergesByCommitId.get(mergeEntry.commitId)

      if (existingMerge) {
        if (existingMerge.pages.some(entry => entry.url === page.url)) {
          continue
        }

        existingMerge.pages.push(affectedPage)
        continue
      }

      mergesByCommitId.set(mergeEntry.commitId, {
        changed: mergeEntry.changed,
        changedTimestamp: mergeEntry.changedTimestamp,
        changedBy: mergeEntry.changedBy,
        gravatarUrl: mergeEntry.gravatarUrl,
        commitId: mergeEntry.commitId,
        commitShortId: mergeEntry.commitId.slice(0, 7),
        commitMessage: mergeEntry.commitMessage,
        commitUrl: commitUrl(mergeEntry.commitId),
        pages: [affectedPage]
      })
    }
  }

  return Array.from(mergesByCommitId.values())
    .map(merge => ({
      ...merge,
      pages: merge.pages.sort((a, b) => {
        if (b.linesChanged !== a.linesChanged) {
          return b.linesChanged - a.linesChanged
        }

        return a.title.localeCompare(b.title)
      })
    }))
    .sort((a, b) => b.changedTimestamp - a.changedTimestamp)
}

const getUpdatedPageEntries = ({
  currentFilePath,
  files,
  config,
  navigation
}) => {
  return [...files]
    .filter(isGuideNavigationPage)
    .map(file => {
      const metadata = getGitMetadata(file.path)
      const { linesAdded, linesDeleted } = metadata.commitId
        ? getFileChangeStats(metadata.commitId, file.path)
        : { linesAdded: 0, linesDeleted: 0 }
      const section = file.data.section
      const sectionTitle =
        navigation.find(item => item.url === section)?.title || ''

      return {
        title: file.data.title,
        lead: truncateText(file.data.lead),
        url: getCurrentUrl(file.path, config.base),
        filePath: file.path,
        section,
        sectionTitle,
        linesAdded,
        linesDeleted,
        linesChanged: linesAdded + linesDeleted,
        changed: metadata.changed,
        changedTimestamp: metadata.changedTimestamp,
        changedBy: metadata.changedBy,
        gravatarUrl: metadata.gravatarUrl,
        commitId: metadata.commitId,
        commitMessage: metadata.commitMessage,
        commitUrl: commitUrl(metadata.commitId)
      }
    })
    .filter(
      page =>
        page.title &&
        page.url &&
        page.changed &&
        page.url !== getCurrentUrl(currentFilePath, config.base)
    )
    .sort((a, b) => b.changedTimestamp - a.changedTimestamp)
}

let updatedPageEntries = null

const ensureUpdatedPageEntries = ({
  currentFilePath,
  files,
  config,
  navigation
}) => {
  if (updatedPageEntries !== null) {
    return updatedPageEntries
  }

  updatedPageEntries = getUpdatedPageEntries({
    currentFilePath,
    files,
    config,
    navigation
  })
  return updatedPageEntries
}

const truncateText = (text, maxLength) => {
  if (!text) {
    return ''
  }

  const normalizedText = String(text).trim().replace(/\s+/g, ' ')
  const limit = Number(maxLength)

  if (!Number.isFinite(limit) || normalizedText.length <= limit) {
    return normalizedText
  }

  return `${normalizedText.slice(0, limit).trimEnd()}...`
}

export { getRecentlyUpdatedPages, getGitMetadata }
