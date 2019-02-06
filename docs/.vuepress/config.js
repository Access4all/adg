module.exports = {
  title: 'Accessibility Developer Guide',
  themeConfig: {
    displayAllHeaders: false,
    nav: [
      { text: 'Introduction', link: '/introduction/' },
      { text: 'Setup', link: '/setup/' },
      { text: 'Knowledge', link: '/knowledge/' },
      { text: 'Examples', link: '/examples/' }
    ],
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        children: [
          ['/introduction/', 'Introduction'],
          ['/introduction/how-to-use/', 'How to use'],
          ['/introduction/about/', 'About'],
          ['/introduction/contributing/', 'Contributing'],
          ['/introduction/license/', 'License'],
        ]
      },
      {
        title: 'Setup',
        collapsable: false,
        children: [
          ['/setup/', 'Setup'],
          ['/setup/browsers/', 'Browsers'],
          ['/setup/browsers/bookmarklets/', 'Bookmarklets'],
          ['/setup/browsers/bookmarklets/contents-structured/', 'Content Structures'],
          ['/setup/browsers/bookmarklets/h123/', 'h123'],
          ['/setup/browsers/chrome/', 'Chrome'],
          ['/setup/browsers/firefox/', 'Firefox']
        ]
      }
    ],
  }
}
