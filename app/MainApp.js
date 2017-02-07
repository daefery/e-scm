'use strict';
var app = angular.module('scm', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl:'../views/contents/landingpage.html',
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
        title:'Supplier',
        parent:'Inventory'
    }).when("/inventoryreport", {
        templateUrl:'../views/contents/inventoryreport.html',
        controller:'InventoryReportController',
        title:'Report and History',
        parent:'Inventory'
    }).when("/newtransaction", {
        templateUrl:'../views/contents/new_transaction.html',
        controller:'NewTransactionController',
        title:'New Transaction',
        parent:'Transaction'
    }).when("/recenttransaction", {
        templateUrl:'../views/contents/recent_transaction.html',
        controller:'RecentTransactionController',
        title:'Recent Transaction',
        parent:'Transaction'
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
