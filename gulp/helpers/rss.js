const Feed = require('feed')

module.exports = (origPages = []) => {
  const appConfig = require('../../config')

  // Sort by date
  const pages = origPages.sort((a, b) => {
    return a.data.changed - b.data.changed
  })

  const feed = new Feed({
    title: appConfig.title,
    description: appConfig.description,
    id: appConfig.url,
    link: appConfig.url,
    image: appConfig.media.image,
    favicon: appConfig.media.favicon,
    copyright: appConfig.copyright,
    updated: pages[0] ? new Date(pages[0].data.changed) : null,
    feedLinks: {
      json: `${appConfig.url}/feed/feed.json`,
      atom: `${appConfig.url}/feed/atom.xml`
    },
    author: appConfig.author
  })

  pages.forEach(page => {
    const slug = `${appConfig.url}/${page.data.url}`

    feed.addItem({
      title: page.data.title,
      id: slug,
      link: slug,
      description: page.data.lead,
      // content: page.contents.toString(),
      date: new Date(page.data.changed)
    })
  })

  return feed
}
