import $ from 'jquery'

import 'details-polyfill'
import modules from './app/modules'

modules()

// Fixed broken skip link, see https://axesslab.com/skip-links/#update-1-a-better-solution
$(document).ready(function () {
  $('#jump').click(function (e) {
    e.preventDefault()
    $('#main-content').attr('tabindex', '-1').focus()
  })
})
