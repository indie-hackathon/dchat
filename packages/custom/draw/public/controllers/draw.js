'use strict';

angular.module('mean.draw').controller('DrawController', ['$scope', '$stateParams', '$location', 'Global', 'Draw',
  function($scope, $stateParams, $location, Global, Draw) {
    $scope.global = Global;
    $scope.global.title = 'Draws';

    $scope.create = function(isValid) {
      if (isValid) {
        console.log('valid');
        var draw = new Draw({
          content: this.content,
          to: $stateParams.friend
        });
        draw.$save(function(response) {
          $location.path('friends');
        });

        this.friend_name = '';
      } else {
        console.log('invalid');
        $scope.submitted = true;
      }
      return false;
    };
  }
]);
