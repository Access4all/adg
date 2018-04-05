const generateTags = map => {
  const metatags = {
    og: [],
    standard: []
  }

  for (var key in map) {
    switch (key) {
      case 'title':
        metatags.og.push({
          property: 'og:title',
          content: map[key]
        })
        break
      case 'description':
        metatags.og.push({
          property: 'og:description',
          content: map[key]
        })
        break
      case 'url':
        metatags.og.push({
          property: 'og:url',
          content: map[key]
        })
        break
      case 'card':
        metatags.standard.push({
          name: 'twitter:card',
          content: map[key]
        })
        break
      case 'site_name':
        metatags.og.push({
          property: 'og:site_name',
          content: map[key]
        })
        break
      default:
    }
  }

  return metatags
}

module.exports = {
  generateTags
}
