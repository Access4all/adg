(function() {
  // Tested in JAWS+IE/FF, NVDA+FF

  // Known issues:
  // - JAWS leaves the input when using up/down without entering something (I guess this is due to screen layout and can be considered intended)
  // - Alert not perceivable upon opening options using up/down
  //     - Possible solution 1: always show options count when filter focused?
  //     - Possible solution 2: wait a moment before adding the alert?
  // - VoiceOver/iOS announces radio buttons as disabled?!
  // - iOS doesn't select all text when option was chosen

  // In general: alerts seem to be most robust in all relevant browsers, but aren't polite. Maybe we'll find a better mechanism to serve browsers individually?
  var AdgAutocomplete;

  AdgAutocomplete = (function() {
    var config, uniqueIdCount;

    class AdgAutocomplete {
      constructor(el, options = {}) {
        var jsonOptions, key, val;
        this.$el = $(el);
        this.config = config;
        for (key in options) {
          val = options[key];
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
        this.attachEvents();
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
        return "adg-autosuggest";
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

    uniqueIdCount = 1;

    config = {
      debugMessage: false,
      hiddenCssClass: 'adg-visually-hidden',
      optionsContainer: 'fieldset',
      optionsContainerLabel: 'legend',
      alertsContainerId: 'alerts',
      numberInTotalText: '[number] options in total',
      numberFilteredText: '[number] of [total] options for [filter]'
    };

    return AdgAutocomplete;

  }).call(this);

  $(document).ready(function() {
    return $('[data-adg-autosuggest]').each(function() {
      return new AdgAutocomplete(this);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTs7Ozs7Ozs7Ozs7QUFBQSxNQUFBOztFQVdNOzs7SUFBTixNQUFBLGdCQUFBO01BYUUsV0FBYSxDQUFDLEVBQUQsRUFBSyxVQUFVLENBQUEsQ0FBZixDQUFBO0FBQ1gsWUFBQSxXQUFBLEVBQUEsR0FBQSxFQUFBO1FBQUEsSUFBQyxDQUFBLEdBQUQsR0FBTyxDQUFBLENBQUUsRUFBRjtRQUVQLElBQUMsQ0FBQSxNQUFELEdBQVU7UUFDVixLQUFBLGNBQUE7O1VBQ0UsSUFBQyxDQUFBLE1BQU8sQ0FBQSxHQUFBLENBQVIsR0FBZTtRQURqQjtRQUdBLFdBQUEsR0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxJQUFDLENBQUEsb0JBQUQsQ0FBQSxDQUFWO1FBQ2QsSUFBRyxXQUFIO1VBQ0UsS0FBQSxrQkFBQTs7WUFDRSxJQUFDLENBQUEsTUFBTyxDQUFBLEdBQUEsQ0FBUixHQUFlO1VBRGpCLENBREY7O1FBSUEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxPQUFkO1FBRUEsSUFBQyxDQUFBLFVBQUQsQ0FBQTtRQUNBLElBQUMsQ0FBQSxXQUFELENBQUE7UUFDQSxJQUFDLENBQUEsVUFBRCxDQUFBO1FBRUEsSUFBQyxDQUFBLDBCQUFELENBQUE7UUFDQSxJQUFDLENBQUEscUJBQUQsQ0FBdUIsRUFBdkI7UUFFQSxJQUFDLENBQUEsWUFBRCxDQUFBO01BckJXLENBWmI7Ozs7TUFvQ0EsWUFBYyxDQUFDLE9BQUQsQ0FBQTtRQUNaLElBQXVDLElBQUMsQ0FBQSxNQUFNLENBQUMsWUFBL0M7aUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLFdBQUEsQ0FBQSxDQUFjLE9BQWQsQ0FBQSxDQUFaLEVBQUE7O01BRFksQ0FwQ2Q7OztNQXdDQSxPQUFTLENBQUMsUUFBRCxDQUFBO0FBQ1AsWUFBQTtRQUFBLE1BQUEsR0FBUyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxRQUFWO0FBQ1QsZ0JBQU8sTUFBTSxDQUFDLE1BQWQ7QUFBQSxlQUNPLENBRFA7bUJBQ2MsSUFBQyxDQUFBLG9DQUFELENBQXNDLENBQUEsb0JBQUEsQ0FBQSxDQUF1QixRQUF2QixDQUFnQyxDQUFoQyxDQUF0QyxFQUEwRTtjQUFBLE1BQUEsRUFBUTtZQUFSLENBQTFFO0FBRGQsZUFFTyxDQUZQO21CQUVjLENBQUEsQ0FBRSxNQUFNLENBQUMsS0FBUCxDQUFBLENBQUY7QUFGZDttQkFHTyxJQUFDLENBQUEsb0NBQUQsQ0FBc0MsQ0FBQSwrQkFBQSxDQUFBLENBQWtDLFFBQWxDLENBQTJDLENBQTNDLENBQXRDLEVBQXFGO2NBQUEsTUFBQSxFQUFRO1lBQVIsQ0FBckY7QUFIUDtNQUZPOztNQU9ULElBQU0sQ0FBQSxDQUFBO2VBQ0o7TUFESTs7TUFHTixtQkFBcUIsQ0FBQyxPQUFELEVBQVUsSUFBVixFQUFnQixRQUFRLEVBQXhCLENBQUE7ZUFDbkIsT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBdEIsQ0FBYixFQUEwQyxLQUExQztNQURtQjs7TUFHckIsc0JBQXdCLENBQUMsT0FBRCxFQUFVLElBQVYsQ0FBQTtlQUN0QixPQUFPLENBQUMsVUFBUixDQUFtQixJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBdEIsQ0FBbkI7TUFEc0I7O01BR3hCLG9CQUFzQixDQUFDLE9BQU8sSUFBUixDQUFBO0FBQ3BCLFlBQUE7UUFBQSxNQUFBLEdBQVMsQ0FBQSxLQUFBLENBQUEsQ0FBUSxJQUFDLENBQUEsSUFBRCxDQUFBLENBQVIsQ0FBQTtRQUNULElBQXdCLElBQXhCO1VBQUEsTUFBQSxJQUFVLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBSixDQUFBLEVBQVY7O2VBQ0E7TUFIb0I7O01BS3RCLFFBQVUsQ0FBQyxJQUFELENBQUE7ZUFDUixDQUFDLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FBRCxFQUFVLElBQVYsRUFBZ0IsYUFBQSxFQUFoQixDQUFnQyxDQUFDLElBQWpDLENBQXNDLEdBQXRDO01BRFE7O01BR1YsWUFBYyxDQUFDLE9BQUQsQ0FBQTtlQUNaLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBQyxDQUFELEVBQUksS0FBSixDQUFBLEdBQUE7QUFDVixjQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUE7VUFBQSxNQUFBLEdBQVMsQ0FBQSxDQUFFLEtBQUY7VUFFVCxFQUFBLEdBQUssTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFaO1VBQ0wsTUFBQSxHQUFTLElBQUMsQ0FBQSxPQUFELENBQVMsQ0FBQSxXQUFBLENBQUEsQ0FBYyxFQUFkLENBQWlCLEVBQWpCLENBQVQsQ0FBK0IsQ0FBQSxDQUFBO1VBRXhDLElBQUcsTUFBTSxDQUFDLE1BQVAsS0FBaUIsQ0FBcEI7WUFDRSxNQUFBLEdBQVMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxPQUFmO1lBQ1QsSUFBa0csTUFBTSxDQUFDLE1BQVAsS0FBaUIsQ0FBbkg7Y0FBQSxJQUFDLENBQUEsb0NBQUQsQ0FBc0MseUNBQXRDLEVBQWlGO2dCQUFBLEtBQUEsRUFBTztjQUFQLENBQWpGLEVBQUE7YUFGRjs7aUJBSUE7UUFWVSxDQUFaO01BRFk7O01BYWQsSUFBTSxDQUFDLEdBQUQsQ0FBQTtRQUNKLEdBQUcsQ0FBQyxVQUFKLENBQWUsUUFBZjtlQUNBLEdBQUcsQ0FBQyxJQUFKLENBQUE7TUFGSSxDQTdFTjs7OztNQW9GQSxJQUFNLENBQUMsR0FBRCxDQUFBO1FBQ0osR0FBRyxDQUFDLElBQUosQ0FBUyxRQUFULEVBQW1CLEVBQW5CO2VBQ0EsR0FBRyxDQUFDLElBQUosQ0FBQTtNQUZJOztNQUlOLG9DQUFzQyxDQUFDLE9BQUQsRUFBVSxXQUFXLENBQUEsQ0FBckIsQ0FBQTtRQUNwQyxPQUFPLENBQUMsR0FBUixDQUFZLFFBQVo7UUFDQSxNQUFNO01BRjhCOztNQUl0QyxJQUFNLENBQUMsSUFBRCxFQUFPLFVBQVUsQ0FBQSxDQUFqQixDQUFBO0FBQ0osWUFBQSxHQUFBLEVBQUE7UUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLE1BQU8sQ0FBQSxDQUFBLENBQUEsQ0FBRyxJQUFILENBQVEsSUFBUixDQUFBO1FBRWYsS0FBQSxjQUFBOztVQUNFLElBQUEsR0FBTyxJQUFJLENBQUMsT0FBTCxDQUFhLENBQUEsQ0FBQSxDQUFBLENBQUksR0FBSixDQUFRLENBQVIsQ0FBYixFQUF5QixLQUF6QjtRQURUO2VBR0E7TUFOSTs7TUFRTixVQUFZLENBQUEsQ0FBQTtRQUNWLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLE9BQUQsQ0FBUyxvQkFBVDtRQUNYLElBQUMsQ0FBQSxtQkFBRCxDQUFxQixJQUFDLENBQUEsT0FBdEIsRUFBK0IsUUFBL0I7UUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxjQUFkLEVBQThCLEtBQTlCO2VBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsZUFBZCxFQUErQixPQUEvQjtNQUpVOztNQU1aLFdBQWEsQ0FBQSxDQUFBO1FBQ1gsSUFBQyxDQUFBLGlCQUFELEdBQXFCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxnQkFBakI7UUFDckIsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUMsQ0FBQSxpQkFBdEIsRUFBeUMsU0FBekM7UUFFQSxJQUFDLENBQUEsc0JBQUQsR0FBMEIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDLHFCQUFqQjtRQUMxQixJQUFDLENBQUEsc0JBQXNCLENBQUMsUUFBeEIsQ0FBaUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxjQUF6QztRQUVBLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBQyxDQUFBLGlCQUFpQixDQUFDLElBQW5CLENBQXdCLHFCQUF4QjtRQUNaLElBQUMsQ0FBQSxtQkFBRCxDQUFxQixJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxRQUFmLENBQXJCLEVBQStDLFFBQS9DO2VBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQW1CLElBQUMsQ0FBQSxNQUFNLENBQUMsY0FBM0I7TUFUVzs7TUFXYixVQUFZLENBQUEsQ0FBQTtRQUNWLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixDQUFBLENBQUUsQ0FBQSxTQUFBLENBQUEsQ0FBWSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxNQUFNLENBQUMsaUJBQWxCLENBQVosQ0FBaUQsUUFBakQsQ0FBRjtRQUNwQixJQUFDLENBQUEsc0JBQXNCLENBQUMsS0FBeEIsQ0FBOEIsSUFBQyxDQUFBLGdCQUEvQjtRQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLGtCQUFkLEVBQWtDLENBQUMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsa0JBQWQsQ0FBRCxFQUFvQyxJQUFDLENBQUEsZ0JBQWdCLENBQUMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBcEMsQ0FBaUUsQ0FBQyxJQUFsRSxDQUF1RSxHQUF2RSxDQUEyRSxDQUFDLElBQTVFLENBQUEsQ0FBbEM7ZUFDQSxJQUFDLENBQUEsbUJBQUQsQ0FBcUIsSUFBQyxDQUFBLGdCQUF0QixFQUF3QyxRQUF4QztNQUpVOztNQU1aLFlBQWMsQ0FBQSxDQUFBO1FBQ1osSUFBQyxDQUFBLHdCQUFELENBQUE7UUFDQSxJQUFDLENBQUEseUJBQUQsQ0FBQTtRQUVBLElBQUMsQ0FBQSx1QkFBRCxDQUFBO1FBQ0EsSUFBQyxDQUFBLHNCQUFELENBQUE7UUFDQSxJQUFDLENBQUEsb0JBQUQsQ0FBQTtRQUNBLElBQUMsQ0FBQSx3QkFBRCxDQUFBO1FBRUEsSUFBQyxDQUFBLDBCQUFELENBQUE7ZUFDQSxJQUFDLENBQUEseUJBQUQsQ0FBQTtNQVZZOztNQVlkLHdCQUEwQixDQUFBLENBQUE7ZUFDeEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULENBQWUsQ0FBQSxDQUFBLEdBQUE7VUFDYixJQUFDLENBQUEsWUFBRCxDQUFjLGNBQWQ7VUFDQSxJQUFHLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxFQUFuQixDQUFzQixVQUF0QixDQUFIO21CQUNFLElBQUMsQ0FBQSxXQUFELENBQUEsRUFERjtXQUFBLE1BQUE7bUJBR0UsSUFBQyxDQUFBLFdBQUQsQ0FBQSxFQUhGOztRQUZhLENBQWY7TUFEd0I7O01BUTFCLHVCQUF5QixDQUFBLENBQUE7ZUFDdkIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULENBQWlCLENBQUMsQ0FBRCxDQUFBLEdBQUE7VUFDZixJQUFHLENBQUMsQ0FBQyxLQUFGLEtBQVcsRUFBZDtZQUNFLElBQUcsSUFBQyxDQUFBLGlCQUFpQixDQUFDLEVBQW5CLENBQXNCLFVBQXRCLENBQUg7Y0FDRSxJQUFDLENBQUEseUNBQUQsQ0FBQTtxQkFDQSxDQUFDLENBQUMsY0FBRixDQUFBLEVBRkY7YUFBQSxNQUdLLElBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxFQUFWLENBQWEsVUFBYixDQUFIO2NBQ0gsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsU0FBZixFQUEwQixLQUExQjtjQUNBLElBQUMsQ0FBQSx5Q0FBRCxDQUFBO3FCQUNBLENBQUMsQ0FBQyxjQUFGLENBQUEsRUFIRzthQUFBLE1BQUE7cUJBS0gsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIsdUJBQWpCLEVBTEc7YUFKUDs7UUFEZSxDQUFqQjtNQUR1Qjs7TUFhekIsc0JBQXdCLENBQUEsQ0FBQTtlQUN0QixJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsQ0FBaUIsQ0FBQyxDQUFELENBQUEsR0FBQTtVQUNmLElBQUcsQ0FBQyxDQUFDLEtBQUYsS0FBVyxFQUFkO1lBQ0UsSUFBQyxDQUFBLFlBQUQsQ0FBYyxPQUFkO1lBQ0EsSUFBRyxJQUFDLENBQUEsaUJBQWlCLENBQUMsRUFBbkIsQ0FBc0IsVUFBdEIsQ0FBSDtjQUNFLElBQUMsQ0FBQSx5Q0FBRCxDQUFBO3FCQUNBLENBQUMsQ0FBQyxjQUFGLENBQUEsRUFGRjthQUFBLE1BQUE7cUJBSUUsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIseUJBQWpCLEVBSkY7YUFGRjs7UUFEZSxDQUFqQjtNQURzQjs7TUFVeEIsb0JBQXNCLENBQUEsQ0FBQTtlQUNwQixJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsQ0FBaUIsQ0FBQyxDQUFELENBQUEsR0FBQTtVQUNmLElBQUcsQ0FBQyxDQUFDLEtBQUYsS0FBVyxDQUFkO1lBQ0UsSUFBQyxDQUFBLFlBQUQsQ0FBYyxLQUFkO1lBQ0EsSUFBRyxJQUFDLENBQUEsaUJBQWlCLENBQUMsRUFBbkIsQ0FBc0IsVUFBdEIsQ0FBSDtxQkFDRSxJQUFDLENBQUEseUNBQUQsQ0FBQSxFQURGO2FBRkY7O1FBRGUsQ0FBakI7TUFEb0I7O01BT3RCLHdCQUEwQixDQUFBLENBQUE7ZUFDeEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULENBQWlCLENBQUMsQ0FBRCxDQUFBLEdBQUE7VUFDZixJQUFHLENBQUMsQ0FBQyxLQUFGLEtBQVcsRUFBWCxJQUFpQixDQUFDLENBQUMsS0FBRixLQUFXLEVBQS9CO1lBQ0UsSUFBRyxJQUFDLENBQUEsaUJBQWlCLENBQUMsRUFBbkIsQ0FBc0IsVUFBdEIsQ0FBSDtjQUNFLElBQUcsQ0FBQyxDQUFDLEtBQUYsS0FBVyxFQUFkO2dCQUNFLElBQUMsQ0FBQSxhQUFELENBQWUsSUFBZixFQURGO2VBQUEsTUFBQTtnQkFHRSxJQUFDLENBQUEsYUFBRCxDQUFlLE1BQWYsRUFIRjtlQURGO2FBQUEsTUFBQTtjQU1FLElBQUMsQ0FBQSxXQUFELENBQUEsRUFORjs7bUJBUUEsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxFQVRGOztRQURlLENBQWpCO01BRHdCOztNQWExQixXQUFhLENBQUEsQ0FBQTtRQUNYLElBQUMsQ0FBQSxZQUFELENBQWMsZ0JBQWQ7UUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLElBQUMsQ0FBQSxpQkFBUDtlQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLGVBQWQsRUFBK0IsTUFBL0I7TUFIVzs7TUFLYixXQUFhLENBQUEsQ0FBQTtRQUNYLElBQUMsQ0FBQSxZQUFELENBQWMsZ0JBQWQ7UUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLElBQUMsQ0FBQSxpQkFBUDtlQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLGVBQWQsRUFBK0IsT0FBL0I7TUFIVzs7TUFLYixhQUFlLENBQUMsU0FBRCxDQUFBO0FBQ2IsWUFBQSxlQUFBLEVBQUEsZUFBQSxFQUFBLFlBQUEsRUFBQSxRQUFBLEVBQUE7UUFBQSxlQUFBLEdBQWtCLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixDQUFpQixVQUFqQjtRQUVsQixRQUFBLEdBQVcsZUFBZSxDQUFDLE1BQWhCLEdBQXlCO1FBQ3BDLFlBQUEsR0FBZSxlQUFlLENBQUMsS0FBaEIsQ0FBc0IsZUFBZSxDQUFDLE1BQWhCLENBQUEsQ0FBd0IsQ0FBQyxJQUF6QixDQUE4QixVQUE5QixDQUF0QixFQUhmO1FBS0EsYUFBQSxHQUFtQixTQUFBLEtBQWEsSUFBaEIsR0FDSyxZQUFBLElBQWdCLENBQW5CLEdBQ0UsUUFERixHQUdFLFlBQUEsR0FBZSxDQUpuQixHQU1LLFlBQUEsS0FBZ0IsUUFBbkIsR0FDRSxDQURGLEdBR0UsWUFBQSxHQUFlO1FBRW5DLGVBQUEsR0FBa0IsQ0FBQSxDQUFFLGVBQWdCLENBQUEsYUFBQSxDQUFsQjtlQUNsQixlQUFlLENBQUMsSUFBaEIsQ0FBcUIsU0FBckIsRUFBZ0MsSUFBaEMsQ0FBcUMsQ0FBQyxPQUF0QyxDQUE4QyxRQUE5QztNQWxCYTs7TUFvQmYsMEJBQTRCLENBQUEsQ0FBQTtlQUMxQixJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsQ0FBaUIsQ0FBQyxDQUFELENBQUEsR0FBQTtVQUNmLElBQUMsQ0FBQSxZQUFELENBQWMsZUFBZDtVQUNBLElBQUMsQ0FBQSwwQkFBRCxDQUFBO2lCQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxDQUFBLENBQWdCLENBQUMsTUFBakIsQ0FBQTtRQUhlLENBQWpCO01BRDBCOztNQU01Qix5Q0FBMkMsQ0FBQSxDQUFBO1FBQ3pDLElBQUMsQ0FBQSwwQkFBRCxDQUFBO1FBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBQTtlQUNBLElBQUMsQ0FBQSxhQUFELENBQUE7TUFIeUM7O01BSzNDLDBCQUE0QixDQUFBLENBQUE7QUFDMUIsWUFBQSxjQUFBLEVBQUEsbUJBQUEsRUFBQTtRQUFBLElBQUMsQ0FBQSxZQUFELENBQWMsMEJBQWQ7UUFFQSw2QkFBQSxHQUFnQyxDQUFBLENBQUUsQ0FBQSxDQUFBLENBQUEsQ0FBSSxJQUFDLENBQUEsb0JBQUQsQ0FBc0IsaUJBQXRCLENBQUosQ0FBNkMsQ0FBN0MsQ0FBRjtRQUNoQyxJQUFHLDZCQUE2QixDQUFDLE1BQTlCLEtBQXdDLENBQTNDO1VBQ0UsSUFBQyxDQUFBLHNCQUFELENBQXdCLDZCQUF4QixFQUF1RCxpQkFBdkQsRUFERjs7UUFHQSxjQUFBLEdBQWlCLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixDQUFpQixVQUFqQjtRQUNqQixJQUFHLGNBQWMsQ0FBQyxNQUFmLEtBQXlCLENBQTVCO1VBQ0UsbUJBQUEsR0FBc0IsSUFBQyxDQUFBLFlBQUQsQ0FBYyxjQUFkO1VBQ3RCLElBQUMsQ0FBQSxPQUFPLENBQUMsR0FBVCxDQUFhLENBQUMsQ0FBQyxJQUFGLENBQU8sbUJBQW1CLENBQUMsSUFBcEIsQ0FBQSxDQUFQLENBQWI7aUJBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLG1CQUFyQixFQUEwQyxpQkFBMUMsRUFIRjtTQUFBLE1BQUE7aUJBS0UsSUFBQyxDQUFBLE9BQU8sQ0FBQyxHQUFULENBQWEsRUFBYixFQUxGOztNQVIwQjs7TUFlNUIseUJBQTJCLENBQUEsQ0FBQTtlQUN6QixJQUFDLENBQUEsUUFBUSxDQUFDLEtBQVYsQ0FBZ0IsQ0FBQyxDQUFELENBQUEsR0FBQTtVQUNkLElBQUMsQ0FBQSxZQUFELENBQWMsY0FBZDtpQkFDQSxJQUFDLENBQUEsV0FBRCxDQUFBO1FBRmMsQ0FBaEI7TUFEeUI7O01BSzNCLHlCQUEyQixDQUFBLENBQUE7ZUFDekIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksNEJBQVosRUFBMEMsQ0FBQyxDQUFELENBQUEsR0FBQTtVQUN4QyxJQUFDLENBQUEsWUFBRCxDQUFjLGtCQUFkO1VBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQXhCO2lCQUNBLElBQUMsQ0FBQSxXQUFELENBQUE7UUFId0MsQ0FBMUM7TUFEeUI7O01BTTNCLGFBQWUsQ0FBQyxTQUFTLEVBQVYsQ0FBQTtBQUNiLFlBQUEsV0FBQSxFQUFBO1FBQUEsV0FBQSxHQUFjLElBQUMsQ0FBQSxhQUFELENBQWUsTUFBZjtRQUNkLGFBQUEsR0FBZ0I7UUFFaEIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsQ0FBQyxDQUFELEVBQUksRUFBSixDQUFBLEdBQUE7QUFDYixjQUFBLE9BQUEsRUFBQSxnQkFBQSxFQUFBO1VBQUEsT0FBQSxHQUFVLENBQUEsQ0FBRSxFQUFGO1VBQ1YsZ0JBQUEsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBQTtVQUVuQixLQUFBLEdBQVEsSUFBSSxNQUFKLENBQVcsV0FBWCxFQUF3QixHQUF4QjtVQUNSLElBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxnQkFBZ0IsQ0FBQyxJQUFqQixDQUFBLENBQVgsQ0FBSDtZQUNFLGFBQUE7bUJBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxnQkFBTixFQUZGO1dBQUEsTUFBQTttQkFJRSxJQUFDLENBQUEsSUFBRCxDQUFNLGdCQUFOLEVBSkY7O1FBTGEsQ0FBZjtlQVdBLElBQUMsQ0FBQSxxQkFBRCxDQUF1QixNQUF2QixFQUErQixhQUEvQjtNQWZhOztNQWlCZixxQkFBdUIsQ0FBQyxTQUFTLElBQUMsQ0FBQSxPQUFPLENBQUMsR0FBVCxDQUFBLENBQVYsRUFBMEIsU0FBUyxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQTdDLENBQUE7QUFDckIsWUFBQTtRQUFBLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxJQUFsQixDQUF1QixHQUF2QixDQUEyQixDQUFDLE1BQTVCLENBQUEsRUFBQTtRQUVBLE9BQUEsR0FBYSxNQUFBLEtBQVUsRUFBYixHQUNFLElBQUMsQ0FBQSxJQUFELENBQU0sZUFBTixFQUF1QjtVQUFBLE1BQUEsRUFBUTtRQUFSLENBQXZCLENBREYsR0FHRSxJQUFDLENBQUEsSUFBRCxDQUFNLGdCQUFOLEVBQXdCO1VBQUEsTUFBQSxFQUFRLE1BQVI7VUFBZ0IsS0FBQSxFQUFPLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBakM7VUFBeUMsTUFBQSxFQUFRLENBQUEsS0FBQSxDQUFBLENBQVEsTUFBUixDQUFlLE1BQWY7UUFBakQsQ0FBeEI7ZUFFWixJQUFDLENBQUEsZ0JBQWdCLENBQUMsTUFBbEIsQ0FBeUIsQ0FBQSxnQkFBQSxDQUFBLENBQW1CLE9BQW5CLENBQTJCLElBQTNCLENBQXpCO01BUnFCOztNQVV2QixhQUFlLENBQUMsTUFBRCxDQUFBO0FBQ2IsWUFBQSxnQkFBQSxFQUFBLGVBQUEsRUFBQTtRQUFBLENBQUEsR0FBSTtRQUNKLGVBQUEsR0FBa0I7QUFDbEIsZUFBTSxDQUFBLEdBQUksTUFBTSxDQUFDLE1BQWpCO1VBQ0UsZ0JBQUEsR0FBbUIsTUFBTSxDQUFDLE1BQVAsQ0FBYyxDQUFkLENBQWdCLENBQUMsT0FBakIsQ0FBeUIscUNBQXpCLEVBQWdFLE1BQWhFLEVBQW5CO1VBQ0EsZUFBQSxJQUFtQixDQUFBLENBQUEsQ0FBRyxnQkFBSCxDQUFvQixHQUFwQjtVQUNuQixDQUFBO1FBSEY7ZUFLQTtNQVJhOztJQXpSakI7O0lBQ0UsYUFBQSxHQUFnQjs7SUFFaEIsTUFBQSxHQUNFO01BQUEsWUFBQSxFQUFnQixLQUFoQjtNQUNBLGNBQUEsRUFBZ0IscUJBRGhCO01BR0EsZ0JBQUEsRUFBdUIsVUFIdkI7TUFJQSxxQkFBQSxFQUF1QixRQUp2QjtNQUtBLGlCQUFBLEVBQXVCLFFBTHZCO01BTUEsaUJBQUEsRUFBdUIsMkJBTnZCO01BT0Esa0JBQUEsRUFBdUI7SUFQdkI7Ozs7OztFQStSSixDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtXQUNoQixDQUFBLENBQUUsd0JBQUYsQ0FBMkIsQ0FBQyxJQUE1QixDQUFpQyxRQUFBLENBQUEsQ0FBQTthQUMvQixJQUFJLGVBQUosQ0FBb0IsSUFBcEI7SUFEK0IsQ0FBakM7RUFEZ0IsQ0FBbEI7QUE5U0EiLCJzb3VyY2VzQ29udGVudCI6WyIjIFRlc3RlZCBpbiBKQVdTK0lFL0ZGLCBOVkRBK0ZGXG4jXG4jIEtub3duIGlzc3VlczpcbiMgLSBKQVdTIGxlYXZlcyB0aGUgaW5wdXQgd2hlbiB1c2luZyB1cC9kb3duIHdpdGhvdXQgZW50ZXJpbmcgc29tZXRoaW5nIChJIGd1ZXNzIHRoaXMgaXMgZHVlIHRvIHNjcmVlbiBsYXlvdXQgYW5kIGNhbiBiZSBjb25zaWRlcmVkIGludGVuZGVkKVxuIyAtIEFsZXJ0IG5vdCBwZXJjZWl2YWJsZSB1cG9uIG9wZW5pbmcgb3B0aW9ucyB1c2luZyB1cC9kb3duXG4jICAgICAtIFBvc3NpYmxlIHNvbHV0aW9uIDE6IGFsd2F5cyBzaG93IG9wdGlvbnMgY291bnQgd2hlbiBmaWx0ZXIgZm9jdXNlZD9cbiMgICAgIC0gUG9zc2libGUgc29sdXRpb24gMjogd2FpdCBhIG1vbWVudCBiZWZvcmUgYWRkaW5nIHRoZSBhbGVydD9cbiMgLSBWb2ljZU92ZXIvaU9TIGFubm91bmNlcyByYWRpbyBidXR0b25zIGFzIGRpc2FibGVkPyFcbiMgLSBpT1MgZG9lc24ndCBzZWxlY3QgYWxsIHRleHQgd2hlbiBvcHRpb24gd2FzIGNob3NlblxuI1xuIyBJbiBnZW5lcmFsOiBhbGVydHMgc2VlbSB0byBiZSBtb3N0IHJvYnVzdCBpbiBhbGwgcmVsZXZhbnQgYnJvd3NlcnMsIGJ1dCBhcmVuJ3QgcG9saXRlLiBNYXliZSB3ZSdsbCBmaW5kIGEgYmV0dGVyIG1lY2hhbmlzbSB0byBzZXJ2ZSBicm93c2VycyBpbmRpdmlkdWFsbHk/XG5jbGFzcyBBZGdBdXRvY29tcGxldGVcbiAgdW5pcXVlSWRDb3VudCA9IDFcbiAgXG4gIGNvbmZpZyA9XG4gICAgZGVidWdNZXNzYWdlOiAgIGZhbHNlXG4gICAgaGlkZGVuQ3NzQ2xhc3M6ICdhZGctdmlzdWFsbHktaGlkZGVuJ1xuICAgIFxuICAgIG9wdGlvbnNDb250YWluZXI6ICAgICAgJ2ZpZWxkc2V0J1xuICAgIG9wdGlvbnNDb250YWluZXJMYWJlbDogJ2xlZ2VuZCdcbiAgICBhbGVydHNDb250YWluZXJJZDogICAgICdhbGVydHMnXG4gICAgbnVtYmVySW5Ub3RhbFRleHQ6ICAgICAnW251bWJlcl0gb3B0aW9ucyBpbiB0b3RhbCdcbiAgICBudW1iZXJGaWx0ZXJlZFRleHQ6ICAgICdbbnVtYmVyXSBvZiBbdG90YWxdIG9wdGlvbnMgZm9yIFtmaWx0ZXJdJ1xuICAgIFxuICBjb25zdHJ1Y3RvcjogKGVsLCBvcHRpb25zID0ge30pIC0+XG4gICAgQCRlbCA9ICQoZWwpXG5cbiAgICBAY29uZmlnID0gY29uZmlnXG4gICAgZm9yIGtleSwgdmFsIG9mIG9wdGlvbnNcbiAgICAgIEBjb25maWdba2V5XSA9IHZhbFxuICAgICAgXG4gICAganNvbk9wdGlvbnMgPSBAJGVsLmF0dHIoQGFkZ0RhdGFBdHRyaWJ1dGVOYW1lKCkpXG4gICAgaWYganNvbk9wdGlvbnNcbiAgICAgIGZvciBrZXksIHZhbCBvZiBqc29uT3B0aW9uc1xuICAgICAgICBAY29uZmlnW2tleV0gPSB2YWxcbiAgICBcbiAgICBAZGVidWdNZXNzYWdlICdzdGFydCdcblxuICAgIEBpbml0RmlsdGVyKClcbiAgICBAaW5pdE9wdGlvbnMoKVxuICAgIEBpbml0QWxlcnRzKClcbiAgICBcbiAgICBAYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXIoKVxuICAgIEBhbm5vdW5jZU9wdGlvbnNOdW1iZXIoJycpXG5cbiAgICBAYXR0YWNoRXZlbnRzKClcbiAgICBcbiAgIyBQcmludHMgdGhlIGdpdmVuIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgaWYgY29uZmlnWydkZWJ1ZyddIGlzIHRydWUuXG4gIGRlYnVnTWVzc2FnZTogKG1lc3NhZ2UpIC0+XG4gICAgY29uc29sZS5sb2cgXCJBZGcgZGVidWc6ICN7bWVzc2FnZX1cIiBpZiBAY29uZmlnLmRlYnVnTWVzc2FnZVxuXG4gICMgRXhlY3V0ZXMgdGhlIGdpdmVuIHNlbGVjdG9yIG9uIEAkZWwgYW5kIHJldHVybnMgdGhlIGVsZW1lbnQuIE1ha2VzIHN1cmUgZXhhY3RseSBvbmUgZWxlbWVudCBleGlzdHMuXG4gIGZpbmRPbmU6IChzZWxlY3RvcikgLT5cbiAgICByZXN1bHQgPSBAJGVsLmZpbmQoc2VsZWN0b3IpXG4gICAgc3dpdGNoIHJlc3VsdC5sZW5ndGhcbiAgICAgIHdoZW4gMCB0aGVuIEB0aHJvd01lc3NhZ2VBbmRQcmludE9iamVjdHNUb0NvbnNvbGUgXCJObyBvYmplY3QgZm91bmQgZm9yICN7c2VsZWN0b3J9IVwiLCByZXN1bHQ6IHJlc3VsdFxuICAgICAgd2hlbiAxIHRoZW4gJChyZXN1bHQuZmlyc3QoKSlcbiAgICAgIGVsc2UgQHRocm93TWVzc2FnZUFuZFByaW50T2JqZWN0c1RvQ29uc29sZSBcIk1vcmUgdGhhbiBvbmUgb2JqZWN0IGZvdW5kIGZvciAje3NlbGVjdG9yfSFcIiwgcmVzdWx0OiByZXN1bHRcbiAgICAgICAgXG4gIG5hbWU6IC0+XG4gICAgXCJhZGctYXV0b3N1Z2dlc3RcIlxuICAgICAgICBcbiAgYWRkQWRnRGF0YUF0dHJpYnV0ZTogKCR0YXJnZXQsIG5hbWUsIHZhbHVlID0gJycpIC0+XG4gICAgJHRhcmdldC5hdHRyKEBhZGdEYXRhQXR0cmlidXRlTmFtZShuYW1lKSwgdmFsdWUpXG4gICAgICAgIFxuICByZW1vdmVBZGdEYXRhQXR0cmlidXRlOiAoJHRhcmdldCwgbmFtZSkgLT5cbiAgICAkdGFyZ2V0LnJlbW92ZUF0dHIoQGFkZ0RhdGFBdHRyaWJ1dGVOYW1lKG5hbWUpKVxuICAgIFxuICBhZGdEYXRhQXR0cmlidXRlTmFtZTogKG5hbWUgPSBudWxsKSAtPlxuICAgIHJlc3VsdCA9IFwiZGF0YS0je0BuYW1lKCl9XCJcbiAgICByZXN1bHQgKz0gXCItI3tuYW1lfVwiIGlmIG5hbWVcbiAgICByZXN1bHRcbiAgICBcbiAgdW5pcXVlSWQ6IChuYW1lKSAtPlxuICAgIFtAbmFtZSgpLCBuYW1lLCB1bmlxdWVJZENvdW50KytdLmpvaW4gJy0nXG4gICAgXG4gIGxhYmVsT2ZJbnB1dDogKCRpbnB1dHMpIC0+XG4gICAgJGlucHV0cy5tYXAgKGksIGlucHV0KSA9PlxuICAgICAgJGlucHV0ID0gJChpbnB1dClcbiAgICAgIFxuICAgICAgaWQgPSAkaW5wdXQuYXR0cignaWQnKVxuICAgICAgJGxhYmVsID0gQGZpbmRPbmUoXCJsYWJlbFtmb3I9JyN7aWR9J11cIilbMF1cblxuICAgICAgaWYgJGxhYmVsLmxlbmd0aCA9PSAwXG4gICAgICAgICRsYWJlbCA9ICRpbnB1dC5jbG9zZXN0KCdsYWJlbCcpXG4gICAgICAgIEB0aHJvd01lc3NhZ2VBbmRQcmludE9iamVjdHNUb0NvbnNvbGUgXCJObyBjb3JyZXNwb25kaW5nIGlucHV0IGZvdW5kIGZvciBpbnB1dCFcIiwgaW5wdXQ6ICRpbnB1dCBpZiAkbGFiZWwubGVuZ3RoID09IDBcblxuICAgICAgJGxhYmVsXG5cbiAgc2hvdzogKCRlbCkgLT5cbiAgICAkZWwucmVtb3ZlQXR0cignaGlkZGVuJylcbiAgICAkZWwuc2hvdygpXG5cbiAgICAjIFRPRE8gV291bGQgYmUgY29vbCB0byByZW5vdW5jZSBDU1MgYW5kIHNvbGVseSB1c2UgdGhlIGhpZGRlbiBhdHRyaWJ1dGUuIEJ1dCBqUXVlcnkncyA6dmlzaWJsZSBkb2Vzbid0IHNlZW0gdG8gd29yayB3aXRoIGl0IT9cbiAgICAjIEB0aHJvd01lc3NhZ2VBbmRQcmludE9iamVjdHNUb0NvbnNvbGUoXCJFbGVtZW50IGlzIHN0aWxsIGhpZGRlbiwgYWx0aG91Z2ggaGlkZGVuIGF0dHJpYnV0ZSB3YXMgcmVtb3ZlZCEgTWFrZSBzdXJlIHRoZXJlJ3Mgbm8gQ1NTIGxpa2UgZGlzcGxheTpub25lIG9yIHZpc2liaWxpdHk6aGlkZGVuIGxlZnQgb24gaXQhXCIsIGVsZW1lbnQ6ICRlbCkgaWYgJGVsLmlzKCc6aGlkZGVuJylcblxuICBoaWRlOiAoJGVsKSAtPlxuICAgICRlbC5hdHRyKCdoaWRkZW4nLCAnJylcbiAgICAkZWwuaGlkZSgpXG4gICAgXG4gIHRocm93TWVzc2FnZUFuZFByaW50T2JqZWN0c1RvQ29uc29sZTogKG1lc3NhZ2UsIGVsZW1lbnRzID0ge30pIC0+XG4gICAgY29uc29sZS5sb2cgZWxlbWVudHNcbiAgICB0aHJvdyBtZXNzYWdlXG4gICAgXG4gIHRleHQ6ICh0ZXh0LCBvcHRpb25zID0ge30pIC0+XG4gICAgdGV4dCA9IEBjb25maWdbXCIje3RleHR9VGV4dFwiXVxuICAgIFxuICAgIGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgXCJbI3trZXl9XVwiLCB2YWx1ZVxuICAgICAgXG4gICAgdGV4dFxuICAgIFxuICBpbml0RmlsdGVyOiAtPlxuICAgIEAkZmlsdGVyID0gQGZpbmRPbmUoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcbiAgICBAYWRkQWRnRGF0YUF0dHJpYnV0ZShAJGZpbHRlciwgJ2ZpbHRlcicpXG4gICAgQCRmaWx0ZXIuYXR0cignYXV0b2NvbXBsZXRlJywgJ29mZicpXG4gICAgQCRmaWx0ZXIuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gICAgXG4gIGluaXRPcHRpb25zOiAtPlxuICAgIEAkb3B0aW9uc0NvbnRhaW5lciA9IEBmaW5kT25lKEBjb25maWcub3B0aW9uc0NvbnRhaW5lcilcbiAgICBAYWRkQWRnRGF0YUF0dHJpYnV0ZShAJG9wdGlvbnNDb250YWluZXIsICdvcHRpb25zJylcbiAgICBcbiAgICBAJG9wdGlvbnNDb250YWluZXJMYWJlbCA9IEBmaW5kT25lKEBjb25maWcub3B0aW9uc0NvbnRhaW5lckxhYmVsKVxuICAgIEAkb3B0aW9uc0NvbnRhaW5lckxhYmVsLmFkZENsYXNzKEBjb25maWcuaGlkZGVuQ3NzQ2xhc3MpXG4gICAgXG4gICAgQCRvcHRpb25zID0gQCRvcHRpb25zQ29udGFpbmVyLmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpXG4gICAgQGFkZEFkZ0RhdGFBdHRyaWJ1dGUoQGxhYmVsT2ZJbnB1dChAJG9wdGlvbnMpLCAnb3B0aW9uJylcbiAgICBAJG9wdGlvbnMuYWRkQ2xhc3MoQGNvbmZpZy5oaWRkZW5Dc3NDbGFzcylcbiAgICBcbiAgaW5pdEFsZXJ0czogLT5cbiAgICBAJGFsZXJ0c0NvbnRhaW5lciA9ICQoXCI8ZGl2IGlkPScje0B1bmlxdWVJZChAY29uZmlnLmFsZXJ0c0NvbnRhaW5lcklkKX0nPjwvZGl2PlwiKVxuICAgIEAkb3B0aW9uc0NvbnRhaW5lckxhYmVsLmFmdGVyKEAkYWxlcnRzQ29udGFpbmVyKVxuICAgIEAkZmlsdGVyLmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBbQCRmaWx0ZXIuYXR0cignYXJpYS1kZXNjcmliZWRieScpLCBAJGFsZXJ0c0NvbnRhaW5lci5hdHRyKCdpZCcpXS5qb2luKCcgJykudHJpbSgpKVxuICAgIEBhZGRBZGdEYXRhQXR0cmlidXRlKEAkYWxlcnRzQ29udGFpbmVyLCAnYWxlcnRzJylcbiAgXG4gIGF0dGFjaEV2ZW50czogLT5cbiAgICBAYXR0YWNoQ2xpY2tFdmVudFRvRmlsdGVyKClcbiAgICBAYXR0YWNoQ2hhbmdlRXZlbnRUb0ZpbHRlcigpXG4gICAgXG4gICAgQGF0dGFjaEVzY2FwZUtleVRvRmlsdGVyKClcbiAgICBAYXR0YWNoRW50ZXJLZXlUb0ZpbHRlcigpXG4gICAgQGF0dGFjaFRhYktleVRvRmlsdGVyKClcbiAgICBAYXR0YWNoVXBEb3duS2V5c1RvRmlsdGVyKClcbiAgICBcbiAgICBAYXR0YWNoQ2hhbmdlRXZlbnRUb09wdGlvbnMoKVxuICAgIEBhdHRhY2hDbGlja0V2ZW50VG9PcHRpb25zKClcbiAgICBcbiAgYXR0YWNoQ2xpY2tFdmVudFRvRmlsdGVyOiAtPlxuICAgIEAkZmlsdGVyLmNsaWNrID0+XG4gICAgICBAZGVidWdNZXNzYWdlICdjbGljayBmaWx0ZXInXG4gICAgICBpZiBAJG9wdGlvbnNDb250YWluZXIuaXMoJzp2aXNpYmxlJylcbiAgICAgICAgQGhpZGVPcHRpb25zKClcbiAgICAgIGVsc2VcbiAgICAgICAgQHNob3dPcHRpb25zKClcbiAgICAgIFxuICBhdHRhY2hFc2NhcGVLZXlUb0ZpbHRlcjogLT5cbiAgICBAJGZpbHRlci5rZXlkb3duIChlKSA9PlxuICAgICAgaWYgZS53aGljaCA9PSAyN1xuICAgICAgICBpZiBAJG9wdGlvbnNDb250YWluZXIuaXMoJzp2aXNpYmxlJylcbiAgICAgICAgICBAYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXJBbmRSZXNldE9wdGlvbnMoKVxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlbHNlIGlmIEAkb3B0aW9ucy5pcygnOmNoZWNrZWQnKVxuICAgICAgICAgIEAkb3B0aW9ucy5wcm9wKCdjaGVja2VkJywgZmFsc2UpXG4gICAgICAgICAgQGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyQW5kUmVzZXRPcHRpb25zKClcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZWxzZSAjIE5lZWRlZCBmb3IgYXV0b21hdGljIHRlc3Rpbmcgb25seVxuICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxwPkVzYyBwYXNzZWQgb24uPC9wPicpXG4gICAgICBcbiAgYXR0YWNoRW50ZXJLZXlUb0ZpbHRlcjogLT5cbiAgICBAJGZpbHRlci5rZXlkb3duIChlKSA9PlxuICAgICAgaWYgZS53aGljaCA9PSAxM1xuICAgICAgICBAZGVidWdNZXNzYWdlICdlbnRlcidcbiAgICAgICAgaWYgQCRvcHRpb25zQ29udGFpbmVyLmlzKCc6dmlzaWJsZScpXG4gICAgICAgICAgQGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyQW5kUmVzZXRPcHRpb25zKClcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZWxzZSAjIE5lZWRlZCBmb3IgYXV0b21hdGljIHRlc3Rpbmcgb25seVxuICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxwPkVudGVyIHBhc3NlZCBvbi48L3A+JylcbiAgICAgIFxuICBhdHRhY2hUYWJLZXlUb0ZpbHRlcjogLT5cbiAgICBAJGZpbHRlci5rZXlkb3duIChlKSA9PlxuICAgICAgaWYgZS53aGljaCA9PSA5XG4gICAgICAgIEBkZWJ1Z01lc3NhZ2UgJ3RhYidcbiAgICAgICAgaWYgQCRvcHRpb25zQ29udGFpbmVyLmlzKCc6dmlzaWJsZScpXG4gICAgICAgICAgQGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyQW5kUmVzZXRPcHRpb25zKClcbiAgICAgIFxuICBhdHRhY2hVcERvd25LZXlzVG9GaWx0ZXI6IC0+XG4gICAgQCRmaWx0ZXIua2V5ZG93biAoZSkgPT5cbiAgICAgIGlmIGUud2hpY2ggPT0gMzggfHwgZS53aGljaCA9PSA0MFxuICAgICAgICBpZiBAJG9wdGlvbnNDb250YWluZXIuaXMoJzp2aXNpYmxlJylcbiAgICAgICAgICBpZiBlLndoaWNoID09IDM4XG4gICAgICAgICAgICBAbW92ZVNlbGVjdGlvbigndXAnKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBtb3ZlU2VsZWN0aW9uKCdkb3duJylcbiAgICAgICAgZWxzZVxuICAgICAgICAgIEBzaG93T3B0aW9ucygpXG4gICAgICAgXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKSAjIFRPRE86IFRlc3QhXG4gICAgXG4gIHNob3dPcHRpb25zOiAtPlxuICAgIEBkZWJ1Z01lc3NhZ2UgJyhzaG93IG9wdGlvbnMpJ1xuICAgIEBzaG93KEAkb3B0aW9uc0NvbnRhaW5lcilcbiAgICBAJGZpbHRlci5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKVxuICAgIFxuICBoaWRlT3B0aW9uczogLT5cbiAgICBAZGVidWdNZXNzYWdlICcoaGlkZSBvcHRpb25zKSdcbiAgICBAaGlkZShAJG9wdGlvbnNDb250YWluZXIpXG4gICAgQCRmaWx0ZXIuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gICAgXG4gIG1vdmVTZWxlY3Rpb246IChkaXJlY3Rpb24pIC0+XG4gICAgJHZpc2libGVPcHRpb25zID0gQCRvcHRpb25zLmZpbHRlcignOnZpc2libGUnKVxuICAgIFxuICAgIG1heEluZGV4ID0gJHZpc2libGVPcHRpb25zLmxlbmd0aCAtIDFcbiAgICBjdXJyZW50SW5kZXggPSAkdmlzaWJsZU9wdGlvbnMuaW5kZXgoJHZpc2libGVPcHRpb25zLnBhcmVudCgpLmZpbmQoJzpjaGVja2VkJykpICMgVE9ETzogaXMgcGFyZW50KCkgZ29vZCBoZXJlPyFcbiAgICBcbiAgICB1cGNvbWluZ0luZGV4ID0gaWYgZGlyZWN0aW9uID09ICd1cCdcbiAgICAgICAgICAgICAgICAgICAgICBpZiBjdXJyZW50SW5kZXggPD0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggLSAxXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICBpZiBjdXJyZW50SW5kZXggPT0gbWF4SW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggKyAxXG5cbiAgICAkdXBjb21pbmdPcHRpb24gPSAkKCR2aXNpYmxlT3B0aW9uc1t1cGNvbWluZ0luZGV4XSlcbiAgICAkdXBjb21pbmdPcHRpb24ucHJvcCgnY2hlY2tlZCcsIHRydWUpLnRyaWdnZXIoJ2NoYW5nZScpXG4gICAgXG4gIGF0dGFjaENoYW5nZUV2ZW50VG9PcHRpb25zOiAtPlxuICAgIEAkb3B0aW9ucy5jaGFuZ2UgKGUpID0+XG4gICAgICBAZGVidWdNZXNzYWdlICdvcHRpb24gY2hhbmdlJ1xuICAgICAgQGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyKClcbiAgICAgIEAkZmlsdGVyLmZvY3VzKCkuc2VsZWN0KClcblxuICBhcHBseUNoZWNrZWRPcHRpb25Ub0ZpbHRlckFuZFJlc2V0T3B0aW9uczogLT5cbiAgICBAYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXIoKVxuICAgIEBoaWRlT3B0aW9ucygpXG4gICAgQGZpbHRlck9wdGlvbnMoKVxuICAgICAgXG4gIGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyOiAtPlxuICAgIEBkZWJ1Z01lc3NhZ2UgJyhhcHBseSBvcHRpb24gdG8gZmlsdGVyKSdcbiAgICBcbiAgICAkcHJldmlvdXNseUNoZWNrZWRPcHRpb25MYWJlbCA9ICQoXCJbI3tAYWRnRGF0YUF0dHJpYnV0ZU5hbWUoJ29wdGlvbi1zZWxlY3RlZCcpfV1cIilcbiAgICBpZiAkcHJldmlvdXNseUNoZWNrZWRPcHRpb25MYWJlbC5sZW5ndGggPT0gMVxuICAgICAgQHJlbW92ZUFkZ0RhdGFBdHRyaWJ1dGUoJHByZXZpb3VzbHlDaGVja2VkT3B0aW9uTGFiZWwsICdvcHRpb24tc2VsZWN0ZWQnKVxuICAgXG4gICAgJGNoZWNrZWRPcHRpb24gPSBAJG9wdGlvbnMuZmlsdGVyKCc6Y2hlY2tlZCcpXG4gICAgaWYgJGNoZWNrZWRPcHRpb24ubGVuZ3RoID09IDFcbiAgICAgICRjaGVja2VkT3B0aW9uTGFiZWwgPSBAbGFiZWxPZklucHV0KCRjaGVja2VkT3B0aW9uKVxuICAgICAgQCRmaWx0ZXIudmFsKCQudHJpbSgkY2hlY2tlZE9wdGlvbkxhYmVsLnRleHQoKSkpXG4gICAgICBAYWRkQWRnRGF0YUF0dHJpYnV0ZSgkY2hlY2tlZE9wdGlvbkxhYmVsLCAnb3B0aW9uLXNlbGVjdGVkJylcbiAgICBlbHNlXG4gICAgICBAJGZpbHRlci52YWwoJycpXG4gICAgICBcbiAgYXR0YWNoQ2xpY2tFdmVudFRvT3B0aW9uczogLT5cbiAgICBAJG9wdGlvbnMuY2xpY2sgKGUpID0+XG4gICAgICBAZGVidWdNZXNzYWdlICdjbGljayBvcHRpb24nXG4gICAgICBAaGlkZU9wdGlvbnMoKVxuICAgICAgXG4gIGF0dGFjaENoYW5nZUV2ZW50VG9GaWx0ZXI6IC0+XG4gICAgQCRmaWx0ZXIub24gJ2lucHV0IHByb3BlcnR5Y2hhbmdlIHBhc3RlJywgKGUpID0+XG4gICAgICBAZGVidWdNZXNzYWdlICcoZmlsdGVyIGNoYW5nZWQpJ1xuICAgICAgQGZpbHRlck9wdGlvbnMoZS50YXJnZXQudmFsdWUpXG4gICAgICBAc2hvd09wdGlvbnMoKVxuICAgICAgXG4gIGZpbHRlck9wdGlvbnM6IChmaWx0ZXIgPSAnJykgLT5cbiAgICBmdXp6eUZpbHRlciA9IEBmdXp6aWZ5RmlsdGVyKGZpbHRlcilcbiAgICB2aXNpYmxlTnVtYmVyID0gMFxuICAgIFxuICAgIEAkb3B0aW9ucy5lYWNoIChpLCBlbCkgPT5cbiAgICAgICRvcHRpb24gPSAkKGVsKVxuICAgICAgJG9wdGlvbkNvbnRhaW5lciA9ICRvcHRpb24ucGFyZW50KClcblxuICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKGZ1enp5RmlsdGVyLCAnaScpXG4gICAgICBpZiByZWdleC50ZXN0KCRvcHRpb25Db250YWluZXIudGV4dCgpKVxuICAgICAgICB2aXNpYmxlTnVtYmVyKytcbiAgICAgICAgQHNob3coJG9wdGlvbkNvbnRhaW5lcilcbiAgICAgIGVsc2VcbiAgICAgICAgQGhpZGUoJG9wdGlvbkNvbnRhaW5lcilcbiAgICAgICAgXG4gICAgQGFubm91bmNlT3B0aW9uc051bWJlcihmaWx0ZXIsIHZpc2libGVOdW1iZXIpXG4gICAgXG4gIGFubm91bmNlT3B0aW9uc051bWJlcjogKGZpbHRlciA9IEAkZmlsdGVyLnZhbCgpLCBudW1iZXIgPSBAJG9wdGlvbnMubGVuZ3RoKSAtPlxuICAgIEAkYWxlcnRzQ29udGFpbmVyLmZpbmQoJ3AnKS5yZW1vdmUoKSAjIFJlbW92ZSBwcmV2aW91cyBhbGVydHMgKEknbSBub3Qgc3VyZSB3aGV0aGVyIHRoaXMgaXMgdGhlIGJlc3Qgc29sdXRpb24sIG1heWJlIGhpZGluZyB0aGVtIHdvdWxkIGJlIG1vcmUgcm9idXN0PylcbiAgICBcbiAgICBtZXNzYWdlID0gaWYgZmlsdGVyID09ICcnXG4gICAgICAgICAgICAgICAgQHRleHQoJ251bWJlckluVG90YWwnLCBudW1iZXI6IG51bWJlcilcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEB0ZXh0KCdudW1iZXJGaWx0ZXJlZCcsIG51bWJlcjogbnVtYmVyLCB0b3RhbDogQCRvcHRpb25zLmxlbmd0aCwgZmlsdGVyOiBcIjxrYmQ+I3tmaWx0ZXJ9PC9rYmQ+XCIpXG4gICAgICBcbiAgICBAJGFsZXJ0c0NvbnRhaW5lci5hcHBlbmQoXCI8cCByb2xlPSdhbGVydCc+I3ttZXNzYWdlfTwvcD5cIilcbiAgICAgICAgXG4gIGZ1enppZnlGaWx0ZXI6IChmaWx0ZXIpIC0+XG4gICAgaSA9IDBcbiAgICBmdXp6aWZpZWRGaWx0ZXIgPSAnJ1xuICAgIHdoaWxlIGkgPCBmaWx0ZXIubGVuZ3RoXG4gICAgICBlc2NhcGVkQ2hhcmFjdGVyID0gZmlsdGVyLmNoYXJBdChpKS5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIikgIyBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzQ0NjE3MC9lc2NhcGUtc3RyaW5nLWZvci11c2UtaW4tamF2YXNjcmlwdC1yZWdleFxuICAgICAgZnV6emlmaWVkRmlsdGVyICs9IFwiI3tlc2NhcGVkQ2hhcmFjdGVyfS4qP1wiXG4gICAgICBpKytcbiAgICAgIFxuICAgIGZ1enppZmllZEZpbHRlclxuICAgIFxuJChkb2N1bWVudCkucmVhZHkgLT5cbiAgJCgnW2RhdGEtYWRnLWF1dG9zdWdnZXN0XScpLmVhY2ggLT5cbiAgICBuZXcgQWRnQXV0b2NvbXBsZXRlIEAiXX0=
//# sourceURL=coffeescript