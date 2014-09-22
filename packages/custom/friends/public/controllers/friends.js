'use strict';

angular.module('mean.friends').controller('FriendsController', ['$scope', '$location', 'Global', 'Friends',
  function($scope, $location, Global, Friends) {
    $scope.global = Global;
    $scope.global.title = 'Friends';
    $scope.default_image = 'http://placehold.it/88x88';

    $scope.find = function() {
      Friends.query(function(friends) {
        $scope.friends = friends;
      });
    };

    $scope.create = function(isValid) {
      if (isValid) {
        console.log('valido');
        var friend = new Friends({
          friend_name: this.friend_name
        });
        friend.$save(function(response) {
          $location.path('friends');
        });

        this.friend_name = '';
      } else {
        console.log('invalido');
        $scope.submitted = true;
      }
    };
  }
]);
