const markdownIt = require('markdown-it')
const requireNew = require('require-new')

const plugins = {
  iterator: require('markdown-it-for-inline'),
  regexp: require('markdown-it-regexp'),
  abbr: require('markdown-it-abbr'),
  attrs: require('markdown-it-attrs'),
  deflist: require('markdown-it-deflist'),
  kbd: require('markdown-it-kbd'),
  samp: require('markdown-it-samp'),
  responsive: require('@gerhobbelt/markdown-it-responsive')
}

module.exports = filePath => {
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typography: true
  })
  const examples = requireNew('./examples')

  return markdown
    .use(
      plugins.regexp(/@example\[(.*?)\]\((.*?)\)/, (match, utils) => {
        return examples.getExample(match[1], match[2], filePath)
      })
    )
    .use(plugins.abbr)
    .use(plugins.attrs)
    .use(plugins.deflist)
    .use(plugins.kbd)
    .use(plugins.samp)
    .use(plugins.responsive, {
      // TODO: Specify proper sizes
      responsive: {
        srcset: {
          '*': [
            {
              width: 320,
              rename: {
                suffix: '-small'
              }
            },
            {
              width: 640,
              rename: {
                suffix: '-medium'
              }
            }
          ]
        },
        sizes: {
          '*': '(min-width: 36em) 33.3vw, 100vw'
        }
      }
    })
    .use(plugins.iterator, 'add_link_title', 'link_open', function (
      tokens,
      idx
    ) {
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
      let c = 0

      markdown.core.ruler.push('manipulate_titles', state => {
        state.tokens.forEach(token => {
          if (['heading_open', 'heading_close'].includes(token.type)) {
            // Identify first content title
            if (c === 0) {
              token.attrs = [['class', 'first']]
            }

            // Increase heading level
            token.tag = token.tag.replace(
              /[0-9]+/,
              match => parseInt(match, 10) + 1
            )

            c++
          }
        })
      })
    })
}
