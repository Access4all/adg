const childProcess = require('child_process')

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
  '34da02f9b8caf03abc590e28d5bae79f8fc89e08' // Jan 27, 2024  ADG-338 feat: unify card text endings
]

const excludedCommitIdsSet = new Set(
  excludedCommitIds.map(id => id.toLowerCase())
)
const historyYearsLimit = 5

module.exports = ({ githubRepoUrl }) => {
  const changedMetadata = {}

  return filePath => {
    if (changedMetadata[filePath]) {
      return changedMetadata[filePath]
    }

    const historyStdout = childProcess.spawnSync(
      'git',
      ['log', '--pretty=format:%H%x1f%ci%x1f%an%x1f%s%x1e', filePath],
      { encoding: 'utf8' }
    ).stdout

    const filteredHistoryEntries = historyStdout
      .split('\x1e')
      .map(item => item.trim())
      .filter(Boolean)
      .map(item => {
        const [commitId = '', changed = '', changedBy = '', message = ''] =
          item.split('\x1f')

        return {
          commitId,
          changed,
          changedBy,
          commitUrl: `${githubRepoUrl}/commit/${commitId}`,
          message
        }
      })
      .filter(
        entry =>
          entry.commitId &&
          !excludedCommitIdsSet.has(entry.commitId.toLowerCase())
      )

    const latestEntry = filteredHistoryEntries[0] || null
    const cutoffDate = new Date()
    cutoffDate.setFullYear(cutoffDate.getFullYear() - historyYearsLimit)
    const historyEntries = filteredHistoryEntries.filter(entry => {
      const changedDate = new Date(entry.changed)
      return !Number.isNaN(changedDate.getTime()) && changedDate >= cutoffDate
    })

    const metadata = {
      changed: latestEntry ? latestEntry.changed : '',
      changedBy: latestEntry ? latestEntry.changedBy : '',
      historyEntries
    }

    changedMetadata[filePath] = metadata
    return metadata
  }
}
