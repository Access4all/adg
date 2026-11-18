import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import frontMatter from 'front-matter'
import hljs from 'highlight.js'

const SOURCE_TYPES = ['html', 'css', 'js']

// Browsers whose screen reader results are summarised in the compatibility button
const SUMMARY_BROWSERS = ['Chrome', 'Edge', 'FF', 'Safari', 'IE']

const STATUSES = {
  green: { symbol: '✔', text: 'pass' },
  yellow: { symbol: '⚠', text: 'pass with comments' },
  red: { symbol: '✘', text: 'fail' }
}

const getFile = (files, type, dir) => {
  const match = files.find(file => {
    if (type === 'html') {
      return path.basename(file) === 'index.html'
    }

    return path.extname(file) === `.${type}`
  })

  if (type === 'png') {
    return match ? path.join(dir, match) : ''
  }

  const content = match ? fs.readFileSync(path.join(dir, match)).toString() : ''

  if (type === 'md') {
    return frontMatter(content).attributes
  }

  return content
}

const getCode = dir => {
  const files = fs.readdirSync(dir)

  return {
    details: getFile(files, 'md', dir),
    preview: getFile(files, 'png', dir),
    html: getFile(files, 'html', dir),
    css: getFile(files, 'css', dir),
    js: getFile(files, 'js', dir)
  }
}

const getTitle = href => {
  const filePath = path.join('./pages', href, '/README.md')

  if (!fs.existsSync(filePath)) {
    return false
  }

  const file = fs.readFileSync(filePath).toString()
  const meta = frontMatter(file).attributes

  return meta.title
}

const getCodePenForm = code => {
  const config = {
    title: code.details.title,

    // description: code.details.description,
    html: code.html,

    // html_pre_processor: 'none',
    css: code.css,
    css_pre_processor: 'scss',

    // css_starter: 'neither',
    // css_prefix_free: false,
    js: code.js,

    js_pre_processor: 'babel',
    // js_modernizr: false,
    // js_library: 'jquery',
    // html_classes: '',
    // css_external: '',
    js_external: '//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
  }

  return `<form action="https://codepen.io/pen/define" method="POST">
    <input type="hidden" name="data" value="${JSON.stringify(config).replace(
      /"/g,
      '&quot;'
    )}">
    <button type="submit" class="button codepen" formtarget="_blank">Play around with the example on CodePen</button>
  </form>`
}

const escapeAttribute = value =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

const getStatusCode = ({ status, comments }) => {
  if (status !== 'pass') {
    return 'red'
  }

  return comments ? 'yellow' : 'green'
}

const formatDate = value => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

// One result per screen reader and browser combination of the front matter
const getCompatibilityResults = compatibility =>
  Object.entries(compatibility).flatMap(([category, value]) => {
    if (!value) {
      throw new Error(
        `Missing value for "${category}" in "compatibility" table.`
      )
    }

    // Categories without browsers hold their result directly
    const results = value.status ? { [category]: value } : value

    return Object.entries(results).map(([browser, result]) => {
      if (!result) {
        throw new Error(
          `Missing value for "${browser}" in "compatibility" table.`
        )
      }

      const env = category === browser ? category : `${category} ${browser}`

      return {
        env,
        category,
        statusCode: getStatusCode(result),
        comments: result.comments || null,
        date: formatDate(result.date),
        summaryBrowser: SUMMARY_BROWSERS.find(name => env.includes(name))
      }
    })
  })

const renderSummaryItem = ({ category, summaryBrowser, statusCode }) =>
  `<span class="disclosure--status disclosure--status--${statusCode}"><img src="/img/compatibility/${category.toLowerCase()}.png" alt="${category}" /><img src="/img/compatibility/${summaryBrowser.toLowerCase()}.png" class="disclosure--browser" alt="${summaryBrowser}" /><span class="disclosure--mark">${STATUSES[statusCode].symbol}</span></span>`

// Only a visual overview, the table in the panel holds the same results
const renderSummary = results => {
  const items = results
    .filter(result => result.summaryBrowser)
    .map(renderSummaryItem)

  return `<span class="disclosure--summary" aria-hidden="true">${items.join('')}</span>`
}

const renderResultRow = ({ env, statusCode, comments, date }) => {
  const { symbol, text } = STATUSES[statusCode]

  return `<tr>
  <th scope="row">${env}</th>
  <td class="disclosure--result disclosure--result--${statusCode}"><span aria-hidden="true">${symbol}</span> ${text}</td>
  <td>${comments || '-'}</td>
  <td>${date}</td>
</tr>`
}

const renderCompatibilityTable =
  results => `<table class="disclosure--compatibility">
  <thead>
    <tr>
      <th scope="col" class="category">Category</th>
      <th scope="col" class="result">Result</th>
      <th scope="col" class="comments">Comments</th>
      <th scope="col" class="date">Date</th>
    </tr>
  </thead>
  <tbody>${results.map(renderResultRow).join('')}</tbody>
</table>`

const getSourceSections = (code, id) =>
  SOURCE_TYPES.filter(type => code[type]).map(type => ({
    id: `${id}-${type}`,
    label: type.toUpperCase(),
    content: `<pre tabindex="0"><code>${
      hljs.highlightAuto(code[type], [type]).value
    }</code></pre>`
  }))

const getCompatibilitySection = (results, id) => ({
  id: `${id}-compatibility`,
  label: `<span class="visuallyhidden">Compatibility</span>${renderSummary(results)}`,
  content: renderCompatibilityTable(results)
})

// Without JavaScript the toggles are plain links to panels that all stay visible
const renderToggle = ({ id, label }) =>
  `<li class="disclosure--item"><a class="disclosure--toggle button" href="#${id}">${label}</a></li>`

const renderPanel = ({ id, content }) =>
  `<div class="disclosure--panel" id="${id}">${content}</div>`

const renderDisclosure = (
  sections,
  label
) => `<div class="disclosure js-disclosure">
  <ul class="disclosure--list" aria-label="${escapeAttribute(label)}">${sections
    .map(renderToggle)
    .join('')}</ul>
  ${sections.map(renderPanel).join('')}
</div>`

const getExample = examplePath => {
  try {
    const code = getCode(examplePath)
    const id = `example-${randomUUID()}`
    const sections = getSourceSections(code, id)
    const results = getCompatibilityResults(code.details.compatibility || {})

    if (results.length) {
      sections.push(getCompatibilitySection(results, id))
    }

    const disclosure = sections.length
      ? renderDisclosure(sections, code.details.title || 'Example')
      : ''

    return {
      form: `
  ${getCodePenForm(code)}
  ${disclosure}`,
      code
    }
  } catch (err) {
    console.error(
      `\x1b[31m[Error] Could not extract example from ${examplePath}. See details below.\x1b[0m`
    )

    throw err
  }
}

const getLink = token => {
  const href = token.attrGet('href') || ''

  return href.match(/_examples/) ? href : null
}

export { getCode, getTitle, getCodePenForm, getExample, getLink }
