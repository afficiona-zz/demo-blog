/**
 * Application entry point
 */

(function ($) {
  "use strict";
  $(document).ready(function() {
    var config = {
      noOfItemsVisible: $(window).innerWidth() > 992 ? 3 : 1
    };

    var $slider = $('#slider');
    var $wrapper = $slider.find('.wrapper');
    var $item = $wrapper.find('.item');

    $item.innerWidth($wrapper.innerWidth() / config.noOfItemsVisible);
    //calculating the height of the wrapper as per aspect ratio of 5:4
    $wrapper.innerHeight($item.innerWidth() * 4 / 5);
    $item.each(function (index, item) {
      $(item).css('left', (index * $(item).innerWidth()));
    });

    _checkIfLastItem();

    $('.action').on('click', function() {
      var $action = $(this);
      var isActionTypeLeft = $action.hasClass('left');
      //not allowing navigation if action is disbaled
      if ($action.hasClass('disabled')) {
        return;
      }
      $item.each(function (index) {
        var offset = 0;
        if (isActionTypeLeft) {
          offset = $(this).position().left + $item.innerWidth();
        } else {
          offset = $(this).position().left - $item.innerWidth();
        }
        $(this).animate({'left': offset}, 500, function () {
          _checkIfLastItem()
        });

      });
    });

    //Disbale navigation if first item or last item is visible.
    function _checkIfLastItem() {
      var $lastItem = $item.last();
      var $firstItem = $item.first();
      // resetting disabled state
      $('.action').removeClass('disabled');

      // if last item
      if (Math.floor($wrapper.innerWidth()) === Math.floor($lastItem.innerWidth() + $lastItem.position().left)) {
        $('.action.right').addClass('disabled');
      }
      //if first item
      if ($firstItem.position().left === 0) {
        $('.action.left').addClass('disabled');
      }
    }

  });
})(jQuery);