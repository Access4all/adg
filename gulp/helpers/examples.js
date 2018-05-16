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

  if (type === 'json') {
    return JSON.parse(content)
  }

  return content
}

const getCode = dir => {
  const files = fs.readdirSync(dir)

  return {
    details: getFile(files, 'json', dir),
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
    js: code.js

    // js_pre_processor: 'none',
    // js_modernizr: false,
    // js_library: '',
    // html_classes: '',
    // css_external: '',
    // js_external: ''
  }

  return `<form action="https://codepen.io/pen/define" method="POST">
    <input type="hidden" name="data" value="${JSON.stringify(config).replace(
    /"/g,
    '&quot;'
  )}">
    <button type="submit" class="codepen">Play around with the example on CodePen</button>
  </form>`
}

const getExample = (examplePath, filePath) => {
  const relExamplePath = path.relative(examplePath, filePath)
  const code = getCode(examplePath)
  const id = _.uniqueId('example-')

  const btns = ['html', 'css', 'js'].filter(type => code[type]).map(type => {
    const markup = hljs.highlightAuto(code[type], [type])

    return `<div class="control"><input type="checkbox" id="${id}-${type}" name="${id}" value="${type}" /><label class="button" for="${id}-${type}"><span class="visuallyhidden">Show </span>${type.toUpperCase()}<span class="visuallyhidden"> code</span></label></div>`
  })
  const blocks = ['html', 'css', 'js'].filter(type => code[type]).map(type => {
    const markup = hljs.highlightAuto(code[type], [type])

    return `<div class="panel" id="${id}-${type}_panel" style="display: none"><pre><code>${
      markup.value
    }</code></pre></div>`
  })

  const codePenForm = getCodePenForm(code)

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
  const match = href.match(/_examples/)

  return href.match(/_examples/) ? href : null
}

module.exports = {
  getCode,
  getTitle,
  getCodePenForm,
  getExample,
  getLink
}
