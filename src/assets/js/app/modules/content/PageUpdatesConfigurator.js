const formatJsString = value =>
  `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

const buildRecentPagesSnippet = groups => {
  if (!groups.length) {
    return ''
  }

  const lines = ['export default [']

  groups.forEach((group, index) => {
    lines.push('  {')
    lines.push(`    commit: ${formatJsString(group.commit)},`)
    lines.push('    pages: [')

    group.pages.forEach((url, pageIndex) => {
      const suffix = pageIndex < group.pages.length - 1 ? ',' : ''
      lines.push(`      ${formatJsString(url)}${suffix}`)
    })

    lines.push('    ]')
    lines.push(`  }${index < groups.length - 1 ? ',' : ''}`)
  })

  lines.push(']')

  return lines.join('\n')
}

/**
 * Page updates configurator
 *
 * @selector .js-page-updates-configurator
 * @enabled true
 */
export default class PageUpdatesConfigurator {
  constructor() {
    PageUpdatesConfigurator.namespaceIndex += 1
    this.ns = `.PageUpdatesConfigurator${PageUpdatesConfigurator.namespaceIndex}`
    this.el = null
    this.abortController = null
    this.checkboxes = []
    this.textarea = null
    this.status = null
    this.handleChange = this.handleChange.bind(this)
    this.copySnippet = this.copySnippet.bind(this)
  }

  init(element) {
    this.el = element
    this.abortController = new AbortController()
    const { signal } = this.abortController

    this.checkboxes = Array.from(
      element.querySelectorAll('.page-updates__page-checkbox')
    )
    this.textarea = element.querySelector('.page-updates__textarea')
    this.status = element.querySelector('.page-updates__status')

    element.addEventListener('change', this.handleChange, { signal })

    const copyButton = element.querySelector('.page-updates__copy')

    if (copyButton) {
      copyButton.addEventListener('click', this.copySnippet, { signal })
    }

    this.updateSnippet()

    return this
  }

  destroy() {
    this.abortController?.abort()
    this.abortController = null
    this.el = null
    this.checkboxes = []
    this.textarea = null
    this.status = null
  }

  handleChange(event) {
    if (event.target.matches('.page-updates__page-checkbox')) {
      this.updateSnippet()
    }
  }

  getSelectedGroups() {
    const groups = []
    const groupByCommit = new Map()

    for (const checkbox of this.checkboxes) {
      if (!checkbox.checked) {
        continue
      }

      const { commit } = checkbox.dataset
      const { value: url } = checkbox

      if (!commit || !url) {
        continue
      }

      if (!groupByCommit.has(commit)) {
        groupByCommit.set(commit, [])
      }

      groupByCommit.get(commit).push(url)
    }

    for (const item of this.el.querySelectorAll('.page-updates__item')) {
      const checkbox = item.querySelector('.page-updates__page-checkbox')
      const commit = checkbox?.dataset.commit

      if (!commit || !groupByCommit.has(commit)) {
        continue
      }

      groups.push({
        commit,
        pages: groupByCommit.get(commit).sort((a, b) => a.localeCompare(b))
      })
    }

    return groups
  }

  updateSnippet() {
    const snippet = buildRecentPagesSnippet(this.getSelectedGroups())

    if (this.textarea) {
      this.textarea.value = snippet
    }

    if (!this.status) {
      return
    }

    if (!snippet) {
      this.status.textContent =
        'No pages selected. Without a config in config/recent-pages.js, the home page uses the latest git updates.'
      return
    }

    this.status.textContent = ''
  }

  async copySnippet() {
    const snippet = this.textarea?.value || ''

    if (!snippet) {
      if (this.status) {
        this.status.textContent = 'Nothing to copy.'
      }

      return
    }

    try {
      await navigator.clipboard.writeText(snippet)

      if (this.status) {
        this.status.textContent = 'Copied to clipboard.'
      }
    } catch {
      if (this.status) {
        this.status.textContent =
          'Copy failed. Select and copy the snippet manually.'
      }
    }
  }
}

PageUpdatesConfigurator.namespaceIndex = 0
