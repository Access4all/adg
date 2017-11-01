const markdown = require('gulp-markdown')
const fs = require('fs')
const path = require('path')

const getFile = (files, type, href) => {
  const match = files.find((file) => path.extname(file) === `.${type}`)

  return match ? fs.readFileSync(path.join('.', href, match)).toString() : ''
}

const renderer = new markdown.marked.Renderer()

renderer.link = function(href, title, text) {
  switch (text) {
    case '[CodePen]':
      const files = fs.readdirSync(path.join('.', href))

      return `<form action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input type="hidden" name="data" value="${JSON.stringify({
          title: 'Test',
          description: '',
          html: getFile(files, 'html', href),
          // html_pre_processor: 'none',
          css: getFile(files, 'css', href),
          css_pre_processor: 'scss',
          // css_starter: 'neither',
          // css_prefix_free: false,
          js: getFile(files, 'js', href),
          // js_pre_processor: 'none',
          // js_modernizr: false,
          // js_library: '',
          // html_classes: '',
          // css_external: '',
          // js_external: ''
        }).replace(/"/g, '&quot;')}">
        <button type="submit">CodePen</button>
      </form>`
      break
    case '[JSFiddle]':
      return `<a href="${href}" target="_blank">${text.replace(/\[|\]/g, '')}</a>`
      break
    default:
      return markdown.marked.Renderer.prototype.link.apply(this, arguments)
  }
}

module.exports = () => markdown({ renderer })
