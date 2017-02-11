app.controller('MonitoringController', function($scope, $http, $filter){
  $scope.monitoring = [];
  $http.get('../../data/transaction.json').success(function(trans_result){
    angular.forEach(trans_result.transaction, function(val, key){
      var dat = {
        "transaction_id": val.transaction_id,
        "transaction_detail_id": val.transaction_detail_id,
        "category":val.category,
        "total": val.total,
        "transaction_date": val.transaction_date
      };
      $scope.monitoring.push(dat);
    });
  });

  $scope.viewDetailSelling = function(id){
    $scope.totalAmount = 0;
    $scope.totalDiscount = 0;
    $scope.totalBeforeDsc = 0;
    $scope.detail_transaction = [];
    $http.get('../../data/transaction_detail.json').success(function(dtl_result){
        $http.get('../../data/product.json').success(function(prod_result){

          var detail = $filter('filter')(dtl_result.transaction_detail, {transaction_detail_id:id})[0].items;
          angular.forEach(detail, function(val, key){
            var prod = $filter('filter')(prod_result.product, {product_id:val.product_id})[0];
            var total = 0;
      			if(prod.discount_status && val.qty >= prod.discount_qty_min){
      				var potongan = (prod.discount_rate/100)*(val.qty * prod.price);
      				total = (val.qty * prod.price) - potongan;
      				$scope.totalDiscount = $scope.totalDiscount + potongan;
      			}else{
      				total = val.qty * prod.price;
      			}
            var dat = {
              product:prod,
              qty:val.qty,
              total:val.qty * prod.price
            }
            $scope.detail_transaction.push(dat);
            $scope.totalAmount = $scope.totalAmount + total;
            $scope.totalBeforeDsc = $scope.totalBeforeDsc + (val.qty * prod.price);
        });
      });
    });
  }

  $scope.viewDetailRestock = function(){
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
                "status": val.status,
                "created_date": val.created_date
              };
              $scope.purchase_orders.push(dat);
            });
            $scope.page = 1;
            $scope.displayItems = $scope.purchase_orders.slice(0, 5);
        })
      });
    });
  }
});
