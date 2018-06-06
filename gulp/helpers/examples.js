const fs = require('fs')
const path = require('path')
const frontMatter = require('front-matter')
const hljs = require('highlight.js')
const _ = require('lodash')

const getFile = (files, type, dir) => {
  const match = files.find(file => path.extname(file) === `.${type}`)

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

  const compatibility = code.details.compatibility ? _.map(code.details.compatibility, (results, category) => {
    const isKeyboard = results.status

    // Optimize structure for rendering
    if (isKeyboard) {
      results = [results]
    } else {
      results = _.map(results, (result, env) => {
        result.env = env

        return result
      })
    }

    results = results.map(result => {
      // Create color code and visual indication based on status and whether comments are present
      result.statusCode = result.status === 'Pass' ? (result.comments ? 'yellow' : 'green') : 'red'
      result.statusIndication = result.status === 'Pass' ? '✅' : (result.comments ? '⚠️' : '❌')

      // Format date
      const date = new Date(result.date)

      if (date != 'Invalid Date') { // eslint-disable-line eqeqeq
        result.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }

      return result
    })

    // Create summary of screenreader+browser combinations
    if (!isKeyboard) {
      compatibilitySummaryBrowsers.forEach(browser => {
        const result = results.find(result => {
          return result.env && result.env.match(browser)
        })

        if (result) {
          compatibilitySummary.push({
            name: `${category} + ${browser}`,
            statusCode: result.statusCode,
            statusIndication: result.statusIndication
          })
        }
      })
    }

    return {
      category,
      results
    }
  }) : null

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

  if (compatibility) {
    btns.push(`<div class="control">
      <input type="checkbox" id="${id}-compatibility" name="${id}" value="compatibility" />
      <label class="button" for="${id}-compatibility">
        <span class="visuallyhidden">Show compatibility details</span>
        ${compatibilitySummary.map(item => `<span class="status status--${item.statusCode}">
          ${item.name}: ${item.statusIndication}
        </span>`).join('')}
      </label>
    </div>`)

    blocks.push(`<div class="panel" id="${id}-compatibility_panel" style="display: none">
      <ul class="compatibility">
        ${compatibility.map(item => `<li>
          <h3>${item.category}</h3>
          <ul>
            ${item.results.map(result => `<li class="result result--${result.statusCode}">
              ${result.env ? `<strong>${result.env}</strong>:` : ''}
              ${result.statusIndication} ${result.status} (${result.date})
            </li>`).join('')}
          </ul>
        </li>`).join('')}
      </ul>
    </div>`)
  }

  return {
    form: `
  ${codePenForm}
  <div class="accordion"><div class="controls">${btns.join(
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
