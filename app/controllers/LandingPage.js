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

app.controller('LandingPageAdminController', function($scope, $http, $filter) {
  $scope.purchase_orders = [];
  $http.get('../../data/supplier.json').success(function(result_sup){
    $scope.supplier = angular.copy(result_sup.supplier);
      $http.get('../data/product.json').success(function(result_prod){
        $scope.product = angular.copy(result_prod.product);
        $http.get('../../data/purchase_order.json').success(function(result){
          angular.forEach(result.purchase_order, function(val, key){
            var prod = $filter('filter')($scope.product, {product_id: val.product_id})[0];
            var p = $filter('filter')($scope.supplier, {supplier_id:val.supplier_id})[0];
            var dat = {
              "supplier_id":p.supplier_id,
              "po_number": val.po_number,
              "product_name": prod.name,
              "supplier_name": p.name,
              "shipping_address": val.shipping_address,
              "billing_address": val.billing_address,
              "shipping_date": val.shipping_date,
              "status": 'Draft',
              "created_date": val.created_date
            };
            $scope.purchase_orders.push(dat);
          });
      });
    });
  });

    $scope.AuditTrail = [];
  	$http.get('../../data/audit_trail.json').success(function(audit_result){
      $http.get('../../data/user.json').success(function(user_result){
        angular.forEach(audit_result.audit_trail, function(val, key){
          var dat = {
            "id": val.id,
            "user": $filter('filter')(user_result.user, {user_id:val.user_id})[0].username,
            "event_type": val.event_type,
            "description": val.description,
            "created_date": val.created_date
          };
          $scope.AuditTrail.push(dat);
        });
      });
    });
});
