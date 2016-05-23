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
      otherwise({
        redirectTo: '/'
      });
  }]);
