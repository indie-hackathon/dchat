'use strict';

angular.module('mean.draw').factory('Draw', ['$resource',
  function($resource) {
    return $resource('draws/:friend', {
      friend: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
