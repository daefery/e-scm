app.controller('StockManagementController', function($scope, $http, $filter) {
  $scope.stockmngt = [];
  $http.get('../../data/supplier.json').success(function(sup_result){
    $http.get('../../data/product.json').success(function(prod_result){
      $http.get('../../data/inventory.json').success(function(inv_result) {
        angular.forEach(inv_result.inventory, function(val, key){
          var prod = $filter('filter')(prod_result.product, {product_id:val.product_id})[0];
          var sup = $filter('filter')(sup_result.supplier, {supplier_id:prod.supplier_id})[0];



          var dt = {
            "inventory_id": val.inventory_id,
            "product_id": prod.product_id,
            "item_name":prod.name,
            "description":prod.description,
            "type":prod.type,
            "price":prod.price,
            "cost":prod.cost,
            "status":(val.stock_hold <= prod.stock_min && val.stock_hold > 0 ? 'Low Stock':val.stock_hold <= 0 ? 'Out of Stock':'In Stock'),
            "product_id": val.product_id,
            "stock_hold":val.stock_hold,
            "stock_in":val.stock_in,
            "stock_out":val.stock_out,
            "lastupdate_date": val.lastupdate_date,
            "supplier":sup
          };
          $scope.stockmngt.push(dt);
        });
      });
    });
    $scope.page = 1;
    $scope.displayItems = $scope.stockmngt.slice(0, 10);
  });

  $scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 10;
	};

  $scope.viewDetail = function(data) {
    $scope.transaction = [];
    var total = $filter('filter')($scope.stockmngt, {product_id:data})[0].price;
    $http.get('../../data/transaction_detail.json').success(function(trdtl_result){
      var trdtl = angular.copy(trdtl_result.transaction_detail);
      angular.forEach(trdtl, function(val, key){
        var temp_prod = $filter('filter')(val.items, {product_id:data})[0];
        $http.get('../../data/transaction.json').success(function(tr_result){
          var tmp = $filter('filter')(tr_result.transaction, {transaction_detail_id:val.transaction_detail_id})[0];
          var tr_temp = {
            "category":tmp.category,
            "qty":temp_prod.qty,
            "total":total * temp_prod.qty,
            "transaction_date":tmp.transaction_date
          };
          $scope.transaction.push(tr_temp);
        });
      });
      $scope.page_detail = 1;
      $scope.displayItems = $scope.transaction.slice(0, 10);
    });
  }

  $scope.detailPageChanged = function() {
    var startPos = ($scope.page_detail - 1) * 10;
  };

  $scope.printDiv = function(divName) {
    var divToPrint=document.getElementById(divName);
     var newWin= window.open("");
     newWin.document.write(divToPrint.outerHTML);
     newWin.print();
     newWin.close();
  }
});
