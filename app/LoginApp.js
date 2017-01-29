'use strict';
var app_login = angular.module('credential', ['ngRoute']);
app_login.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl:'../../views/contents/login.html',
      controller:'LoginController'
    });
});
