'use strict';
var app = angular.module('scm', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl:'../views/contents/landingpage.html',
      controller:'LandingPageController'
    }).when("/inventory", {
        templateUrl:'../views/contents/inventory.html',
        controller:'InventoryController'
    }).when("/product", {
        templateUrl:'../views/contents/product.html',
        controller:'ProductController'
    });
});

app.run(function ($rootScope) {
  var retrievedObject = localStorage.getItem('user_credential');
  if(retrievedObject == null){
    window.location.replace("http://e-scm.localdev.info/");
  }else{
    $rootScope.credential = JSON.parse(retrievedObject);
  }
});
