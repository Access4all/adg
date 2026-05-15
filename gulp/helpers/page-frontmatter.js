import fs from 'node:fs'
import path from 'node:path'
import frontMatter from 'front-matter'

const pagesDirectory = './pages'

const collectPageMarkdownFiles = (directory, markdownFiles = []) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === '_examples') {
        continue
      }

      collectPageMarkdownFiles(entryPath, markdownFiles)
      continue
    }

    if (entry.name.endsWith('.md')) {
      markdownFiles.push(entryPath)
    }
  }

  return markdownFiles
}

const getPageDirectory = (filePath, pagesRoot) => {
  const relativePath = path.relative(pagesRoot, filePath)
  const relativeDirectory = path.dirname(relativePath)

  return relativeDirectory === '.' ? '' : relativeDirectory.replace(/\\/g, '/')
}

const getPagesWithFrontMatterFlag = (rootDir, flag) => {
  const pagesRoot = path.join(rootDir, pagesDirectory)

  return collectPageMarkdownFiles(pagesRoot)
    .map(filePath => {
      const { attributes } = frontMatter(fs.readFileSync(filePath, 'utf8'))

      if (!attributes[flag]) {
        return null
      }

      return {
        filePath,
        directory: getPageDirectory(filePath, pagesRoot)
      }
    })
    .filter(Boolean)
}

const getDevOnlyPageGlobs = rootDir =>
  getPagesWithFrontMatterFlag(rootDir, 'dev_only').map(
    ({ filePath, directory }) =>
      `!./pages/${directory || path.basename(filePath, path.extname(filePath))}/**/*.md`
  )

const getDevOnlyDistPaths = rootDir =>
  getPagesWithFrontMatterFlag(rootDir, 'dev_only').map(
    ({ directory }) => `./dist/${directory}`
  )

export { getDevOnlyDistPaths, getDevOnlyPageGlobs }
