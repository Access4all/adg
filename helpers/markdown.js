const markdown = require('gulp-markdown')
const fs = require('fs')
const path = require('path')
const frontMatter = require('front-matter')
const hljs = require('highlight.js')

const getFile = (files, type, href) => {
  const match = files.find((file) => path.extname(file) === `.${type}`)
  const content = match ? fs.readFileSync(path.join('.', href, match)).toString() : ''

  if (type === 'details') {
    return frontMatter(content).attributes
  }

  return content
}

const getCode = (href) => {
  const files = fs.readdirSync(path.join('.', href))

  return {
    details: getFile(files, 'details', href),
    html: getFile(files, 'html', href),
    css: getFile(files, 'css', href),
    js: getFile(files, 'js', href)
  }
}

const renderer = new markdown.marked.Renderer()

renderer.link = function(href, title, text) {
  let code
  switch (text) {
    case '[Code]':
      code = getCode(href)

      const description = `<p>${code.details.description}</p>`

      const blocks = ['html', 'css', 'js'].map((type) => {
        const markup = hljs.highlightAuto(code[type])

        return `<div class="code">
          <h3 class="title">${type}</h3>
          <pre><code>${markup.value}</code></pre>
        </div>`
      })

      return `${description}${blocks.join('')}`
    case '[CodePen]':
      code = getCode(href)

      return `<form action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input type="hidden" name="data" value="${JSON.stringify({
          title: code.details.name,
          description: code.details.description,
          html: code.html,
          // html_pre_processor: 'none',
          css: code.css,
          css_pre_processor: 'scss',
          // css_starter: 'neither',
          // css_prefix_free: false,
          js: code.js,
          // js_pre_processor: 'none',
          // js_modernizr: false,
          // js_library: '',
          // html_classes: '',
          // css_external: '',
          // js_external: ''
        }).replace(/"/g, '&quot;')}">
        <button type="submit" class="btn btn-primary">CodePen</button>
      </form>`
    case '[JSFiddle]':
      let link = `https://jsfiddle.net/gh/get/library/pure/backflip/adg/tree/master${href.replace(/\[|\]/g, '')}`

      return `<a href="${link}" target="_blank" class="btn btn-primary">JSFiddle</a>`
    default:
      return markdown.marked.Renderer.prototype.link.apply(this, arguments)
  }
}

module.exports = () => markdown({ renderer })
