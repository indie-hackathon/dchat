'use strict';

angular.module('mean.draw').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('draw example page', {
      url: '/draw/example',
      templateUrl: 'draw/views/index.html'
    });
  }
]);
