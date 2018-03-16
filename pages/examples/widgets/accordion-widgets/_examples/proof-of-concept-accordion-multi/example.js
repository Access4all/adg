;(function () {
  $(document).ready(function () {
    return $("input[type='checkbox']").each((i, element) => {
      var $checkbox
      $checkbox = $(element)

      // Make Enter select/deselect checkbox (instead of submitting form)
      $checkbox.keypress(function (e) {
        if ((e.keyCode ? e.keyCode : e.which) === 13) {
          return $(this).trigger('click')
        }
      })
      return $checkbox.change(function () {
        var $panel, panel_id
        panel_id = `#${$checkbox.attr('id')}_panel`
        $panel = $(panel_id)
        if ($checkbox.is(':checked')) {
          return $panel.show()
        } else {
          return $panel.hide()
        }
      })
    })
  })
}.call(this))

// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtXQUNoQixDQUFBLENBQUUsd0JBQUYsQ0FBMkIsQ0FBQyxJQUE1QixDQUFpQyxDQUFDLENBQUQsRUFBSSxPQUFKLENBQUEsR0FBQTtBQUMvQixVQUFBO01BQUEsU0FBQSxHQUFZLENBQUEsQ0FBRSxPQUFGLEVBQVo7OztNQUdBLFNBQVMsQ0FBQyxRQUFWLENBQW1CLFFBQUEsQ0FBQyxDQUFELENBQUE7UUFDakIsSUFBRyxDQUFJLENBQUMsQ0FBQyxPQUFMLEdBQWtCLENBQUMsQ0FBQyxPQUFwQixHQUFpQyxDQUFDLENBQUMsS0FBcEMsQ0FBQSxLQUE4QyxFQUFqRDtpQkFDRSxDQUFBLENBQUUsSUFBRixDQUFJLENBQUMsT0FBTCxDQUFhLE9BQWIsRUFERjs7TUFEaUIsQ0FBbkI7YUFJQSxTQUFTLENBQUMsTUFBVixDQUFpQixRQUFBLENBQUEsQ0FBQTtBQUNmLFlBQUEsTUFBQSxFQUFBO1FBQUEsUUFBQSxHQUFXLENBQUEsQ0FBQSxDQUFBLENBQUksU0FBUyxDQUFDLElBQVYsQ0FBZSxJQUFmLENBQUosQ0FBeUIsTUFBekI7UUFDWCxNQUFBLEdBQVcsQ0FBQSxDQUFFLFFBQUY7UUFFWCxJQUFHLFNBQVMsQ0FBQyxFQUFWLENBQWEsVUFBYixDQUFIO2lCQUNFLE1BQU0sQ0FBQyxJQUFQLENBQUEsRUFERjtTQUFBLE1BQUE7aUJBR0UsTUFBTSxDQUFDLElBQVAsQ0FBQSxFQUhGOztNQUplLENBQWpCO0lBUitCLENBQWpDO0VBRGdCLENBQWxCO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSAtPlxuICAkKFwiaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS5lYWNoIChpLCBlbGVtZW50KSA9PlxuICAgICRjaGVja2JveCA9ICQoZWxlbWVudClcbiAgICBcbiAgICAjIE1ha2UgRW50ZXIgc2VsZWN0L2Rlc2VsZWN0IGNoZWNrYm94IChpbnN0ZWFkIG9mIHN1Ym1pdHRpbmcgZm9ybSlcbiAgICAkY2hlY2tib3gua2V5cHJlc3MgKGUpIC0+XG4gICAgICBpZiAoaWYgZS5rZXlDb2RlIHRoZW4gZS5rZXlDb2RlIGVsc2UgZS53aGljaCkgPT0gMTNcbiAgICAgICAgJChAKS50cmlnZ2VyICdjbGljaydcblxuICAgICRjaGVja2JveC5jaGFuZ2UgLT5cbiAgICAgIHBhbmVsX2lkID0gXCIjI3skY2hlY2tib3guYXR0cignaWQnKX1fcGFuZWxcIlxuICAgICAgJHBhbmVsICAgPSAkKHBhbmVsX2lkKVxuICAgICAgXG4gICAgICBpZiAkY2hlY2tib3guaXMoJzpjaGVja2VkJylcbiAgICAgICAgJHBhbmVsLnNob3coKVxuICAgICAgZWxzZVxuICAgICAgICAkcGFuZWwuaGlkZSgpIl19
// # sourceURL=coffeescript
