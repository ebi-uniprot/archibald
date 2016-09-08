'use strict';

var angular = require('angular');
var ngRoute = require('angular-route');

var app = angular.module('archibald', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/typography', {
      templateUrl: 'views/atoms/typography.html'
    }).
    when('/tiles', {
      templateUrl: 'views/molecules/tiles.html'
    }).
    otherwise({
      templateUrl: 'views/atoms/typography.html'
    });
  }
]);

// We need to re-trigger foundation for each view
app.run(['$rootScope', '$timeout', function($rootScope, $timeout) {
  $rootScope.$on('$routeChangeSuccess', function() {
    angular.element(document).ready(function() {
      $(document).foundation();
      $(document).archibald();
    });
  });
}]);
