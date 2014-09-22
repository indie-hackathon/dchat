'use strict';

angular.module('mean.draw').config(['$stateProvider',
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

    $stateProvider.state('draw', {
      url: '/draw/:friend',
      templateUrl: 'draw/views/index.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });
  }
]);
