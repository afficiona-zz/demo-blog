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
      noOfItemsVisible: 1
    };

    var $slider = $('#slider');
    var $wrapper = $slider.find('.wrapper');
    var $item = $wrapper.find('.item');

    //getting wrapper dimensions
    var $wrapperDimensions = {
      width: $wrapper.width(),
      height: $wrapper.height()
    };

    $item.innerWidth($wrapperDimensions.width / config.noOfItemsVisible);
    $wrapper.height($item.height());
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