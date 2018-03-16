(function() {
  this.Adg = {};

  Adg.Base = (function() {
    var config, uniqueIdCount;

    class Base {
      
      // Constructor. Should not be overridden; use @init() instead.

      // - Arg1: The DOM element on which the script should be applied (will be saved as @$el)
      // - Arg2: An optional hash of options which will be merged into the global default config
      constructor(el, options = {}) {
        var key, val;
        this.$el = $(el);
        this.config = config;
        for (key in options) {
          val = options[key];
          this.config[key] = val;
        }
        this.init();
      }

      // Dummy, must be overridden in inheriting classes.
      init() {
        return this.throwMessageAndPrintObjectsToConsole('Classes extending App must implement method init()!');
      }

      // Prints the given message to the console if config['debug'] is true.
      debugMessage(message) {
        if (this.config.debugMessage) {
          return console.log(`Adg debug: ${message}`);
        }
      }

      // Executes the given selector on @$el and returns the element. Makes sure exactly one element exists.
      findOne(selector) {
        var result;
        result = this.$el.find(selector);
        switch (result.length) {
          case 0:
            return this.throwMessageAndPrintObjectsToConsole(`No object found for ${selector}!`, {
              result: result
            });
          case 1:
            return $(result.first());
          default:
            return this.throwMessageAndPrintObjectsToConsole(`More than one object found for ${selector}!`, {
              result: result
            });
        }
      }

      name() {
        return `adg-${this.constructor.name.toLowerCase()}`;
      }

      addAdgDataAttribute($target, name, value = '') {
        return $target.attr(this.adgDataAttributeName(name), value);
      }

      removeAdgDataAttribute($target, name) {
        return $target.removeAttr(this.adgDataAttributeName(name));
      }

      adgDataAttributeName(name = null) {
        var result;
        result = `data-${this.name()}`;
        if (name) {
          result += `-${name}`;
        }
        return result;
      }

      uniqueId(name) {
        return [this.name(), name, uniqueIdCount++].join('-');
      }

      labelOfInput($inputs) {
        return $inputs.map((i, input) => {
          var $input, $label, id;
          $input = $(input);
          id = $input.attr('id');
          $label = this.findOne(`label[for='${id}']`)[0];
          if ($label.length === 0) {
            $label = $input.closest('label');
            if ($label.length === 0) {
              this.throwMessageAndPrintObjectsToConsole("No corresponding input found for input!", {
                input: $input
              });
            }
          }
          return $label;
        });
      }

      show($el) {
        $el.removeAttr('hidden');
        return $el.show();
      }

      // TODO Would be cool to renounce CSS and solely use the hidden attribute. But jQuery's :visible doesn't seem to work with it!?
      // @throwMessageAndPrintObjectsToConsole("Element is still hidden, although hidden attribute was removed! Make sure there's no CSS like display:none or visibility:hidden left on it!", element: $el) if $el.is(':hidden')
      hide($el) {
        $el.attr('hidden', '');
        return $el.hide();
      }

      throwMessageAndPrintObjectsToConsole(message, elements = {}) {
        console.log(elements);
        throw message;
      }

      text(text, options = {}) {
        var key, value;
        text = this.config[`${text}Text`];
        for (key in options) {
          value = options[key];
          text = text.replace(`[${key}]`, value);
        }
        return text;
      }

    };

    uniqueIdCount = 1;

    config = {
      debugMessage: false,
      hiddenCssClass: 'adg-visually-hidden'
    };

    return Base;

  }).call(this);

  Adg.Autocomplete = (function() {
    var config;

    // Tested in JAWS+IE/FF, NVDA+FF

    // Known issues:
    // - JAWS leaves the input when using up/down without entering something (I guess this is due to screen layout and can be considered intended)
    // - Alert not perceivable upon opening options using up/down
    //     - Possible solution 1: always show options count when filter focused?
    //     - Possible solution 2: wait a moment before adding the alert?
    // - VoiceOver/iOS announces radio buttons as disabled?!
    // - iOS doesn't select all text when option was chosen

    // In general: alerts seem to be most robust in all relevant browsers, but aren't polite. Maybe we'll find a better mechanism to serve browsers individually?
    class Autocomplete extends Adg.Base {
      init() {
        var jsonOptions, key, val;
        // Merge config into existing one (not nice, see https://stackoverflow.com/questions/47721699/)
        for (key in config) {
          val = config[key];
          this.config[key] = val;
        }
        jsonOptions = this.$el.attr(this.adgDataAttributeName());
        if (jsonOptions) {
          for (key in jsonOptions) {
            val = jsonOptions[key];
            this.config[key] = val;
          }
        }
        this.debugMessage('start');
        this.initFilter();
        this.initOptions();
        this.initAlerts();
        this.applyCheckedOptionToFilter();
        this.announceOptionsNumber('');
        return this.attachEvents();
      }

      initFilter() {
        this.$filter = this.findOne('input[type="text"]');
        this.addAdgDataAttribute(this.$filter, 'filter');
        this.$filter.attr('autocomplete', 'off');
        return this.$filter.attr('aria-expanded', 'false');
      }

      initOptions() {
        this.$optionsContainer = this.findOne(this.config.optionsContainer);
        this.addAdgDataAttribute(this.$optionsContainer, 'options');
        this.$optionsContainerLabel = this.findOne(this.config.optionsContainerLabel);
        this.$optionsContainerLabel.addClass(this.config.hiddenCssClass);
        this.$options = this.$optionsContainer.find('input[type="radio"]');
        this.addAdgDataAttribute(this.labelOfInput(this.$options), 'option');
        return this.$options.addClass(this.config.hiddenCssClass);
      }

      initAlerts() {
        this.$alertsContainer = $(`<div id='${this.uniqueId(this.config.alertsContainerId)}'></div>`);
        this.$optionsContainerLabel.after(this.$alertsContainer);
        this.$filter.attr('aria-describedby', [this.$filter.attr('aria-describedby'), this.$alertsContainer.attr('id')].join(' ').trim());
        return this.addAdgDataAttribute(this.$alertsContainer, 'alerts');
      }

      attachEvents() {
        this.attachClickEventToFilter();
        this.attachChangeEventToFilter();
        this.attachEscapeKeyToFilter();
        this.attachEnterKeyToFilter();
        this.attachTabKeyToFilter();
        this.attachUpDownKeysToFilter();
        this.attachChangeEventToOptions();
        return this.attachClickEventToOptions();
      }

      attachClickEventToFilter() {
        return this.$filter.click(() => {
          this.debugMessage('click filter');
          if (this.$optionsContainer.is(':visible')) {
            return this.hideOptions();
          } else {
            return this.showOptions();
          }
        });
      }

      attachEscapeKeyToFilter() {
        return this.$filter.keydown((e) => {
          if (e.which === 27) {
            if (this.$optionsContainer.is(':visible')) {
              this.applyCheckedOptionToFilterAndResetOptions();
              return e.preventDefault();
            } else if (this.$options.is(':checked')) {
              this.$options.prop('checked', false);
              this.applyCheckedOptionToFilterAndResetOptions();
              return e.preventDefault(); // Needed for automatic testing only
            } else {
              return $('body').append('<p>Esc passed on.</p>');
            }
          }
        });
      }

      attachEnterKeyToFilter() {
        return this.$filter.keydown((e) => {
          if (e.which === 13) {
            this.debugMessage('enter');
            if (this.$optionsContainer.is(':visible')) {
              this.applyCheckedOptionToFilterAndResetOptions();
              return e.preventDefault(); // Needed for automatic testing only
            } else {
              return $('body').append('<p>Enter passed on.</p>');
            }
          }
        });
      }

      attachTabKeyToFilter() {
        return this.$filter.keydown((e) => {
          if (e.which === 9) {
            this.debugMessage('tab');
            if (this.$optionsContainer.is(':visible')) {
              return this.applyCheckedOptionToFilterAndResetOptions();
            }
          }
        });
      }

      attachUpDownKeysToFilter() {
        return this.$filter.keydown((e) => {
          if (e.which === 38 || e.which === 40) {
            if (this.$optionsContainer.is(':visible')) {
              if (e.which === 38) {
                this.moveSelection('up');
              } else {
                this.moveSelection('down');
              }
            } else {
              this.showOptions();
            }
            return e.preventDefault(); // TODO: Test!
          }
        });
      }

      showOptions() {
        this.debugMessage('(show options)');
        this.show(this.$optionsContainer);
        return this.$filter.attr('aria-expanded', 'true');
      }

      hideOptions() {
        this.debugMessage('(hide options)');
        this.hide(this.$optionsContainer);
        return this.$filter.attr('aria-expanded', 'false');
      }

      moveSelection(direction) {
        var $upcomingOption, $visibleOptions, currentIndex, maxIndex, upcomingIndex;
        $visibleOptions = this.$options.filter(':visible');
        maxIndex = $visibleOptions.length - 1;
        currentIndex = $visibleOptions.index($visibleOptions.parent().find(':checked')); // TODO: is parent() good here?!
        upcomingIndex = direction === 'up' ? currentIndex <= 0 ? maxIndex : currentIndex - 1 : currentIndex === maxIndex ? 0 : currentIndex + 1;
        $upcomingOption = $($visibleOptions[upcomingIndex]);
        return $upcomingOption.prop('checked', true).trigger('change');
      }

      attachChangeEventToOptions() {
        return this.$options.change((e) => {
          this.debugMessage('option change');
          this.applyCheckedOptionToFilter();
          return this.$filter.focus().select();
        });
      }

      applyCheckedOptionToFilterAndResetOptions() {
        this.applyCheckedOptionToFilter();
        this.hideOptions();
        return this.filterOptions();
      }

      applyCheckedOptionToFilter() {
        var $checkedOption, $checkedOptionLabel, $previouslyCheckedOptionLabel;
        this.debugMessage('(apply option to filter)');
        $previouslyCheckedOptionLabel = $(`[${this.adgDataAttributeName('option-selected')}]`);
        if ($previouslyCheckedOptionLabel.length === 1) {
          this.removeAdgDataAttribute($previouslyCheckedOptionLabel, 'option-selected');
        }
        $checkedOption = this.$options.filter(':checked');
        if ($checkedOption.length === 1) {
          $checkedOptionLabel = this.labelOfInput($checkedOption);
          this.$filter.val($.trim($checkedOptionLabel.text()));
          return this.addAdgDataAttribute($checkedOptionLabel, 'option-selected');
        } else {
          return this.$filter.val('');
        }
      }

      attachClickEventToOptions() {
        return this.$options.click((e) => {
          this.debugMessage('click option');
          return this.hideOptions();
        });
      }

      attachChangeEventToFilter() {
        return this.$filter.on('input propertychange paste', (e) => {
          this.debugMessage('(filter changed)');
          this.filterOptions(e.target.value);
          return this.showOptions();
        });
      }

      filterOptions(filter = '') {
        var fuzzyFilter, visibleNumber;
        fuzzyFilter = this.fuzzifyFilter(filter);
        visibleNumber = 0;
        this.$options.each((i, el) => {
          var $option, $optionContainer, regex;
          $option = $(el);
          $optionContainer = $option.parent();
          regex = new RegExp(fuzzyFilter, 'i');
          if (regex.test($optionContainer.text())) {
            visibleNumber++;
            return this.show($optionContainer);
          } else {
            return this.hide($optionContainer);
          }
        });
        return this.announceOptionsNumber(filter, visibleNumber);
      }

      announceOptionsNumber(filter = this.$filter.val(), number = this.$options.length) {
        var message;
        this.$alertsContainer.find('p').remove(); // Remove previous alerts (I'm not sure whether this is the best solution, maybe hiding them would be more robust?)
        message = filter === '' ? this.text('numberInTotal', {
          number: number
        }) : this.text('numberFiltered', {
          number: number,
          total: this.$options.length,
          filter: `<kbd>${filter}</kbd>`
        });
        return this.$alertsContainer.append(`<p role='alert'>${message}</p>`);
      }

      fuzzifyFilter(filter) {
        var escapedCharacter, fuzzifiedFilter, i;
        i = 0;
        fuzzifiedFilter = '';
        while (i < filter.length) {
          escapedCharacter = filter.charAt(i).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // See https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
          fuzzifiedFilter += `${escapedCharacter}.*?`;
          i++;
        }
        return fuzzifiedFilter;
      }

    };

    config = {
      optionsContainer: 'fieldset',
      optionsContainerLabel: 'legend',
      alertsContainerId: 'alerts',
      numberInTotalText: '[number] options in total',
      numberFilteredText: '[number] of [total] options for [filter]'
    };

    return Autocomplete;

  }).call(this);

  $(document).ready(function() {
    return $('[data-adg-autocomplete]').each(function() {
      return new Adg.Autocomplete(this);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxJQUFDLENBQUEsR0FBRCxHQUFPLENBQUE7O0VBRUQsR0FBRyxDQUFDOzs7SUFBVixNQUFBLEtBQUEsQ0FBQTs7Ozs7O01BV0UsV0FBYSxDQUFDLEVBQUQsRUFBSyxVQUFVLENBQUEsQ0FBZixDQUFBO0FBQ1gsWUFBQSxHQUFBLEVBQUE7UUFBQSxJQUFDLENBQUEsR0FBRCxHQUFPLENBQUEsQ0FBRSxFQUFGO1FBRVAsSUFBQyxDQUFBLE1BQUQsR0FBVTtRQUNWLEtBQUEsY0FBQTs7VUFDRSxJQUFDLENBQUEsTUFBTyxDQUFBLEdBQUEsQ0FBUixHQUFlO1FBRGpCO1FBR0EsSUFBQyxDQUFBLElBQUQsQ0FBQTtNQVBXLENBVmI7OztNQW9CQSxJQUFNLENBQUEsQ0FBQTtlQUNKLElBQUMsQ0FBQSxvQ0FBRCxDQUFzQyxxREFBdEM7TUFESSxDQXBCTjs7O01Bd0JBLFlBQWMsQ0FBQyxPQUFELENBQUE7UUFDWixJQUF1QyxJQUFDLENBQUEsTUFBTSxDQUFDLFlBQS9DO2lCQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBQSxXQUFBLENBQUEsQ0FBYyxPQUFkLENBQUEsQ0FBWixFQUFBOztNQURZLENBeEJkOzs7TUE0QkEsT0FBUyxDQUFDLFFBQUQsQ0FBQTtBQUNQLFlBQUE7UUFBQSxNQUFBLEdBQVMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsUUFBVjtBQUNULGdCQUFPLE1BQU0sQ0FBQyxNQUFkO0FBQUEsZUFDTyxDQURQO21CQUNjLElBQUMsQ0FBQSxvQ0FBRCxDQUFzQyxDQUFBLG9CQUFBLENBQUEsQ0FBdUIsUUFBdkIsQ0FBZ0MsQ0FBaEMsQ0FBdEMsRUFBMEU7Y0FBQSxNQUFBLEVBQVE7WUFBUixDQUExRTtBQURkLGVBRU8sQ0FGUDttQkFFYyxDQUFBLENBQUUsTUFBTSxDQUFDLEtBQVAsQ0FBQSxDQUFGO0FBRmQ7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LE9BQWpCLENBQXlCLHFDQUF6QixFQUFnRSxNQUFoRSxFQUFuQjtVQUNBLGVBQUEsSUFBbUIsQ0FBQSxDQUFBLENBQUcsZ0JBQUgsQ0FBb0IsR0FBcEI7VUFDbkIsQ0FBQTtRQUhGO2VBS0E7TUFSYTs7SUFqTmpCOztJQUNFLE1BQUEsR0FDRTtNQUFBLGdCQUFBLEVBQXVCLFVBQXZCO01BQ0EscUJBQUEsRUFBdUIsUUFEdkI7TUFFQSxpQkFBQSxFQUF1QixRQUZ2QjtNQUdBLGlCQUFBLEVBQXVCLDJCQUh2QjtNQUlBLGtCQUFBLEVBQXVCO0lBSnZCOzs7Ozs7RUF5TkosQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEtBQVosQ0FBa0IsUUFBQSxDQUFBLENBQUE7V0FDaEIsQ0FBQSxDQUFFLHlCQUFGLENBQTRCLENBQUMsSUFBN0IsQ0FBa0MsUUFBQSxDQUFBLENBQUE7YUFDaEMsSUFBSSxHQUFHLENBQUMsWUFBUixDQUFxQixJQUFyQjtJQURnQyxDQUFsQztFQURnQixDQUFsQjtBQWpVQSIsInNvdXJjZXNDb250ZW50IjpbIkBBZGcgPSB7fVxuXG5jbGFzcyBBZGcuQmFzZVxuICB1bmlxdWVJZENvdW50ID0gMVxuICBcbiAgY29uZmlnID1cbiAgICBkZWJ1Z01lc3NhZ2U6ICAgZmFsc2VcbiAgICBoaWRkZW5Dc3NDbGFzczogJ2FkZy12aXN1YWxseS1oaWRkZW4nXG4gIFxuICAjIENvbnN0cnVjdG9yLiBTaG91bGQgbm90IGJlIG92ZXJyaWRkZW47IHVzZSBAaW5pdCgpIGluc3RlYWQuXG4gICNcbiAgIyAtIEFyZzE6IFRoZSBET00gZWxlbWVudCBvbiB3aGljaCB0aGUgc2NyaXB0IHNob3VsZCBiZSBhcHBsaWVkICh3aWxsIGJlIHNhdmVkIGFzIEAkZWwpXG4gICMgLSBBcmcyOiBBbiBvcHRpb25hbCBoYXNoIG9mIG9wdGlvbnMgd2hpY2ggd2lsbCBiZSBtZXJnZWQgaW50byB0aGUgZ2xvYmFsIGRlZmF1bHQgY29uZmlnXG4gIGNvbnN0cnVjdG9yOiAoZWwsIG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAJGVsID0gJChlbClcblxuICAgIEBjb25maWcgPSBjb25maWdcbiAgICBmb3Iga2V5LCB2YWwgb2Ygb3B0aW9uc1xuICAgICAgQGNvbmZpZ1trZXldID0gdmFsXG4gICAgXG4gICAgQGluaXQoKVxuXG4gICMgRHVtbXksIG11c3QgYmUgb3ZlcnJpZGRlbiBpbiBpbmhlcml0aW5nIGNsYXNzZXMuXG4gIGluaXQ6IC0+XG4gICAgQHRocm93TWVzc2FnZUFuZFByaW50T2JqZWN0c1RvQ29uc29sZSAnQ2xhc3NlcyBleHRlbmRpbmcgQXBwIG11c3QgaW1wbGVtZW50IG1ldGhvZCBpbml0KCkhJ1xuXG4gICMgUHJpbnRzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIHRoZSBjb25zb2xlIGlmIGNvbmZpZ1snZGVidWcnXSBpcyB0cnVlLlxuICBkZWJ1Z01lc3NhZ2U6IChtZXNzYWdlKSAtPlxuICAgIGNvbnNvbGUubG9nIFwiQWRnIGRlYnVnOiAje21lc3NhZ2V9XCIgaWYgQGNvbmZpZy5kZWJ1Z01lc3NhZ2VcblxuICAjIEV4ZWN1dGVzIHRoZSBnaXZlbiBzZWxlY3RvciBvbiBAJGVsIGFuZCByZXR1cm5zIHRoZSBlbGVtZW50LiBNYWtlcyBzdXJlIGV4YWN0bHkgb25lIGVsZW1lbnQgZXhpc3RzLlxuICBmaW5kT25lOiAoc2VsZWN0b3IpIC0+XG4gICAgcmVzdWx0ID0gQCRlbC5maW5kKHNlbGVjdG9yKVxuICAgIHN3aXRjaCByZXN1bHQubGVuZ3RoXG4gICAgICB3aGVuIDAgdGhlbiBAdGhyb3dNZXNzYWdlQW5kUHJpbnRPYmplY3RzVG9Db25zb2xlIFwiTm8gb2JqZWN0IGZvdW5kIGZvciAje3NlbGVjdG9yfSFcIiwgcmVzdWx0OiByZXN1bHRcbiAgICAgIHdoZW4gMSB0aGVuICQocmVzdWx0LmZpcnN0KCkpXG4gICAgICBlbHNlIEB0aHJvd01lc3NhZ2VBbmRQcmludE9iamVjdHNUb0NvbnNvbGUgXCJNb3JlIHRoYW4gb25lIG9iamVjdCBmb3VuZCBmb3IgI3tzZWxlY3Rvcn0hXCIsIHJlc3VsdDogcmVzdWx0XG4gICAgICAgIFxuICBuYW1lOiAtPlxuICAgIFwiYWRnLSN7QGNvbnN0cnVjdG9yLm5hbWUudG9Mb3dlckNhc2UoKX1cIlxuICAgICAgICBcbiAgYWRkQWRnRGF0YUF0dHJpYnV0ZTogKCR0YXJnZXQsIG5hbWUsIHZhbHVlID0gJycpIC0+XG4gICAgJHRhcmdldC5hdHRyKEBhZGdEYXRhQXR0cmlidXRlTmFtZShuYW1lKSwgdmFsdWUpXG4gICAgICAgIFxuICByZW1vdmVBZGdEYXRhQXR0cmlidXRlOiAoJHRhcmdldCwgbmFtZSkgLT5cbiAgICAkdGFyZ2V0LnJlbW92ZUF0dHIoQGFkZ0RhdGFBdHRyaWJ1dGVOYW1lKG5hbWUpKVxuICAgIFxuICBhZGdEYXRhQXR0cmlidXRlTmFtZTogKG5hbWUgPSBudWxsKSAtPlxuICAgIHJlc3VsdCA9IFwiZGF0YS0je0BuYW1lKCl9XCJcbiAgICByZXN1bHQgKz0gXCItI3tuYW1lfVwiIGlmIG5hbWVcbiAgICByZXN1bHRcbiAgICBcbiAgdW5pcXVlSWQ6IChuYW1lKSAtPlxuICAgIFtAbmFtZSgpLCBuYW1lLCB1bmlxdWVJZENvdW50KytdLmpvaW4gJy0nXG4gICAgXG4gIGxhYmVsT2ZJbnB1dDogKCRpbnB1dHMpIC0+XG4gICAgJGlucHV0cy5tYXAgKGksIGlucHV0KSA9PlxuICAgICAgJGlucHV0ID0gJChpbnB1dClcbiAgICAgIFxuICAgICAgaWQgPSAkaW5wdXQuYXR0cignaWQnKVxuICAgICAgJGxhYmVsID0gQGZpbmRPbmUoXCJsYWJlbFtmb3I9JyN7aWR9J11cIilbMF1cblxuICAgICAgaWYgJGxhYmVsLmxlbmd0aCA9PSAwXG4gICAgICAgICRsYWJlbCA9ICRpbnB1dC5jbG9zZXN0KCdsYWJlbCcpXG4gICAgICAgIEB0aHJvd01lc3NhZ2VBbmRQcmludE9iamVjdHNUb0NvbnNvbGUgXCJObyBjb3JyZXNwb25kaW5nIGlucHV0IGZvdW5kIGZvciBpbnB1dCFcIiwgaW5wdXQ6ICRpbnB1dCBpZiAkbGFiZWwubGVuZ3RoID09IDBcblxuICAgICAgJGxhYmVsXG5cbiAgc2hvdzogKCRlbCkgLT5cbiAgICAkZWwucmVtb3ZlQXR0cignaGlkZGVuJylcbiAgICAkZWwuc2hvdygpXG5cbiAgICAjIFRPRE8gV291bGQgYmUgY29vbCB0byByZW5vdW5jZSBDU1MgYW5kIHNvbGVseSB1c2UgdGhlIGhpZGRlbiBhdHRyaWJ1dGUuIEJ1dCBqUXVlcnkncyA6dmlzaWJsZSBkb2Vzbid0IHNlZW0gdG8gd29yayB3aXRoIGl0IT9cbiAgICAjIEB0aHJvd01lc3NhZ2VBbmRQcmludE9iamVjdHNUb0NvbnNvbGUoXCJFbGVtZW50IGlzIHN0aWxsIGhpZGRlbiwgYWx0aG91Z2ggaGlkZGVuIGF0dHJpYnV0ZSB3YXMgcmVtb3ZlZCEgTWFrZSBzdXJlIHRoZXJlJ3Mgbm8gQ1NTIGxpa2UgZGlzcGxheTpub25lIG9yIHZpc2liaWxpdHk6aGlkZGVuIGxlZnQgb24gaXQhXCIsIGVsZW1lbnQ6ICRlbCkgaWYgJGVsLmlzKCc6aGlkZGVuJylcblxuICBoaWRlOiAoJGVsKSAtPlxuICAgICRlbC5hdHRyKCdoaWRkZW4nLCAnJylcbiAgICAkZWwuaGlkZSgpXG4gICAgXG4gIHRocm93TWVzc2FnZUFuZFByaW50T2JqZWN0c1RvQ29uc29sZTogKG1lc3NhZ2UsIGVsZW1lbnRzID0ge30pIC0+XG4gICAgY29uc29sZS5sb2cgZWxlbWVudHNcbiAgICB0aHJvdyBtZXNzYWdlXG4gICAgXG4gIHRleHQ6ICh0ZXh0LCBvcHRpb25zID0ge30pIC0+XG4gICAgdGV4dCA9IEBjb25maWdbXCIje3RleHR9VGV4dFwiXVxuICAgIFxuICAgIGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgXCJbI3trZXl9XVwiLCB2YWx1ZVxuICAgICAgXG4gICAgdGV4dFxuXG4jIFRlc3RlZCBpbiBKQVdTK0lFL0ZGLCBOVkRBK0ZGXG4jXG4jIEtub3duIGlzc3VlczpcbiMgLSBKQVdTIGxlYXZlcyB0aGUgaW5wdXQgd2hlbiB1c2luZyB1cC9kb3duIHdpdGhvdXQgZW50ZXJpbmcgc29tZXRoaW5nIChJIGd1ZXNzIHRoaXMgaXMgZHVlIHRvIHNjcmVlbiBsYXlvdXQgYW5kIGNhbiBiZSBjb25zaWRlcmVkIGludGVuZGVkKVxuIyAtIEFsZXJ0IG5vdCBwZXJjZWl2YWJsZSB1cG9uIG9wZW5pbmcgb3B0aW9ucyB1c2luZyB1cC9kb3duXG4jICAgICAtIFBvc3NpYmxlIHNvbHV0aW9uIDE6IGFsd2F5cyBzaG93IG9wdGlvbnMgY291bnQgd2hlbiBmaWx0ZXIgZm9jdXNlZD9cbiMgICAgIC0gUG9zc2libGUgc29sdXRpb24gMjogd2FpdCBhIG1vbWVudCBiZWZvcmUgYWRkaW5nIHRoZSBhbGVydD9cbiMgLSBWb2ljZU92ZXIvaU9TIGFubm91bmNlcyByYWRpbyBidXR0b25zIGFzIGRpc2FibGVkPyFcbiMgLSBpT1MgZG9lc24ndCBzZWxlY3QgYWxsIHRleHQgd2hlbiBvcHRpb24gd2FzIGNob3NlblxuI1xuIyBJbiBnZW5lcmFsOiBhbGVydHMgc2VlbSB0byBiZSBtb3N0IHJvYnVzdCBpbiBhbGwgcmVsZXZhbnQgYnJvd3NlcnMsIGJ1dCBhcmVuJ3QgcG9saXRlLiBNYXliZSB3ZSdsbCBmaW5kIGEgYmV0dGVyIG1lY2hhbmlzbSB0byBzZXJ2ZSBicm93c2VycyBpbmRpdmlkdWFsbHk/XG5jbGFzcyBBZGcuQXV0b2NvbXBsZXRlIGV4dGVuZHMgQWRnLkJhc2VcbiAgY29uZmlnID1cbiAgICBvcHRpb25zQ29udGFpbmVyOiAgICAgICdmaWVsZHNldCdcbiAgICBvcHRpb25zQ29udGFpbmVyTGFiZWw6ICdsZWdlbmQnXG4gICAgYWxlcnRzQ29udGFpbmVySWQ6ICAgICAnYWxlcnRzJ1xuICAgIG51bWJlckluVG90YWxUZXh0OiAgICAgJ1tudW1iZXJdIG9wdGlvbnMgaW4gdG90YWwnXG4gICAgbnVtYmVyRmlsdGVyZWRUZXh0OiAgICAnW251bWJlcl0gb2YgW3RvdGFsXSBvcHRpb25zIGZvciBbZmlsdGVyXSdcbiAgXG4gIGluaXQ6IC0+XG4gICAgIyBNZXJnZSBjb25maWcgaW50byBleGlzdGluZyBvbmUgKG5vdCBuaWNlLCBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDc3MjE2OTkvKVxuICAgIGZvciBrZXksIHZhbCBvZiBjb25maWdcbiAgICAgIEBjb25maWdba2V5XSA9IHZhbFxuICAgICAgXG4gICAganNvbk9wdGlvbnMgPSBAJGVsLmF0dHIoQGFkZ0RhdGFBdHRyaWJ1dGVOYW1lKCkpXG4gICAgaWYganNvbk9wdGlvbnNcbiAgICAgIGZvciBrZXksIHZhbCBvZiBqc29uT3B0aW9uc1xuICAgICAgICBAY29uZmlnW2tleV0gPSB2YWxcbiAgICBcbiAgICBAZGVidWdNZXNzYWdlICdzdGFydCdcblxuICAgIEBpbml0RmlsdGVyKClcbiAgICBAaW5pdE9wdGlvbnMoKVxuICAgIEBpbml0QWxlcnRzKClcbiAgICBcbiAgICBAYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXIoKVxuICAgIEBhbm5vdW5jZU9wdGlvbnNOdW1iZXIoJycpXG5cbiAgICBAYXR0YWNoRXZlbnRzKClcbiAgICBcbiAgaW5pdEZpbHRlcjogLT5cbiAgICBAJGZpbHRlciA9IEBmaW5kT25lKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXG4gICAgQGFkZEFkZ0RhdGFBdHRyaWJ1dGUoQCRmaWx0ZXIsICdmaWx0ZXInKVxuICAgIEAkZmlsdGVyLmF0dHIoJ2F1dG9jb21wbGV0ZScsICdvZmYnKVxuICAgIEAkZmlsdGVyLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgIFxuICBpbml0T3B0aW9uczogLT5cbiAgICBAJG9wdGlvbnNDb250YWluZXIgPSBAZmluZE9uZShAY29uZmlnLm9wdGlvbnNDb250YWluZXIpXG4gICAgQGFkZEFkZ0RhdGFBdHRyaWJ1dGUoQCRvcHRpb25zQ29udGFpbmVyLCAnb3B0aW9ucycpXG4gICAgXG4gICAgQCRvcHRpb25zQ29udGFpbmVyTGFiZWwgPSBAZmluZE9uZShAY29uZmlnLm9wdGlvbnNDb250YWluZXJMYWJlbClcbiAgICBAJG9wdGlvbnNDb250YWluZXJMYWJlbC5hZGRDbGFzcyhAY29uZmlnLmhpZGRlbkNzc0NsYXNzKVxuICAgIFxuICAgIEAkb3B0aW9ucyA9IEAkb3B0aW9uc0NvbnRhaW5lci5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKVxuICAgIEBhZGRBZGdEYXRhQXR0cmlidXRlKEBsYWJlbE9mSW5wdXQoQCRvcHRpb25zKSwgJ29wdGlvbicpXG4gICAgQCRvcHRpb25zLmFkZENsYXNzKEBjb25maWcuaGlkZGVuQ3NzQ2xhc3MpXG4gICAgXG4gIGluaXRBbGVydHM6IC0+XG4gICAgQCRhbGVydHNDb250YWluZXIgPSAkKFwiPGRpdiBpZD0nI3tAdW5pcXVlSWQoQGNvbmZpZy5hbGVydHNDb250YWluZXJJZCl9Jz48L2Rpdj5cIilcbiAgICBAJG9wdGlvbnNDb250YWluZXJMYWJlbC5hZnRlcihAJGFsZXJ0c0NvbnRhaW5lcilcbiAgICBAJGZpbHRlci5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgW0AkZmlsdGVyLmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknKSwgQCRhbGVydHNDb250YWluZXIuYXR0cignaWQnKV0uam9pbignICcpLnRyaW0oKSlcbiAgICBAYWRkQWRnRGF0YUF0dHJpYnV0ZShAJGFsZXJ0c0NvbnRhaW5lciwgJ2FsZXJ0cycpXG4gIFxuICBhdHRhY2hFdmVudHM6IC0+XG4gICAgQGF0dGFjaENsaWNrRXZlbnRUb0ZpbHRlcigpXG4gICAgQGF0dGFjaENoYW5nZUV2ZW50VG9GaWx0ZXIoKVxuICAgIFxuICAgIEBhdHRhY2hFc2NhcGVLZXlUb0ZpbHRlcigpXG4gICAgQGF0dGFjaEVudGVyS2V5VG9GaWx0ZXIoKVxuICAgIEBhdHRhY2hUYWJLZXlUb0ZpbHRlcigpXG4gICAgQGF0dGFjaFVwRG93bktleXNUb0ZpbHRlcigpXG4gICAgXG4gICAgQGF0dGFjaENoYW5nZUV2ZW50VG9PcHRpb25zKClcbiAgICBAYXR0YWNoQ2xpY2tFdmVudFRvT3B0aW9ucygpXG4gICAgXG4gIGF0dGFjaENsaWNrRXZlbnRUb0ZpbHRlcjogLT5cbiAgICBAJGZpbHRlci5jbGljayA9PlxuICAgICAgQGRlYnVnTWVzc2FnZSAnY2xpY2sgZmlsdGVyJ1xuICAgICAgaWYgQCRvcHRpb25zQ29udGFpbmVyLmlzKCc6dmlzaWJsZScpXG4gICAgICAgIEBoaWRlT3B0aW9ucygpXG4gICAgICBlbHNlXG4gICAgICAgIEBzaG93T3B0aW9ucygpXG4gICAgICBcbiAgYXR0YWNoRXNjYXBlS2V5VG9GaWx0ZXI6IC0+XG4gICAgQCRmaWx0ZXIua2V5ZG93biAoZSkgPT5cbiAgICAgIGlmIGUud2hpY2ggPT0gMjdcbiAgICAgICAgaWYgQCRvcHRpb25zQ29udGFpbmVyLmlzKCc6dmlzaWJsZScpXG4gICAgICAgICAgQGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyQW5kUmVzZXRPcHRpb25zKClcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZWxzZSBpZiBAJG9wdGlvbnMuaXMoJzpjaGVja2VkJylcbiAgICAgICAgICBAJG9wdGlvbnMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKVxuICAgICAgICAgIEBhcHBseUNoZWNrZWRPcHRpb25Ub0ZpbHRlckFuZFJlc2V0T3B0aW9ucygpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGVsc2UgIyBOZWVkZWQgZm9yIGF1dG9tYXRpYyB0ZXN0aW5nIG9ubHlcbiAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8cD5Fc2MgcGFzc2VkIG9uLjwvcD4nKVxuICAgICAgXG4gIGF0dGFjaEVudGVyS2V5VG9GaWx0ZXI6IC0+XG4gICAgQCRmaWx0ZXIua2V5ZG93biAoZSkgPT5cbiAgICAgIGlmIGUud2hpY2ggPT0gMTNcbiAgICAgICAgQGRlYnVnTWVzc2FnZSAnZW50ZXInXG4gICAgICAgIGlmIEAkb3B0aW9uc0NvbnRhaW5lci5pcygnOnZpc2libGUnKVxuICAgICAgICAgIEBhcHBseUNoZWNrZWRPcHRpb25Ub0ZpbHRlckFuZFJlc2V0T3B0aW9ucygpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGVsc2UgIyBOZWVkZWQgZm9yIGF1dG9tYXRpYyB0ZXN0aW5nIG9ubHlcbiAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8cD5FbnRlciBwYXNzZWQgb24uPC9wPicpXG4gICAgICBcbiAgYXR0YWNoVGFiS2V5VG9GaWx0ZXI6IC0+XG4gICAgQCRmaWx0ZXIua2V5ZG93biAoZSkgPT5cbiAgICAgIGlmIGUud2hpY2ggPT0gOVxuICAgICAgICBAZGVidWdNZXNzYWdlICd0YWInXG4gICAgICAgIGlmIEAkb3B0aW9uc0NvbnRhaW5lci5pcygnOnZpc2libGUnKVxuICAgICAgICAgIEBhcHBseUNoZWNrZWRPcHRpb25Ub0ZpbHRlckFuZFJlc2V0T3B0aW9ucygpXG4gICAgICBcbiAgYXR0YWNoVXBEb3duS2V5c1RvRmlsdGVyOiAtPlxuICAgIEAkZmlsdGVyLmtleWRvd24gKGUpID0+XG4gICAgICBpZiBlLndoaWNoID09IDM4IHx8IGUud2hpY2ggPT0gNDBcbiAgICAgICAgaWYgQCRvcHRpb25zQ29udGFpbmVyLmlzKCc6dmlzaWJsZScpXG4gICAgICAgICAgaWYgZS53aGljaCA9PSAzOFxuICAgICAgICAgICAgQG1vdmVTZWxlY3Rpb24oJ3VwJylcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBAbW92ZVNlbGVjdGlvbignZG93bicpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBAc2hvd09wdGlvbnMoKVxuICAgICAgIFxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCkgIyBUT0RPOiBUZXN0IVxuICAgIFxuICBzaG93T3B0aW9uczogLT5cbiAgICBAZGVidWdNZXNzYWdlICcoc2hvdyBvcHRpb25zKSdcbiAgICBAc2hvdyhAJG9wdGlvbnNDb250YWluZXIpXG4gICAgQCRmaWx0ZXIuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJylcbiAgICBcbiAgaGlkZU9wdGlvbnM6IC0+XG4gICAgQGRlYnVnTWVzc2FnZSAnKGhpZGUgb3B0aW9ucyknXG4gICAgQGhpZGUoQCRvcHRpb25zQ29udGFpbmVyKVxuICAgIEAkZmlsdGVyLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgIFxuICBtb3ZlU2VsZWN0aW9uOiAoZGlyZWN0aW9uKSAtPlxuICAgICR2aXNpYmxlT3B0aW9ucyA9IEAkb3B0aW9ucy5maWx0ZXIoJzp2aXNpYmxlJylcbiAgICBcbiAgICBtYXhJbmRleCA9ICR2aXNpYmxlT3B0aW9ucy5sZW5ndGggLSAxXG4gICAgY3VycmVudEluZGV4ID0gJHZpc2libGVPcHRpb25zLmluZGV4KCR2aXNpYmxlT3B0aW9ucy5wYXJlbnQoKS5maW5kKCc6Y2hlY2tlZCcpKSAjIFRPRE86IGlzIHBhcmVudCgpIGdvb2QgaGVyZT8hXG4gICAgXG4gICAgdXBjb21pbmdJbmRleCA9IGlmIGRpcmVjdGlvbiA9PSAndXAnXG4gICAgICAgICAgICAgICAgICAgICAgaWYgY3VycmVudEluZGV4IDw9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4IC0gMVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgaWYgY3VycmVudEluZGV4ID09IG1heEluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4ICsgMVxuXG4gICAgJHVwY29taW5nT3B0aW9uID0gJCgkdmlzaWJsZU9wdGlvbnNbdXBjb21pbmdJbmRleF0pXG4gICAgJHVwY29taW5nT3B0aW9uLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS50cmlnZ2VyKCdjaGFuZ2UnKVxuICAgIFxuICBhdHRhY2hDaGFuZ2VFdmVudFRvT3B0aW9uczogLT5cbiAgICBAJG9wdGlvbnMuY2hhbmdlIChlKSA9PlxuICAgICAgQGRlYnVnTWVzc2FnZSAnb3B0aW9uIGNoYW5nZSdcbiAgICAgIEBhcHBseUNoZWNrZWRPcHRpb25Ub0ZpbHRlcigpXG4gICAgICBAJGZpbHRlci5mb2N1cygpLnNlbGVjdCgpXG5cbiAgYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXJBbmRSZXNldE9wdGlvbnM6IC0+XG4gICAgQGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyKClcbiAgICBAaGlkZU9wdGlvbnMoKVxuICAgIEBmaWx0ZXJPcHRpb25zKClcbiAgICAgIFxuICBhcHBseUNoZWNrZWRPcHRpb25Ub0ZpbHRlcjogLT5cbiAgICBAZGVidWdNZXNzYWdlICcoYXBwbHkgb3B0aW9uIHRvIGZpbHRlciknXG4gICAgXG4gICAgJHByZXZpb3VzbHlDaGVja2VkT3B0aW9uTGFiZWwgPSAkKFwiWyN7QGFkZ0RhdGFBdHRyaWJ1dGVOYW1lKCdvcHRpb24tc2VsZWN0ZWQnKX1dXCIpXG4gICAgaWYgJHByZXZpb3VzbHlDaGVja2VkT3B0aW9uTGFiZWwubGVuZ3RoID09IDFcbiAgICAgIEByZW1vdmVBZGdEYXRhQXR0cmlidXRlKCRwcmV2aW91c2x5Q2hlY2tlZE9wdGlvbkxhYmVsLCAnb3B0aW9uLXNlbGVjdGVkJylcbiAgIFxuICAgICRjaGVja2VkT3B0aW9uID0gQCRvcHRpb25zLmZpbHRlcignOmNoZWNrZWQnKVxuICAgIGlmICRjaGVja2VkT3B0aW9uLmxlbmd0aCA9PSAxXG4gICAgICAkY2hlY2tlZE9wdGlvbkxhYmVsID0gQGxhYmVsT2ZJbnB1dCgkY2hlY2tlZE9wdGlvbilcbiAgICAgIEAkZmlsdGVyLnZhbCgkLnRyaW0oJGNoZWNrZWRPcHRpb25MYWJlbC50ZXh0KCkpKVxuICAgICAgQGFkZEFkZ0RhdGFBdHRyaWJ1dGUoJGNoZWNrZWRPcHRpb25MYWJlbCwgJ29wdGlvbi1zZWxlY3RlZCcpXG4gICAgZWxzZVxuICAgICAgQCRmaWx0ZXIudmFsKCcnKVxuICAgICAgXG4gIGF0dGFjaENsaWNrRXZlbnRUb09wdGlvbnM6IC0+XG4gICAgQCRvcHRpb25zLmNsaWNrIChlKSA9PlxuICAgICAgQGRlYnVnTWVzc2FnZSAnY2xpY2sgb3B0aW9uJ1xuICAgICAgQGhpZGVPcHRpb25zKClcbiAgICAgIFxuICBhdHRhY2hDaGFuZ2VFdmVudFRvRmlsdGVyOiAtPlxuICAgIEAkZmlsdGVyLm9uICdpbnB1dCBwcm9wZXJ0eWNoYW5nZSBwYXN0ZScsIChlKSA9PlxuICAgICAgQGRlYnVnTWVzc2FnZSAnKGZpbHRlciBjaGFuZ2VkKSdcbiAgICAgIEBmaWx0ZXJPcHRpb25zKGUudGFyZ2V0LnZhbHVlKVxuICAgICAgQHNob3dPcHRpb25zKClcbiAgICAgIFxuICBmaWx0ZXJPcHRpb25zOiAoZmlsdGVyID0gJycpIC0+XG4gICAgZnV6enlGaWx0ZXIgPSBAZnV6emlmeUZpbHRlcihmaWx0ZXIpXG4gICAgdmlzaWJsZU51bWJlciA9IDBcbiAgICBcbiAgICBAJG9wdGlvbnMuZWFjaCAoaSwgZWwpID0+XG4gICAgICAkb3B0aW9uID0gJChlbClcbiAgICAgICRvcHRpb25Db250YWluZXIgPSAkb3B0aW9uLnBhcmVudCgpXG5cbiAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChmdXp6eUZpbHRlciwgJ2knKVxuICAgICAgaWYgcmVnZXgudGVzdCgkb3B0aW9uQ29udGFpbmVyLnRleHQoKSlcbiAgICAgICAgdmlzaWJsZU51bWJlcisrXG4gICAgICAgIEBzaG93KCRvcHRpb25Db250YWluZXIpXG4gICAgICBlbHNlXG4gICAgICAgIEBoaWRlKCRvcHRpb25Db250YWluZXIpXG4gICAgICAgIFxuICAgIEBhbm5vdW5jZU9wdGlvbnNOdW1iZXIoZmlsdGVyLCB2aXNpYmxlTnVtYmVyKVxuICAgIFxuICBhbm5vdW5jZU9wdGlvbnNOdW1iZXI6IChmaWx0ZXIgPSBAJGZpbHRlci52YWwoKSwgbnVtYmVyID0gQCRvcHRpb25zLmxlbmd0aCkgLT5cbiAgICBAJGFsZXJ0c0NvbnRhaW5lci5maW5kKCdwJykucmVtb3ZlKCkgIyBSZW1vdmUgcHJldmlvdXMgYWxlcnRzIChJJ20gbm90IHN1cmUgd2hldGhlciB0aGlzIGlzIHRoZSBiZXN0IHNvbHV0aW9uLCBtYXliZSBoaWRpbmcgdGhlbSB3b3VsZCBiZSBtb3JlIHJvYnVzdD8pXG4gICAgXG4gICAgbWVzc2FnZSA9IGlmIGZpbHRlciA9PSAnJ1xuICAgICAgICAgICAgICAgIEB0ZXh0KCdudW1iZXJJblRvdGFsJywgbnVtYmVyOiBudW1iZXIpXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAdGV4dCgnbnVtYmVyRmlsdGVyZWQnLCBudW1iZXI6IG51bWJlciwgdG90YWw6IEAkb3B0aW9ucy5sZW5ndGgsIGZpbHRlcjogXCI8a2JkPiN7ZmlsdGVyfTwva2JkPlwiKVxuICAgICAgXG4gICAgQCRhbGVydHNDb250YWluZXIuYXBwZW5kKFwiPHAgcm9sZT0nYWxlcnQnPiN7bWVzc2FnZX08L3A+XCIpXG4gICAgICAgIFxuICBmdXp6aWZ5RmlsdGVyOiAoZmlsdGVyKSAtPlxuICAgIGkgPSAwXG4gICAgZnV6emlmaWVkRmlsdGVyID0gJydcbiAgICB3aGlsZSBpIDwgZmlsdGVyLmxlbmd0aFxuICAgICAgZXNjYXBlZENoYXJhY3RlciA9IGZpbHRlci5jaGFyQXQoaSkucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpICMgU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NDYxNzAvZXNjYXBlLXN0cmluZy1mb3ItdXNlLWluLWphdmFzY3JpcHQtcmVnZXhcbiAgICAgIGZ1enppZmllZEZpbHRlciArPSBcIiN7ZXNjYXBlZENoYXJhY3Rlcn0uKj9cIlxuICAgICAgaSsrXG4gICAgICBcbiAgICBmdXp6aWZpZWRGaWx0ZXJcbiAgICBcbiQoZG9jdW1lbnQpLnJlYWR5IC0+XG4gICQoJ1tkYXRhLWFkZy1hdXRvY29tcGxldGVdJykuZWFjaCAtPlxuICAgIG5ldyBBZGcuQXV0b2NvbXBsZXRlIEAiXX0=
//# sourceURL=coffeescript