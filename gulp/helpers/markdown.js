const markdownIt = require('markdown-it')
const requireNew = require('require-new')
const path = require('path')

const plugins = {
  iterator: require('markdown-it-for-inline'),
  regexp: require('markdown-it-regexp'),
  abbr: require('markdown-it-abbr'),
  attrs: require('markdown-it-attrs'),
  deflist: require('markdown-it-deflist'),
  kbd: require('markdown-it-kbd'),
  samp: require('markdown-it-samp'),
  responsive: require('@gerhobbelt/markdown-it-responsive'),
  replacements: require('markdown-it-replacements')
}

module.exports = rootDir => filePath => {
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typography: true
  })
  const examples = requireNew('./examples')

  markdown.validateLink = url => {
    const BAD_PROTO_RE = /^(vbscript|file|data):/
    const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/

    const str = url.trim().toLowerCase()

    return BAD_PROTO_RE.test(str) ? !!GOOD_DATA_RE.test(str) : true
  }

  plugins.replacements.replacements.push({
    name: 'right-arrow',
    re: /->/g,
    sub: () => '→',
    default: true
  })

  plugins.replacements.replacements.push({
    name: 'left-arrow',
    re: /<-/g,
    sub: () => '←',
    default: true
  })

  return (
    markdown
      .use(plugins.abbr)
      .use(plugins.attrs)
      .use(plugins.deflist)
      .use(plugins.kbd)
      .use(plugins.samp)
      .use(plugins.replacements)
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
        // Add the #main-h1 ID to each page's main heading.
        markdown.core.ruler.push('manipulate_main_heading', state => {
          var isMainHeading = true

          state.tokens.forEach(token => {
            if (['heading_open'].includes(token.type)) {
              if (token.tag == 'h1' && isMainHeading) {
                token.attrSet('id', 'main-h1')
                isMainHeading = false
              }
            }
          })
        })
      })
      // .use(() => {
      //   // Currently unused: Increase heading levels by 1
      //   markdown.core.ruler.push('increase_heading_level', state => {
      //     state.tokens.forEach(token => {
      //       if (['heading_open', 'heading_close'].includes(token.type)) {
      //         token.tag = token.tag.replace(
      //           /[0-9]+/,
      //           match => parseInt(match, 10) + 1
      //         )
      //       }
      //     })
      //   })
      // })
      .use(() => {
        // Add links to codepen and code blocks to example links
        // Inserts additional markup after the closing tag of the paragraph
        // containing the example link
        markdown.core.ruler.push('insert_example_links', state => {
          for (let idx = 0; idx < state.tokens.length; idx++) {
            const token = state.tokens[idx]

            if (!token.children) {
              continue
            }

            let exampleLink
            let examplePath
            let example
            let insertToken
            let exampleLinkClass

            token.children.some((childToken, childIdx) => {
              exampleLink = examples.getLink(childToken)

              // Add title
              if (exampleLink) {
                examplePath = path.isAbsolute(exampleLink)
                  ? path.join(rootDir, exampleLink)
                  : path.resolve(path.dirname(filePath), exampleLink)
                example = examples.getExample(examplePath, filePath)

                token.children
                  .slice(childIdx)
                  .some((followingChildToken, followingChildIdx) => {
                    if (followingChildToken.type === 'text') {
                      // Change link title and wrap with span
                      followingChildToken.type = 'html_inline'
                      followingChildToken.content = `<span class="example-link-text">${
                        example.code.details.title
                      }</span>${
                        example.code.preview
                          ? `<img src="/${path.relative(
                            path.join(rootDir, 'pages'),
                            example.code.preview
                          )}" alt="Preview">`
                          : ''
                      }`
                    }

                    if (followingChildToken.type === 'link_close') {
                      return true
                    }
                  })

                // Add custom class to link
                exampleLinkClass = childToken.attrGet('class')

                childToken.attrSet(
                  'class',
                  `${
                    exampleLinkClass ? `${exampleLinkClass} ` : ''
                  }example-link`
                )

                return true
              }
            })

            // Create new token to be inserted
            if (example) {
              // Insert after closing paragraph tag to avoid invalid markup
              const insertTokenIdx =
                idx +
                state.tokens
                  .slice(idx)
                  .findIndex(item => item.type === 'paragraph_close') +
                1

              insertToken = new state.Token('html_inline', '', 0)
              insertToken.content = example.form

              state.tokens.splice(insertTokenIdx, 0, insertToken)
            }
          }
        })
      })
      .use(() => {
        // Extract title and lead from files, attach to `env` option
        markdown.core.ruler.push('extract_meta', state => {
          state.tokens.some((token, idx) => {
            if (token.type === 'heading_open') {
              let title = ''
              const level = parseInt(token.tag.match(/[0-9]+/)[0], 10)

              if (level === 1) {
                state.tokens[idx + 1].children.forEach(child => {
                  if (child.type === 'text') {
                    title += child.content
                  }
                })

                // Expose title
                state.env.title = title
              }
            }

            if (token.type === 'paragraph_open') {
              let lead = ''

              state.tokens[idx + 1].children.forEach(child => {
                if (child.type === 'text') {
                  lead += child.content
                }
              })

              // Expose lead
              state.env.lead = lead

              // Stop iterating
              return true
            }
          })
        })
      })
  )
}
