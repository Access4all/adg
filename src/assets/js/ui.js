import 'details-polyfill'
import modules from './app/modules'

modules()

// Init skip link
document.addEventListener('DOMContentLoaded', () => {
  const skipLink = document.getElementById('jump')
  if (!skipLink) return

  const skipTarget =
    document.getElementById('jump-target') ||
    document.getElementById('main-content')
  skipLink.addEventListener('click', event => {
    skipTarget.setAttribute('tabindex', '-1')
    skipTarget.focus()
  })
})
