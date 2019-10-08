(function ($) {
  'use strict';

  Drupal.behaviors.menu = {
    attach: function(context, settings) {
      $('.fa-bars', context).on('click', function() {
        $(this).toggleClass('fa-times');
        $(this).siblings('.region__menu-main').toggleClass('active');
      })
    }
  };

}(jQuery));