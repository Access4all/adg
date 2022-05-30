import contextTrigger from '../lib/util/contextTrigger'
import ModuleManager from '../lib/util/ModuleManager'

export default () => {
  // every module should at least implement two methods
  // Module.init = function( HTMLElement )
  // Module.destroy = function()
  //
  // Modules are per se site specific (if necessary).

  var time = new Date()

  contextTrigger.add('.js-search', function () {
    var elem = this

    require(['./modules/Search'], function (Module) {
      if (Module.default) {
        ModuleManager.connect(Module.default, elem)
      } else {
        ModuleManager.connect(Module, elem)
      }
    })
  })

  contextTrigger.add('.js-anchor', function () {
    var elem = this

    require(['./modules/content/Anchor'], function (Module) {
      if (Module.default) {
        ModuleManager.connect(Module.default, elem)
      } else {
        ModuleManager.connect(Module, elem)
      }
    })
  })

  contextTrigger.validate('body')

  //console.log('Selecting components took: ', new Date() - time, 'ms')

  return ModuleManager
}
