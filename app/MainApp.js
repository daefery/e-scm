'use strict';
var app = angular.module('scm', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl:'../views/contents/landingpage.html',
      controller:'LandingPageController',
      title:'Dashboard',
      url:'/main'
    }).when("/product", {
        templateUrl:'../views/contents/product.html',
        controller:'ProductController',
        title:'Product',
        url:'/product'
    });
});

app.run(function ($rootScope) {
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.title = current.$$route.title;
      $rootScope.url = current.$$route.url;
  });
  var retrievedObject = localStorage.getItem('user_credential');
  if(retrievedObject == null){
    window.location.replace("/");
  }else{
    $rootScope.credential = JSON.parse(retrievedObject);
  }
});
