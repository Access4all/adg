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
        return "adg-autocomplete";
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
    return $('[data-adg-autocomplete]').each(function() {
      return new AdgAutocomplete(this);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTs7Ozs7Ozs7Ozs7QUFBQSxNQUFBOztFQVdNOzs7SUFBTixNQUFBLGdCQUFBO01BYUUsV0FBYSxDQUFDLEVBQUQsRUFBSyxVQUFVLENBQUEsQ0FBZixDQUFBO0FBQ1gsWUFBQSxHQUFBLEVBQUE7UUFBQSxJQUFDLENBQUEsR0FBRCxHQUFPLENBQUEsQ0FBRSxFQUFGO1FBRVAsSUFBQyxDQUFBLE1BQUQsR0FBVTtRQUNWLEtBQUEsY0FBQTs7VUFDRSxJQUFDLENBQUEsTUFBTyxDQUFBLEdBQUEsQ0FBUixHQUFlO1FBRGpCO1FBR0EsSUFBQyxDQUFBLElBQUQsQ0FBQTtNQVBXLENBWmI7OztNQXNCQSxJQUFNLENBQUEsQ0FBQTtlQUNKLElBQUMsQ0FBQSxvQ0FBRCxDQUFzQyxxREFBdEM7TUFESSxDQXRCTjs7OztNQTBCQSxZQUFjLENBQUMsT0FBRCxDQUFBO1FBQ1osSUFBdUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxZQUEvQztpQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLENBQUEsV0FBQSxDQUFBLENBQWMsT0FBZCxDQUFBLENBQVosRUFBQTs7TUFEWSxDQTFCZDs7O01BOEJBLE9BQVMsQ0FBQyxRQUFELENBQUE7QUFDUCxZQUFBO1FBQUEsTUFBQSxHQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLFFBQVY7QUFDVCxnQkFBTyxNQUFNLENBQUMsTUFBZDtBQUFBLGVBQ08sQ0FEUDttQkFDYyxJQUFDLENBQUEsb0NBQUQsQ0FBc0MsQ0FBQSxvQkFBQSxDQUFBLENBQXVCLFFBQXZCLENBQWdDLENBQWhDLENBQXRDLEVBQTBFO2NBQUEsTUFBQSxFQUFRO1lBQVIsQ0FBMUU7QUFEZCxlQUVPLENBRlA7bUJBRWMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxLQUFQLENBQUEsQ0FBRjtBQUZkO21CQUdPLElBQUMsQ0FBQSxvQ0FBRCxD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QSxpQkFBQSxFQUF1QixRQUx2QjtNQU1BLGlCQUFBLEVBQXVCLDJCQU52QjtNQU9BLGtCQUFBLEVBQXVCO0lBUHZCOzs7Ozs7RUEwU0osQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEtBQVosQ0FBa0IsUUFBQSxDQUFBLENBQUE7V0FDaEIsQ0FBQSxDQUFFLHlCQUFGLENBQTRCLENBQUMsSUFBN0IsQ0FBa0MsUUFBQSxDQUFBLENBQUE7YUFDaEMsSUFBSSxlQUFKLENBQW9CLElBQXBCO0lBRGdDLENBQWxDO0VBRGdCLENBQWxCO0FBelRBIiwic291cmNlc0NvbnRlbnQiOlsiIyBUZXN0ZWQgaW4gSkFXUytJRS9GRiwgTlZEQStGRlxuI1xuIyBLbm93biBpc3N1ZXM6XG4jIC0gSkFXUyBsZWF2ZXMgdGhlIGlucHV0IHdoZW4gdXNpbmcgdXAvZG93biB3aXRob3V0IGVudGVyaW5nIHNvbWV0aGluZyAoSSBndWVzcyB0aGlzIGlzIGR1ZSB0byBzY3JlZW4gbGF5b3V0IGFuZCBjYW4gYmUgY29uc2lkZXJlZCBpbnRlbmRlZClcbiMgLSBBbGVydCBub3QgcGVyY2VpdmFibGUgdXBvbiBvcGVuaW5nIG9wdGlvbnMgdXNpbmcgdXAvZG93blxuIyAgICAgLSBQb3NzaWJsZSBzb2x1dGlvbiAxOiBhbHdheXMgc2hvdyBvcHRpb25zIGNvdW50IHdoZW4gZmlsdGVyIGZvY3VzZWQ/XG4jICAgICAtIFBvc3NpYmxlIHNvbHV0aW9uIDI6IHdhaXQgYSBtb21lbnQgYmVmb3JlIGFkZGluZyB0aGUgYWxlcnQ/XG4jIC0gVm9pY2VPdmVyL2lPUyBhbm5vdW5jZXMgcmFkaW8gYnV0dG9ucyBhcyBkaXNhYmxlZD8hXG4jIC0gaU9TIGRvZXNuJ3Qgc2VsZWN0IGFsbCB0ZXh0IHdoZW4gb3B0aW9uIHdhcyBjaG9zZW5cbiNcbiMgSW4gZ2VuZXJhbDogYWxlcnRzIHNlZW0gdG8gYmUgbW9zdCByb2J1c3QgaW4gYWxsIHJlbGV2YW50IGJyb3dzZXJzLCBidXQgYXJlbid0IHBvbGl0ZS4gTWF5YmUgd2UnbGwgZmluZCBhIGJldHRlciBtZWNoYW5pc20gdG8gc2VydmUgYnJvd3NlcnMgaW5kaXZpZHVhbGx5P1xuY2xhc3MgQWRnQXV0b2NvbXBsZXRlXG4gIHVuaXF1ZUlkQ291bnQgPSAxXG4gIFxuICBjb25maWcgPVxuICAgIGRlYnVnTWVzc2FnZTogICBmYWxzZVxuICAgIGhpZGRlbkNzc0NsYXNzOiAnYWRnLXZpc3VhbGx5LWhpZGRlbidcbiAgICBcbiAgICBvcHRpb25zQ29udGFpbmVyOiAgICAgICdmaWVsZHNldCdcbiAgICBvcHRpb25zQ29udGFpbmVyTGFiZWw6ICdsZWdlbmQnXG4gICAgYWxlcnRzQ29udGFpbmVySWQ6ICAgICAnYWxlcnRzJ1xuICAgIG51bWJlckluVG90YWxUZXh0OiAgICAgJ1tudW1iZXJdIG9wdGlvbnMgaW4gdG90YWwnXG4gICAgbnVtYmVyRmlsdGVyZWRUZXh0OiAgICAnW251bWJlcl0gb2YgW3RvdGFsXSBvcHRpb25zIGZvciBbZmlsdGVyXSdcbiAgICBcbiAgY29uc3RydWN0b3I6IChlbCwgb3B0aW9ucyA9IHt9KSAtPlxuICAgIEAkZWwgPSAkKGVsKVxuXG4gICAgQGNvbmZpZyA9IGNvbmZpZ1xuICAgIGZvciBrZXksIHZhbCBvZiBvcHRpb25zXG4gICAgICBAY29uZmlnW2tleV0gPSB2YWxcbiAgICBcbiAgICBAaW5pdCgpXG5cbiAgIyBEdW1teSwgbXVzdCBiZSBvdmVycmlkZGVuIGluIGluaGVyaXRpbmcgY2xhc3Nlcy5cbiAgaW5pdDogLT5cbiAgICBAdGhyb3dNZXNzYWdlQW5kUHJpbnRPYmplY3RzVG9Db25zb2xlICdDbGFzc2VzIGV4dGVuZGluZyBBcHAgbXVzdCBpbXBsZW1lbnQgbWV0aG9kIGluaXQoKSEnXG4gICAgXG4gICMgUHJpbnRzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIHRoZSBjb25zb2xlIGlmIGNvbmZpZ1snZGVidWcnXSBpcyB0cnVlLlxuICBkZWJ1Z01lc3NhZ2U6IChtZXNzYWdlKSAtPlxuICAgIGNvbnNvbGUubG9nIFwiQWRnIGRlYnVnOiAje21lc3NhZ2V9XCIgaWYgQGNvbmZpZy5kZWJ1Z01lc3NhZ2VcblxuICAjIEV4ZWN1dGVzIHRoZSBnaXZlbiBzZWxlY3RvciBvbiBAJGVsIGFuZCByZXR1cm5zIHRoZSBlbGVtZW50LiBNYWtlcyBzdXJlIGV4YWN0bHkgb25lIGVsZW1lbnQgZXhpc3RzLlxuICBmaW5kT25lOiAoc2VsZWN0b3IpIC0+XG4gICAgcmVzdWx0ID0gQCRlbC5maW5kKHNlbGVjdG9yKVxuICAgIHN3aXRjaCByZXN1bHQubGVuZ3RoXG4gICAgICB3aGVuIDAgdGhlbiBAdGhyb3dNZXNzYWdlQW5kUHJpbnRPYmplY3RzVG9Db25zb2xlIFwiTm8gb2JqZWN0IGZvdW5kIGZvciAje3NlbGVjdG9yfSFcIiwgcmVzdWx0OiByZXN1bHRcbiAgICAgIHdoZW4gMSB0aGVuICQocmVzdWx0LmZpcnN0KCkpXG4gICAgICBlbHNlIEB0aHJvd01lc3NhZ2VBbmRQcmludE9iamVjdHNUb0NvbnNvbGUgXCJNb3JlIHRoYW4gb25lIG9iamVjdCBmb3VuZCBmb3IgI3tzZWxlY3Rvcn0hXCIsIHJlc3VsdDogcmVzdWx0XG4gICAgICAgIFxuICBuYW1lOiAtPlxuICAgIFwiYWRnLWF1dG9jb21wbGV0ZVwiXG4gICAgICAgIFxuICBhZGRBZGdEYXRhQXR0cmlidXRlOiAoJHRhcmdldCwgbmFtZSwgdmFsdWUgPSAnJykgLT5cbiAgICAkdGFyZ2V0LmF0dHIoQGFkZ0RhdGFBdHRyaWJ1dGVOYW1lKG5hbWUpLCB2YWx1ZSlcbiAgICAgICAgXG4gIHJlbW92ZUFkZ0RhdGFBdHRyaWJ1dGU6ICgkdGFyZ2V0LCBuYW1lKSAtPlxuICAgICR0YXJnZXQucmVtb3ZlQXR0cihAYWRnRGF0YUF0dHJpYnV0ZU5hbWUobmFtZSkpXG4gICAgXG4gIGFkZ0RhdGFBdHRyaWJ1dGVOYW1lOiAobmFtZSA9IG51bGwpIC0+XG4gICAgcmVzdWx0ID0gXCJkYXRhLSN7QG5hbWUoKX1cIlxuICAgIHJlc3VsdCArPSBcIi0je25hbWV9XCIgaWYgbmFtZVxuICAgIHJlc3VsdFxuICAgIFxuICB1bmlxdWVJZDogKG5hbWUpIC0+XG4gICAgW0BuYW1lKCksIG5hbWUsIHVuaXF1ZUlkQ291bnQrK10uam9pbiAnLSdcbiAgICBcbiAgbGFiZWxPZklucHV0OiAoJGlucHV0cykgLT5cbiAgICAkaW5wdXRzLm1hcCAoaSwgaW5wdXQpID0+XG4gICAgICAkaW5wdXQgPSAkKGlucHV0KVxuICAgICAgXG4gICAgICBpZCA9ICRpbnB1dC5hdHRyKCdpZCcpXG4gICAgICAkbGFiZWwgPSBAZmluZE9uZShcImxhYmVsW2Zvcj0nI3tpZH0nXVwiKVswXVxuXG4gICAgICBpZiAkbGFiZWwubGVuZ3RoID09IDBcbiAgICAgICAgJGxhYmVsID0gJGlucHV0LmNsb3Nlc3QoJ2xhYmVsJylcbiAgICAgICAgQHRocm93TWVzc2FnZUFuZFByaW50T2JqZWN0c1RvQ29uc29sZSBcIk5vIGNvcnJlc3BvbmRpbmcgaW5wdXQgZm91bmQgZm9yIGlucHV0IVwiLCBpbnB1dDogJGlucHV0IGlmICRsYWJlbC5sZW5ndGggPT0gMFxuXG4gICAgICAkbGFiZWxcblxuICBzaG93OiAoJGVsKSAtPlxuICAgICRlbC5yZW1vdmVBdHRyKCdoaWRkZW4nKVxuICAgICRlbC5zaG93KClcblxuICAgICMgVE9ETyBXb3VsZCBiZSBjb29sIHRvIHJlbm91bmNlIENTUyBhbmQgc29sZWx5IHVzZSB0aGUgaGlkZGVuIGF0dHJpYnV0ZS4gQnV0IGpRdWVyeSdzIDp2aXNpYmxlIGRvZXNuJ3Qgc2VlbSB0byB3b3JrIHdpdGggaXQhP1xuICAgICMgQHRocm93TWVzc2FnZUFuZFByaW50T2JqZWN0c1RvQ29uc29sZShcIkVsZW1lbnQgaXMgc3RpbGwgaGlkZGVuLCBhbHRob3VnaCBoaWRkZW4gYXR0cmlidXRlIHdhcyByZW1vdmVkISBNYWtlIHN1cmUgdGhlcmUncyBubyBDU1MgbGlrZSBkaXNwbGF5Om5vbmUgb3IgdmlzaWJpbGl0eTpoaWRkZW4gbGVmdCBvbiBpdCFcIiwgZWxlbWVudDogJGVsKSBpZiAkZWwuaXMoJzpoaWRkZW4nKVxuXG4gIGhpZGU6ICgkZWwpIC0+XG4gICAgJGVsLmF0dHIoJ2hpZGRlbicsICcnKVxuICAgICRlbC5oaWRlKClcbiAgICBcbiAgdGhyb3dNZXNzYWdlQW5kUHJpbnRPYmplY3RzVG9Db25zb2xlOiAobWVzc2FnZSwgZWxlbWVudHMgPSB7fSkgLT5cbiAgICBjb25zb2xlLmxvZyBlbGVtZW50c1xuICAgIHRocm93IG1lc3NhZ2VcbiAgICBcbiAgdGV4dDogKHRleHQsIG9wdGlvbnMgPSB7fSkgLT5cbiAgICB0ZXh0ID0gQGNvbmZpZ1tcIiN7dGV4dH1UZXh0XCJdXG4gICAgXG4gICAgZm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSBcIlsje2tleX1dXCIsIHZhbHVlXG4gICAgICBcbiAgICB0ZXh0XG4gIFxuICBpbml0OiAtPlxuICAgICMgTWVyZ2UgY29uZmlnIGludG8gZXhpc3Rpbmcgb25lIChub3QgbmljZSwgc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ3NzIxNjk5LylcbiAgICBmb3Iga2V5LCB2YWwgb2YgY29uZmlnXG4gICAgICBAY29uZmlnW2tleV0gPSB2YWxcbiAgICAgIFxuICAgIGpzb25PcHRpb25zID0gQCRlbC5hdHRyKEBhZGdEYXRhQXR0cmlidXRlTmFtZSgpKVxuICAgIGlmIGpzb25PcHRpb25zXG4gICAgICBmb3Iga2V5LCB2YWwgb2YganNvbk9wdGlvbnNcbiAgICAgICAgQGNvbmZpZ1trZXldID0gdmFsXG4gICAgXG4gICAgQGRlYnVnTWVzc2FnZSAnc3RhcnQnXG5cbiAgICBAaW5pdEZpbHRlcigpXG4gICAgQGluaXRPcHRpb25zKClcbiAgICBAaW5pdEFsZXJ0cygpXG4gICAgXG4gICAgQGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyKClcbiAgICBAYW5ub3VuY2VPcHRpb25zTnVtYmVyKCcnKVxuXG4gICAgQGF0dGFjaEV2ZW50cygpXG4gICAgXG4gIGluaXRGaWx0ZXI6IC0+XG4gICAgQCRmaWx0ZXIgPSBAZmluZE9uZSgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxuICAgIEBhZGRBZGdEYXRhQXR0cmlidXRlKEAkZmlsdGVyLCAnZmlsdGVyJylcbiAgICBAJGZpbHRlci5hdHRyKCdhdXRvY29tcGxldGUnLCAnb2ZmJylcbiAgICBAJGZpbHRlci5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICBcbiAgaW5pdE9wdGlvbnM6IC0+XG4gICAgQCRvcHRpb25zQ29udGFpbmVyID0gQGZpbmRPbmUoQGNvbmZpZy5vcHRpb25zQ29udGFpbmVyKVxuICAgIEBhZGRBZGdEYXRhQXR0cmlidXRlKEAkb3B0aW9uc0NvbnRhaW5lciwgJ29wdGlvbnMnKVxuICAgIFxuICAgIEAkb3B0aW9uc0NvbnRhaW5lckxhYmVsID0gQGZpbmRPbmUoQGNvbmZpZy5vcHRpb25zQ29udGFpbmVyTGFiZWwpXG4gICAgQCRvcHRpb25zQ29udGFpbmVyTGFiZWwuYWRkQ2xhc3MoQGNvbmZpZy5oaWRkZW5Dc3NDbGFzcylcbiAgICBcbiAgICBAJG9wdGlvbnMgPSBAJG9wdGlvbnNDb250YWluZXIuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJylcbiAgICBAYWRkQWRnRGF0YUF0dHJpYnV0ZShAbGFiZWxPZklucHV0KEAkb3B0aW9ucyksICdvcHRpb24nKVxuICAgIEAkb3B0aW9ucy5hZGRDbGFzcyhAY29uZmlnLmhpZGRlbkNzc0NsYXNzKVxuICAgIFxuICBpbml0QWxlcnRzOiAtPlxuICAgIEAkYWxlcnRzQ29udGFpbmVyID0gJChcIjxkaXYgaWQ9JyN7QHVuaXF1ZUlkKEBjb25maWcuYWxlcnRzQ29udGFpbmVySWQpfSc+PC9kaXY+XCIpXG4gICAgQCRvcHRpb25zQ29udGFpbmVyTGFiZWwuYWZ0ZXIoQCRhbGVydHNDb250YWluZXIpXG4gICAgQCRmaWx0ZXIuYXR0cignYXJpYS1kZXNjcmliZWRieScsIFtAJGZpbHRlci5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JyksIEAkYWxlcnRzQ29udGFpbmVyLmF0dHIoJ2lkJyldLmpvaW4oJyAnKS50cmltKCkpXG4gICAgQGFkZEFkZ0RhdGFBdHRyaWJ1dGUoQCRhbGVydHNDb250YWluZXIsICdhbGVydHMnKVxuICBcbiAgYXR0YWNoRXZlbnRzOiAtPlxuICAgIEBhdHRhY2hDbGlja0V2ZW50VG9GaWx0ZXIoKVxuICAgIEBhdHRhY2hDaGFuZ2VFdmVudFRvRmlsdGVyKClcbiAgICBcbiAgICBAYXR0YWNoRXNjYXBlS2V5VG9GaWx0ZXIoKVxuICAgIEBhdHRhY2hFbnRlcktleVRvRmlsdGVyKClcbiAgICBAYXR0YWNoVGFiS2V5VG9GaWx0ZXIoKVxuICAgIEBhdHRhY2hVcERvd25LZXlzVG9GaWx0ZXIoKVxuICAgIFxuICAgIEBhdHRhY2hDaGFuZ2VFdmVudFRvT3B0aW9ucygpXG4gICAgQGF0dGFjaENsaWNrRXZlbnRUb09wdGlvbnMoKVxuICAgIFxuICBhdHRhY2hDbGlja0V2ZW50VG9GaWx0ZXI6IC0+XG4gICAgQCRmaWx0ZXIuY2xpY2sgPT5cbiAgICAgIEBkZWJ1Z01lc3NhZ2UgJ2NsaWNrIGZpbHRlcidcbiAgICAgIGlmIEAkb3B0aW9uc0NvbnRhaW5lci5pcygnOnZpc2libGUnKVxuICAgICAgICBAaGlkZU9wdGlvbnMoKVxuICAgICAgZWxzZVxuICAgICAgICBAc2hvd09wdGlvbnMoKVxuICAgICAgXG4gIGF0dGFjaEVzY2FwZUtleVRvRmlsdGVyOiAtPlxuICAgIEAkZmlsdGVyLmtleWRvd24gKGUpID0+XG4gICAgICBpZiBlLndoaWNoID09IDI3XG4gICAgICAgIGlmIEAkb3B0aW9uc0NvbnRhaW5lci5pcygnOnZpc2libGUnKVxuICAgICAgICAgIEBhcHBseUNoZWNrZWRPcHRpb25Ub0ZpbHRlckFuZFJlc2V0T3B0aW9ucygpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGVsc2UgaWYgQCRvcHRpb25zLmlzKCc6Y2hlY2tlZCcpXG4gICAgICAgICAgQCRvcHRpb25zLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSlcbiAgICAgICAgICBAYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXJBbmRSZXNldE9wdGlvbnMoKVxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlbHNlICMgTmVlZGVkIGZvciBhdXRvbWF0aWMgdGVzdGluZyBvbmx5XG4gICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPHA+RXNjIHBhc3NlZCBvbi48L3A+JylcbiAgICAgIFxuICBhdHRhY2hFbnRlcktleVRvRmlsdGVyOiAtPlxuICAgIEAkZmlsdGVyLmtleWRvd24gKGUpID0+XG4gICAgICBpZiBlLndoaWNoID09IDEzXG4gICAgICAgIEBkZWJ1Z01lc3NhZ2UgJ2VudGVyJ1xuICAgICAgICBpZiBAJG9wdGlvbnNDb250YWluZXIuaXMoJzp2aXNpYmxlJylcbiAgICAgICAgICBAYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXJBbmRSZXNldE9wdGlvbnMoKVxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlbHNlICMgTmVlZGVkIGZvciBhdXRvbWF0aWMgdGVzdGluZyBvbmx5XG4gICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPHA+RW50ZXIgcGFzc2VkIG9uLjwvcD4nKVxuICAgICAgXG4gIGF0dGFjaFRhYktleVRvRmlsdGVyOiAtPlxuICAgIEAkZmlsdGVyLmtleWRvd24gKGUpID0+XG4gICAgICBpZiBlLndoaWNoID09IDlcbiAgICAgICAgQGRlYnVnTWVzc2FnZSAndGFiJ1xuICAgICAgICBpZiBAJG9wdGlvbnNDb250YWluZXIuaXMoJzp2aXNpYmxlJylcbiAgICAgICAgICBAYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXJBbmRSZXNldE9wdGlvbnMoKVxuICAgICAgXG4gIGF0dGFjaFVwRG93bktleXNUb0ZpbHRlcjogLT5cbiAgICBAJGZpbHRlci5rZXlkb3duIChlKSA9PlxuICAgICAgaWYgZS53aGljaCA9PSAzOCB8fCBlLndoaWNoID09IDQwXG4gICAgICAgIGlmIEAkb3B0aW9uc0NvbnRhaW5lci5pcygnOnZpc2libGUnKVxuICAgICAgICAgIGlmIGUud2hpY2ggPT0gMzhcbiAgICAgICAgICAgIEBtb3ZlU2VsZWN0aW9uKCd1cCcpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgQG1vdmVTZWxlY3Rpb24oJ2Rvd24nKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgQHNob3dPcHRpb25zKClcbiAgICAgICBcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpICMgVE9ETzogVGVzdCFcbiAgICBcbiAgc2hvd09wdGlvbnM6IC0+XG4gICAgQGRlYnVnTWVzc2FnZSAnKHNob3cgb3B0aW9ucyknXG4gICAgQHNob3coQCRvcHRpb25zQ29udGFpbmVyKVxuICAgIEAkZmlsdGVyLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpXG4gICAgXG4gIGhpZGVPcHRpb25zOiAtPlxuICAgIEBkZWJ1Z01lc3NhZ2UgJyhoaWRlIG9wdGlvbnMpJ1xuICAgIEBoaWRlKEAkb3B0aW9uc0NvbnRhaW5lcilcbiAgICBAJGZpbHRlci5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICBcbiAgbW92ZVNlbGVjdGlvbjogKGRpcmVjdGlvbikgLT5cbiAgICAkdmlzaWJsZU9wdGlvbnMgPSBAJG9wdGlvbnMuZmlsdGVyKCc6dmlzaWJsZScpXG4gICAgXG4gICAgbWF4SW5kZXggPSAkdmlzaWJsZU9wdGlvbnMubGVuZ3RoIC0gMVxuICAgIGN1cnJlbnRJbmRleCA9ICR2aXNpYmxlT3B0aW9ucy5pbmRleCgkdmlzaWJsZU9wdGlvbnMucGFyZW50KCkuZmluZCgnOmNoZWNrZWQnKSkgIyBUT0RPOiBpcyBwYXJlbnQoKSBnb29kIGhlcmU/IVxuICAgIFxuICAgIHVwY29taW5nSW5kZXggPSBpZiBkaXJlY3Rpb24gPT0gJ3VwJ1xuICAgICAgICAgICAgICAgICAgICAgIGlmIGN1cnJlbnRJbmRleCA8PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhJbmRleFxuICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtIDFcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgIGlmIGN1cnJlbnRJbmRleCA9PSBtYXhJbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCArIDFcblxuICAgICR1cGNvbWluZ09wdGlvbiA9ICQoJHZpc2libGVPcHRpb25zW3VwY29taW5nSW5kZXhdKVxuICAgICR1cGNvbWluZ09wdGlvbi5wcm9wKCdjaGVja2VkJywgdHJ1ZSkudHJpZ2dlcignY2hhbmdlJylcbiAgICBcbiAgYXR0YWNoQ2hhbmdlRXZlbnRUb09wdGlvbnM6IC0+XG4gICAgQCRvcHRpb25zLmNoYW5nZSAoZSkgPT5cbiAgICAgIEBkZWJ1Z01lc3NhZ2UgJ29wdGlvbiBjaGFuZ2UnXG4gICAgICBAYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXIoKVxuICAgICAgQCRmaWx0ZXIuZm9jdXMoKS5zZWxlY3QoKVxuXG4gIGFwcGx5Q2hlY2tlZE9wdGlvblRvRmlsdGVyQW5kUmVzZXRPcHRpb25zOiAtPlxuICAgIEBhcHBseUNoZWNrZWRPcHRpb25Ub0ZpbHRlcigpXG4gICAgQGhpZGVPcHRpb25zKClcbiAgICBAZmlsdGVyT3B0aW9ucygpXG4gICAgICBcbiAgYXBwbHlDaGVja2VkT3B0aW9uVG9GaWx0ZXI6IC0+XG4gICAgQGRlYnVnTWVzc2FnZSAnKGFwcGx5IG9wdGlvbiB0byBmaWx0ZXIpJ1xuICAgIFxuICAgICRwcmV2aW91c2x5Q2hlY2tlZE9wdGlvbkxhYmVsID0gJChcIlsje0BhZGdEYXRhQXR0cmlidXRlTmFtZSgnb3B0aW9uLXNlbGVjdGVkJyl9XVwiKVxuICAgIGlmICRwcmV2aW91c2x5Q2hlY2tlZE9wdGlvbkxhYmVsLmxlbmd0aCA9PSAxXG4gICAgICBAcmVtb3ZlQWRnRGF0YUF0dHJpYnV0ZSgkcHJldmlvdXNseUNoZWNrZWRPcHRpb25MYWJlbCwgJ29wdGlvbi1zZWxlY3RlZCcpXG4gICBcbiAgICAkY2hlY2tlZE9wdGlvbiA9IEAkb3B0aW9ucy5maWx0ZXIoJzpjaGVja2VkJylcbiAgICBpZiAkY2hlY2tlZE9wdGlvbi5sZW5ndGggPT0gMVxuICAgICAgJGNoZWNrZWRPcHRpb25MYWJlbCA9IEBsYWJlbE9mSW5wdXQoJGNoZWNrZWRPcHRpb24pXG4gICAgICBAJGZpbHRlci52YWwoJC50cmltKCRjaGVja2VkT3B0aW9uTGFiZWwudGV4dCgpKSlcbiAgICAgIEBhZGRBZGdEYXRhQXR0cmlidXRlKCRjaGVja2VkT3B0aW9uTGFiZWwsICdvcHRpb24tc2VsZWN0ZWQnKVxuICAgIGVsc2VcbiAgICAgIEAkZmlsdGVyLnZhbCgnJylcbiAgICAgIFxuICBhdHRhY2hDbGlja0V2ZW50VG9PcHRpb25zOiAtPlxuICAgIEAkb3B0aW9ucy5jbGljayAoZSkgPT5cbiAgICAgIEBkZWJ1Z01lc3NhZ2UgJ2NsaWNrIG9wdGlvbidcbiAgICAgIEBoaWRlT3B0aW9ucygpXG4gICAgICBcbiAgYXR0YWNoQ2hhbmdlRXZlbnRUb0ZpbHRlcjogLT5cbiAgICBAJGZpbHRlci5vbiAnaW5wdXQgcHJvcGVydHljaGFuZ2UgcGFzdGUnLCAoZSkgPT5cbiAgICAgIEBkZWJ1Z01lc3NhZ2UgJyhmaWx0ZXIgY2hhbmdlZCknXG4gICAgICBAZmlsdGVyT3B0aW9ucyhlLnRhcmdldC52YWx1ZSlcbiAgICAgIEBzaG93T3B0aW9ucygpXG4gICAgICBcbiAgZmlsdGVyT3B0aW9uczogKGZpbHRlciA9ICcnKSAtPlxuICAgIGZ1enp5RmlsdGVyID0gQGZ1enppZnlGaWx0ZXIoZmlsdGVyKVxuICAgIHZpc2libGVOdW1iZXIgPSAwXG4gICAgXG4gICAgQCRvcHRpb25zLmVhY2ggKGksIGVsKSA9PlxuICAgICAgJG9wdGlvbiA9ICQoZWwpXG4gICAgICAkb3B0aW9uQ29udGFpbmVyID0gJG9wdGlvbi5wYXJlbnQoKVxuXG4gICAgICByZWdleCA9IG5ldyBSZWdFeHAoZnV6enlGaWx0ZXIsICdpJylcbiAgICAgIGlmIHJlZ2V4LnRlc3QoJG9wdGlvbkNvbnRhaW5lci50ZXh0KCkpXG4gICAgICAgIHZpc2libGVOdW1iZXIrK1xuICAgICAgICBAc2hvdygkb3B0aW9uQ29udGFpbmVyKVxuICAgICAgZWxzZVxuICAgICAgICBAaGlkZSgkb3B0aW9uQ29udGFpbmVyKVxuICAgICAgICBcbiAgICBAYW5ub3VuY2VPcHRpb25zTnVtYmVyKGZpbHRlciwgdmlzaWJsZU51bWJlcilcbiAgICBcbiAgYW5ub3VuY2VPcHRpb25zTnVtYmVyOiAoZmlsdGVyID0gQCRmaWx0ZXIudmFsKCksIG51bWJlciA9IEAkb3B0aW9ucy5sZW5ndGgpIC0+XG4gICAgQCRhbGVydHNDb250YWluZXIuZmluZCgncCcpLnJlbW92ZSgpICMgUmVtb3ZlIHByZXZpb3VzIGFsZXJ0cyAoSSdtIG5vdCBzdXJlIHdoZXRoZXIgdGhpcyBpcyB0aGUgYmVzdCBzb2x1dGlvbiwgbWF5YmUgaGlkaW5nIHRoZW0gd291bGQgYmUgbW9yZSByb2J1c3Q/KVxuICAgIFxuICAgIG1lc3NhZ2UgPSBpZiBmaWx0ZXIgPT0gJydcbiAgICAgICAgICAgICAgICBAdGV4dCgnbnVtYmVySW5Ub3RhbCcsIG51bWJlcjogbnVtYmVyKVxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQHRleHQoJ251bWJlckZpbHRlcmVkJywgbnVtYmVyOiBudW1iZXIsIHRvdGFsOiBAJG9wdGlvbnMubGVuZ3RoLCBmaWx0ZXI6IFwiPGtiZD4je2ZpbHRlcn08L2tiZD5cIilcbiAgICAgIFxuICAgIEAkYWxlcnRzQ29udGFpbmVyLmFwcGVuZChcIjxwIHJvbGU9J2FsZXJ0Jz4je21lc3NhZ2V9PC9wPlwiKVxuICAgICAgICBcbiAgZnV6emlmeUZpbHRlcjogKGZpbHRlcikgLT5cbiAgICBpID0gMFxuICAgIGZ1enppZmllZEZpbHRlciA9ICcnXG4gICAgd2hpbGUgaSA8IGZpbHRlci5sZW5ndGhcbiAgICAgIGVzY2FwZWRDaGFyYWN0ZXIgPSBmaWx0ZXIuY2hhckF0KGkpLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKSAjIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDQ2MTcwL2VzY2FwZS1zdHJpbmctZm9yLXVzZS1pbi1qYXZhc2NyaXB0LXJlZ2V4XG4gICAgICBmdXp6aWZpZWRGaWx0ZXIgKz0gXCIje2VzY2FwZWRDaGFyYWN0ZXJ9Lio/XCJcbiAgICAgIGkrK1xuICAgICAgXG4gICAgZnV6emlmaWVkRmlsdGVyXG4gICAgXG4kKGRvY3VtZW50KS5yZWFkeSAtPlxuICAkKCdbZGF0YS1hZGctYXV0b2NvbXBsZXRlXScpLmVhY2ggLT5cbiAgICBuZXcgQWRnQXV0b2NvbXBsZXRlIEAiXX0=
//# sourceURL=coffeescript