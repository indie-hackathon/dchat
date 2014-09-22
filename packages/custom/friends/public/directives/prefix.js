'use strict';

angular.module('mean.friends').directive('prefix', [function() {
    return function(scope, element, attr) {
      element.on('keyup', function(event) {
        var value = element.val();
        event.preventDefault();
        if (!attr.prefix || !value || value.charAt(0) === '@') {
          return false;
        }
        element.val(attr.prefix + value);
      });
    };
  }]);
