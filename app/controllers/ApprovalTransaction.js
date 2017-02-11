app.controller('ApprovalTransactionController', function($scope, $http, $filter){
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
          $scope.page = 1;
          $scope.displayItems = $scope.purchase_orders.slice(0, 5);
      })
    });
  });

	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 10;
	};

  $scope.viewDetail = function(data) {
    $scope.products = [];
    $http.get('../../data/product.json').success(function(product_result){
      var product = angular.copy(product_result.product);
      angular.forEach(product, function(val, key){
        var dat = {
          "product_name":val.name,
          "type":val.type,
          "description":val.description,
          "price":val.price,
          "cost":val.cost
        };
        $scope.products.push(dat);
      });
      $scope.page_detail = 1;
      $scope.displayItems = $scope.products.slice(0, 10);
    });
  }

  $scope.approval = function(data){
    bootbox.confirm("Are you sure to give approval?", function(result) {
      if(result) {
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, approval given successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.purchase_orders[data].status = 'Approved';
        $scope.$apply();
      }
    });
  }

  $scope.reject = function(data){
    bootbox.confirm("Are sure to reject request?", function(result) {
      if(result) {
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, request rejected successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.purchase_orders[data].status = 'Rejected';
        $scope.$apply();
      }
    });
  }
});
