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
      responsive: {
        srcset: {
          '*': [
            {
              width: 680,
              rename: {
                suffix: '-large'
              }
            },
            {
              width: 546,
              rename: {
                suffix: '-medium'
              }
            },
            {
              width: 340,
              rename: {
                suffix: '-small'
              }
            }
          ]
        },
        sizes: {
          '*': '(max-width: 399px) 85vw, (min-width: 400px) 73vw'
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
