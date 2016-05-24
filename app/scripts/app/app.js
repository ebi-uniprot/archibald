'use strict';

var angular = require('angular');
var ngRoute = require('angular-route');

var app = angular.module('archibald', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/welcome.html'
      }).
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
      otherwise({
        redirectTo: '/'
      });
  }]);
