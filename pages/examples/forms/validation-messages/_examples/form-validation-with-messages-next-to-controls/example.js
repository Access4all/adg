;(function () {
  function getUrlParam(name) {
    return new URLSearchParams(window.location.search).get(name)
  }

  function showError(input, message) {
    let errorContainer = input.closest('fieldset') || input.parentElement
    if (!errorContainer) return

    const errorId = `${input.name}-error`
    input.setAttribute('aria-describedby', errorId)
    input.setAttribute('aria-invalid', 'true')

    if (!document.getElementById(errorId)) {
      const errorMessage = document.createElement('p')
      errorMessage.id = errorId
      errorMessage.className = 'error'
      errorMessage.textContent = message
      errorContainer.appendChild(errorMessage)
    }

    if (!document.querySelector(':focus')) {
      input.focus()
    }
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
