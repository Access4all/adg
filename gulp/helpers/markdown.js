const markdownIt = require('markdown-it')
const iterator = require('markdown-it-for-inline')
const markdownPlugin = require('markdown-it-regexp')
const requireNew = require('require-new')

module.exports = filePath => {
  const markdown = markdownIt()
  const examples = requireNew('./examples')

  return markdown
    .use(
      markdownPlugin(/@example\[(.*?)\]\((.*?)\)/, (match, utils) => {
        return examples.getExample(match[1], match[2], filePath)
      })
    )
    .use(require('markdown-it-abbr'))
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-kbd'))
    .use(require('markdown-it-samp'))
    .use(iterator, 'add_link_title', 'link_open', function (tokens, idx) {
      const title = tokens[idx].attrGet('title')

      if (title) {
        return
      }

      const href = tokens[idx].attrGet('href')
      const metaTitle = examples.getTitle(href)

      if (!metaTitle) {
        return
      }

      tokens[idx].attrSet('title', metaTitle)
    })
    .use(() => {
      markdown.core.ruler.push('increase_heading_level', state => {
        state.tokens.forEach(token => {
          if (['heading_open', 'heading_close'].includes(token.type)) {
            token.tag = token.tag.replace(
              /[0-9]+/,
              match => parseInt(match, 10) + 1
            )
          }
        })
      })
    })
}
