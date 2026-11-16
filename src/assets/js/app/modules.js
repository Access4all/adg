import contextTrigger from '../lib/util/contextTrigger.js'
import ModuleManager from '../lib/util/ModuleManager.js'
import Search from './modules/Search.js'
import Anchor from './modules/content/Anchor.js'
import MainNav from './modules/content/MainNav.js'
import Disclosure from './modules/content/Disclosure.js'

export default () => {
  // every module should at least implement two methods
  // Module.init = function( HTMLElement )
  // Module.destroy = function()
  //
  // Modules are per se site specific (if necessary).

  // var time = new Date()

  contextTrigger.add('.js-search', function () {
    var elem = this

    ModuleManager.connect(Search, elem)
  })

  contextTrigger.add('.js-anchor', function () {
    var elem = this

    ModuleManager.connect(Anchor, elem)
  })

  contextTrigger.add('.js-mainnav', function () {
    var elem = this

    ModuleManager.connect(MainNav, elem)
  })

  contextTrigger.add('.js-disclosure', function () {
    var elem = this

    ModuleManager.connect(Disclosure, elem)
  })

  contextTrigger.validate('body')

  // console.log('Selecting components took: ', new Date() - time, 'ms')

  return ModuleManager
}
