const fs = require('fs')
const path = require('path')
const frontMatter = require('front-matter')
const hljs = require('highlight.js')
const _ = require('lodash')

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

const getCodePenForm = (code, title) => {
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
    <button type="submit" class="button codepen">Play around with the example on CodePen</button>
  </form>`
}

const getExample = (examplePath, filePath) => {
  const code = getCode(examplePath)
  const id = _.uniqueId('example-')

  const compatibilitySummaryBrowsers = ['FF', 'IE']
  const compatibilitySummary = []

  let compatibility = []

  if (code.details.compatibility) {
    for (const [category, value] of Object.entries(
      code.details.compatibility
    )) {
      const results = value.status
        ? {
          [category]: value
        }
        : value

      for (const [browser, result] of Object.entries(results)) {
        const env = category === browser ? category : `${category} ${browser}`

        compatibility.push({
          env,
          status: result.status,
          date: result.date,
          comments: result.comments || null,
          category
        })
      }
    }
  }

  compatibility = compatibility.map(result => {
    // Create color code and visual indication based on status and whether comments are present
    result.statusCode =
      result.status === 'pass' ? (result.comments ? 'yellow' : 'green') : 'red'
    result.statusIndication =
      result.status === 'pass'
        ? result.comments
          ? '⚠ <span class="visuallyhidden">(pass with comments)</span>'
          : '✔ <span class="visuallyhidden">(pass)</span>'
        : '✘ <span class="visuallyhidden">(fail)</span>'

    // Format date
    const date = new Date(result.date)

    // eslint-disable-next-line eqeqeq
    if (date != 'Invalid Date') {
      result.date = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`
    }

    // Create summary of screenreader+browser combinations
    const summaryBrowser = compatibilitySummaryBrowsers.find(browser =>
      result.env.match(browser)
    )

    if (summaryBrowser) {
      compatibilitySummary.push({
        name: `<img src="/img/compatibility/${result.category.toLowerCase()}.png" alt="${
          result.category
        }" /><span class="visuallyhidden">+</span><img src="/img/compatibility/${summaryBrowser.toLowerCase()}.png" class="browser" alt="${summaryBrowser}" />`,
        statusCode: result.statusCode,
        statusIndication: result.statusIndication
      })
    }

    return result
  })

  const btns = ['html', 'css', 'js'].filter(type => code[type]).map(type => {
    return `<div class="control">
      <input type="checkbox" id="${id}-${type}" name="${id}" value="${type}" />
      <label class="button" for="${id}-${type}">
        <span class="visuallyhidden">Show </span>
        ${type.toUpperCase()}
        <span class="visuallyhidden"> code</span>
      </label>
    </div>`
  })
  const blocks = ['html', 'css', 'js'].filter(type => code[type]).map(type => {
    const markup = hljs.highlightAuto(code[type], [type])

    return `<div class="panel" id="${id}-${type}_panel" style="display: none"><pre><code>${
      markup.value
    }</code></pre></div>`
  })

  const codePenForm = getCodePenForm(code)

  if (compatibility.length) {
    btns.push(`<div class="control">
      <input type="checkbox" id="${id}-compatibility" name="${id}" value="compatibility" />
      <label class="button" for="${id}-compatibility">
        <span class="summary">
          ${compatibilitySummary
    .map(
      item => `<span class="status status--${item.statusCode}">
            ${item.name} ${item.statusIndication}
        </span>`
    )
    .join('<span class="visuallyhidden">, </span>')}
        </span>
      </label>
    </div>`)

    blocks.push(`<div class="panel" id="${id}-compatibility_panel" style="display: none">
      <table class="compatibility">
        <thead>
          <th class="category">Category</th>
          <th class="result">Result</th>
          <th class="comments">Comments</th>
          <th class="date">Date</th>
        </thead>
        <tbody>
          ${compatibility
    .map(
      result => `<tr>
  <th>${result.env}</th>
    <td class="result result--${result.statusCode}">
      ${result.statusIndication} ${result.status}
    </td>
    <td>${result.comments ? result.comments : '-'}</td>
    <td>${result.date}</td>
</tr>`
    )
    .join('')}
        </tbody>
      </table>
    </div>`)
  }

  return {
    form: `
  ${codePenForm}
  <div class="tablist"><div class="controls">${btns.join(
    ''
  )}</div><div class="panels">${blocks.join('')}</div></div>`,
    code
  }
}

const getLink = token => {
  const href = token.attrGet('href') || ''

  return href.match(/_examples/) ? href : null
}

module.exports = {
  getCode,
  getTitle,
  getCodePenForm,
  getExample,
  getLink
}
