/**
 * Application entry point
 */

// Load application styles
// ================================
// START YOUR APP HERE
// ================================

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

    $('.action').on('click', function() {
      var isActionTypeLeft = $(this).hasClass('left');
      $item.each(function () {
        var offset = 0;
        if (isActionTypeLeft) {
          offset = $(this).position().left - $item.innerWidth();
        } else {
          offset = $(this).position().left + $item.innerWidth();
        }
        $(this).animate({'left': offset}, 500);

      });
    });

  });
})(jQuery);