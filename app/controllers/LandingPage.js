app.controller('LandingPageInventoryController', function($scope, $http, $filter) {
    $http.get('../../data/product.json').success(function(prod_result){
    	$scope.product = angular.copy(prod_result.product);
    });
    $http.get('../../data/supplier.json').success(function(prod_result){
    	$scope.supplier = angular.copy(prod_result.supplier);
    });

    $scope.stockmngt = [];
    $http.get('../../data/product.json').success(function(prod_result){
      $http.get('../../data/inventory.json').success(function(inv_result) {
        angular.forEach(inv_result.inventory, function(val, key){
          var prod = $filter('filter')(prod_result.product, {product_id:val.product_id})[0];
          var dt = {
            "item_name":prod.name,
            "cost":prod.cost,
            "status":(val.stock_hold <= prod.stock_min && val.stock_hold > 0 ? 'Low Stock':val.stock_hold <= 0 ? 'Out of Stock':'In Stock'),
          };
          $scope.stockmngt.push(dt);
        });
      });
    });
});
