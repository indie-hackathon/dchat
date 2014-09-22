'use strict';

angular.module('mean.draw').controller('DrawController', ['$scope', 'Global', 'Draw',
  function($scope, Global, Draw) {
    $scope.global = Global;
    $scope.global.title = 'Draws';
  }
]);
