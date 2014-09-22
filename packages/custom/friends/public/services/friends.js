'use strict';

angular.module('mean.friends').factory('Friends', ['$resource',
  function($resource) {
    return $resource('friends/:friendId', {
      friendId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
