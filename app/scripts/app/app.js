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
    when('/colours', {
      templateUrl: 'views/atoms/colours.html'
    }).
    when('/icons', {
      templateUrl: 'views/atoms/icons.html'
    }).
    when('/buttons', {
      templateUrl: 'views/atoms/buttons.html'
    }).
    when('/forms', {
      templateUrl: 'views/atoms/forms.html'
    }).
    when('/tables', {
      templateUrl: 'views/atoms/tables.html'
    }).
    when('/lists', {
      templateUrl: 'views/atoms/lists.html'
    }).
    when('/icons', {
      templateUrl: 'views/atoms/icons.html'
    }).
    when('/tiles', {
      templateUrl: 'views/molecules/tiles.html'
    }).
    when('/pagination', {
      templateUrl: 'views/molecules/pagination.html'
    }).
    when('/magellan', {
      templateUrl: 'views/molecules/magellan.html'
    }).
    when('/intro', {
      templateUrl: 'views/molecules/intro.html'
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
      $(document).uniprotStyle();
    });
  });
}]);
