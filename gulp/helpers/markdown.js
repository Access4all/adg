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

module.exports = rootDir => filePath => {
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typography: true
  })
  const examples = requireNew('./examples')

  return markdown
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
    .use(() => {
      markdown.core.ruler.push('wrap_example_links', state => {
        state.tokens.forEach(token => {
          const exampleLinkToken = token.children
            ? token.children.find(examples.getLink)
            : null

          if (!exampleLinkToken) {
            return
          }

          const exampleLink = examples.getLink(exampleLinkToken)

          const wrappedTokens = []

          token.children = token.children.reduce((acc, child, i) => {
            if (wrappedTokens.includes(i)) {
              return acc
            }

            // Wrap link with container and add example code
            if (exampleLink === examples.getLink(child)) {
              const openingWrapper = new state.Token('html_inline', '', 0)
              const closingWrapper = new state.Token('html_inline', '', 0)
              let title = ''

              openingWrapper.content = '<div class="example">'

              acc.push(openingWrapper)

              token.children.slice(i).some((item, ii) => {
                wrappedTokens.push(i + ii)
                acc.push(item)

                if (item.type === 'text') {
                  title += item.content

                  // Wrap text with span
                  item.type = 'html_inline'
                  item.content = `<span class="example-link">${
                    item.content
                  }</span>`
                }

                if (item.type === 'link_close') {
                }
              })

              const examplePath = path.isAbsolute(exampleLink)
                ? path.join(rootDir, exampleLink)
                : path.resolve(path.dirname(filePath), exampleLink)
              const example = examples.getExample(title, examplePath, filePath)

              closingWrapper.content = `${example}</div>`

              acc.push(closingWrapper)

              return acc
            }

            acc.push(child)

            return acc
          }, [])
        })
      })
    })
}
