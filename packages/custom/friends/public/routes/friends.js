'use strict';

angular.module('mean.friends').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/');
        }
      });

      return deferred.promise;
    };

    $stateProvider
      .state('friends', {
        url: '/friends',
        templateUrl: 'friends/views/index.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('add a friend', {
        url: '/friends/add',
        templateUrl: 'friends/views/add_friend.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('notifications', {
        url: '/notifications',
        templateUrl: 'friends/views/index.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
