'use strict';
var app = angular.module('scm', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl:'../views/contents/landingpage.html',
      controller:'LandingPageController',
      title:'Dashboard',
      parent:undefined
    }).when("/product", {
        templateUrl:'../views/contents/product.html',
        controller:'ProductController',
        title:'Product',
        parent:undefined
    }).when("/stockmanagement", {
        templateUrl:'../views/contents/stockmanagement.html',
        controller:'StockManagementController',
        title:'Stock Management',
        parent:'Inventory'
    }).when("/supplier", {
        templateUrl:'../views/contents/supplier.html',
        controller:'SupplierController',
        title:'Stock Management',
        parent:'Supplier'
    });

});

app.run(function ($rootScope) {
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    $rootScope.title = current.$$route.title;
    $rootScope.parent = current.$$route.parent;
  });
  var retrievedObject = localStorage.getItem('user_credential');
  if(retrievedObject == null){
    window.location.replace("/");
  }else{
    $rootScope.credential = JSON.parse(retrievedObject);
  }
});
