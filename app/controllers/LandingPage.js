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


    $http.get('../../data/purchase_order.json').success(function(result){
        $scope.purchase_order = [];//angular.copy(result.purchase_order);
        angular.forEach(result.purchase_order, function(val, key){
          var dat = {
            po:val.po_number,
            status:val.status,
            percentage:(val.status=='Draft' ? 20:val.status=='Waiting' ? 60:val.status=='Approved' ? 80:100)
          }
          $scope.purchase_order.push(dat);
        });
    });
});

app.controller('LandingPageChasierController', function($scope, $http, $filter) {
	$scope.transaction = [];
    $http.get('../../data/transaction_detail.json').success(function(trdtl_result){
	    $http.get('../../data/transaction.json').success(function(trans_result){
	    	angular.forEach(trans_result.transaction, function(val, key){
    			var dat = {
			      "transaction_id": val.transaction_id,
			      "category":val.category,
			      "total": val.total,
			      "transaction_date": val.transaction_date,
				  "transaction_detail":$filter('filter')(trdtl_result.transaction_detail, {transaction_detail_id:val.transaction_detail_id})[0]
    			}
    			$scope.transaction.push(dat);
	    	});
	    });
    });

    $scope.viewProduct = function(){
      $scope.list_product = [];
      $http.get('../../data/product.json').success(function(result){
        angular.forEach(result.product, function(val, key){
          var dat = {
            product_id:val.product_id,
            name:val.name,
            stock:val.qty,
            price:val.price,
            newstock:val.qty + 2,
            newprice:val.price * 2
          }
          $scope.list_product.push(dat);
        });
      });
    }
});
