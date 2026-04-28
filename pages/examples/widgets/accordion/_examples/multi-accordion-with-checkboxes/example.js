document
  .querySelectorAll('[data-adg-checkbox-accordion] .trigger')
  .forEach(trigger => {
    trigger.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.key === 'Enter') {
        event.preventDefault()
        trigger.checked = !trigger.checked
      }
    })
  })
