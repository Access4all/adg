const markdown = require('markdown-it')({
  plugins: [
    'markdown-it-abbr',
    'markdown-it-attrs',
    'markdown-it-deflist',
    'markdown-it-kbd',
    'markdown-it-samp'
  ]
})
const markdownPlugin = require('markdown-it-regexp')
const fs = require('fs')
const path = require('path')
const frontMatter = require('front-matter')
const hljs = require('highlight.js')

const getFile = (files, type, href) => {
  const match = files.find(file => path.extname(file) === `.${type}`)
  const content = match
    ? fs.readFileSync(path.join('.', href, match)).toString()
    : ''

  if (type === 'details') {
    return frontMatter(content).attributes
  }

  return content
}

const getCode = href => {
  const files = fs.readdirSync(path.join('.', href))

  return {
    details: getFile(files, 'details', href),
    html: getFile(files, 'html', href),
    css: getFile(files, 'css', href),
    js: getFile(files, 'js', href)
  }
}

const codePlugin = markdownPlugin(/@code\((.*?)\)/, (match, utils) => {
  const code = getCode(match[1])

  const description = code.details.description
    ? `<p>${code.details.description}</p>`
    : ''

  const blocks = ['html', 'css', 'js'].map(type => {
    const markup = hljs.highlightAuto(code[type])

    return `<div class="code">
      <h3 class="title">${type}</h3>
      <pre><code>${markup.value}</code></pre>
    </div>`
  })

  const codePenConfig = {
    title: code.details.name,
    description: code.details.description,
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
  const codePenForm = `<form action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" value="${JSON.stringify(
    codePenConfig
  ).replace(/"/g, '&quot;')}">
    <button type="submit" class="btn btn-primary">CodePen</button>
  </form>`

  return `${description}${blocks.join('')}
  ${codePenForm}`
})

markdown.use(codePlugin)

module.exports = markdown
