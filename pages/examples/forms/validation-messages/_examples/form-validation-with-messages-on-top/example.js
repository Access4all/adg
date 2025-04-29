;(function () {
  function getUrlParam(name) {
    return new URLSearchParams(window.location.search).get(name)
  }

  function showError(input, message) {
    let errorContainer = document.querySelector('.errors ul')
    if (!errorContainer) {
      const fieldset = document.createElement('fieldset')
      fieldset.className = 'errors'
      fieldset.innerHTML = '<legend>Errors</legend><ul></ul>'
      document.body.prepend(fieldset)
      errorContainer = fieldset.querySelector('ul')
    }

    const errorId = `${input.name}-error`
    input.setAttribute('aria-describedby', errorId)
    input.setAttribute('aria-invalid', 'true')

    const errorItem = document.createElement('li')
    errorItem.innerHTML = `<a href="#${input.id}" id="${errorId}" class="error">${message}</a>`
    errorItem.querySelector('a').addEventListener('click', e => {
      input.focus()
      e.preventDefault()
    })

    errorContainer.appendChild(errorItem)
  }

  function validateInput(name, message) {
    const input = document.querySelector(`[name="${name}"]`)
    if (!input) return

    const value = getUrlParam(name)
    if (!value) {
      showError(input, message)
    } else {
      if (input.type === 'checkbox' || input.type === 'radio') {
        document
          .querySelector(`[name="${name}"][value="${value}"]`)
          .setAttribute('checked', 'true')
      } else {
        input.value = value
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (getUrlParam('validate')) {
      validateInput('name', 'Please enter your name!')
      validateInput('biography', 'Please tell us something about your history!')
      validateInput('gender', 'Please tell us your gender!')
      validateInput('accept_agbs', 'You must accept our terms and conditions!')

      if (!document.querySelector('.error')) {
        alert('All inputs are valid.')
      }
    }
  })
})()
