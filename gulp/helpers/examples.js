const fs = require('fs')
const path = require('path')
const frontMatter = require('front-matter')
const hljs = require('highlight.js')

const getFile = (files, type, dir) => {
  const match = files.find(file => path.extname(file) === `.${type}`)
  const content = match ? fs.readFileSync(path.join(dir, match)).toString() : ''

  if (type === 'details') {
    return frontMatter(content).attributes
  }

  return content
}

const getCode = dir => {
  const files = fs.readdirSync(dir)

  return {
    details: {}, // TODO: Add reasonable details
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
    title: title,
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

const getExample = (title, href, filePath) => {
  const dir = path.join(
    filePath.replace(path.basename(filePath), ''),
    '_examples',
    href
  )
  const code = getCode(dir)

  const blocks = ['html', 'css', 'js'].filter(type => code[type]).map(type => {
    const markup = hljs.highlightAuto(code[type], [type])
    var id =
      href
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '') + type

    return `<div class="control"><input type="checkbox" id="${id}" /><label for="${id}">Show ${type.toUpperCase()} code</label></div>
      <div class="panel" id="${id}_panel" style="display: none"><pre><code>${
  markup.value
}</code></pre></div>`
  })

  const codePenForm = getCodePenForm(code, title)

  const exampleLink = `<a href="/${path.join(
    path.relative('./pages', dir),
    'example.html'
  )}" target="_blank"><span>Example: ${title}</span><span class="visuallyhidden"> (opens new window)</span><img src="/${path.join(
    path.relative('./pages', dir),
    'example.png'
  )}" alt="Example preview" /></a>`

  return `
  ${exampleLink}
  ${codePenForm}
  <div class="accordion">${blocks.join('')}</div>`
}

module.exports = {
  getCode,
  getTitle,
  getCodePenForm,
  getExample
}
