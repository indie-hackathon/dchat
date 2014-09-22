'use strict';

angular.module('mean.settings').controller('SettingsController', ['$scope', 'Global', 'Settings',
  function($scope, Global, Settings) {
    $scope.global = Global;
    $scope.global.title = 'Settings';
  }
]);
