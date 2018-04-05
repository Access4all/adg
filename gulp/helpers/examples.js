const fs = require('fs')
const path = require('path')
const frontMatter = require('front-matter')
const hljs = require('highlight.js')

const getFile = (files, type, href) => {
  const match = files.find(file => path.extname(file) === `.${type}`)
  const content = match
    ? fs.readFileSync(path.join('./pages', href, match)).toString()
    : ''

  if (type === 'details') {
    return frontMatter(content).attributes
  }

  return content
}

const getCode = href => {
  const files = fs.readdirSync(path.join('./pages', href))

  return {
    details: getFile(files, 'details', href),
    html: getFile(files, 'html', href),
    css: getFile(files, 'css', href),
    js: getFile(files, 'js', href)
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

  return `<form action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" value="${JSON.stringify(config).replace(
    /"/g,
    '&quot;'
  )}">
    <button type="submit" class="codepen">Play around on CodePen</button>
  </form>`
}

const getExample = href => {
  const code = getCode(href)

  const description = code.details.description
    ? `<p>${code.details.description}</p>`
    : ''

  const blocks = ['html', 'css', 'js'].map(type => {
    const markup = hljs.highlightAuto(code[type])
    var id =
      href
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '') + type

    return `<div class="control"><input type="checkbox" class="sr-only" id="${id}" /><label for="${id}">${type}</label></div>
      <div class="panel" id="${id}_panel" style="display: none"><pre><code>${
  markup.value
}</code></pre></div>`
  })

  const codePenForm = getCodePenForm(code)

  const exampleLink = `<a href="${path.join(
    href,
    'example.html'
  )}">Example<img src="${path.join(
    href,
    'example.png'
  )}" alt="Example preview" /></a>`

  return `${exampleLink}
  ${description}<div class="accordion">${blocks.join('')}</div>
  ${codePenForm}`
}

module.exports = {
  getCode,
  getTitle,
  getCodePenForm,
  getExample
}
