'use strict';

angular.module('mean.friends').directive('autofocus', ['$timeout', function($timeout) {
    return function(scope, element, attr) {
      $timeout(function() {
        element.focus();
      });
    };
  }]);
