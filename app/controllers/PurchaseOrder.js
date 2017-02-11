app.controller('PurchaseOrderController', function($scope, $http, $filter) {
  $scope.po = {};
  $scope.purchase_orders = [];
  $scope.supplier = {};
  $scope.isForm = false;
  $scope.isProduct = false;
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

	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 10;
	  console.log($scope.page);
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

  $scope.showProduct = function(id){
    $scope.isProduct = true;
    $scope.listRestock = [];
    $http.get('../../data/product.json').success(function(product_result){
      var prod = $filter('filter')(product_result.product, {supplier_id: id});
      angular.forEach(prod, function(val, key){
        var dat =
          {
            "product_id": val.product_id,
            "name": val.name,
            "cost": val.cost,
            "status":'Low Stock'
          };
          $scope.listRestock.push(dat);
      });
    });
  }


  $scope.actionPurchaseOrder = function(type, data){
    switch (type) {
      case 'create':
          $scope.isForm = true;
          $scope.po.po_number = 'PO-'+Math.floor(Math.random()*900000) + 100000;
        break;
      case 'edit':
          $scope.isForm = true;
          $scope.po = data;
          $scope.po.type = 'edit';
          $scope.showProduct(data.supplier_id);
        break;
      case 'cancel':
          $scope.isForm = false;
          $scope.po = {};
        break;
      case 'delete':
      bootbox.confirm("Are you sure?", function(result) {
          if(result) {
            var pr = angular.copy($scope.purchase_orders);
            angular.forEach(pr, function(val, key){
              var index = $scope.purchase_orders.indexOf(val)
              $scope.purchase_orders.splice(index,1);
            });

            $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, purchase order deleted successfully.',
                class_name: 'gritter-success gritter-center'
              });
            $scope.$apply();
          }
        });
      break;
    }
  }

  $scope.savePurchaseOrder = function(type, data){
    switch (type) {
      case 'create':
        var param = {
          po_id:6,
          detail_id:data.detail_id,
          supplier_name:data.supplier_name,
          user_id:data.user_id,
          po_number:data.po_number,
          shipping_address: data.shipping_address,
          billing_address: data.billing_address,
          shipping_date: data.shipping_date,
          status: 'Draft',
          created_date: '10/09/2016'
        }
        $scope.purchase_orders.push(param);
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, purchase order created successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
        break;
      case 'edit':
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, purchase order updated successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
        break;
      case 'delete':
        bootbox.confirm("Are you sure?", function(result) {
          if(result) {
              var index = $scope.purchase_orders.indexOf(data)
              $scope.purchase_orders.splice(index,1);
              $scope.$apply();
              $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, purchase order deleted successfully.',
                class_name: 'gritter-success gritter-center'
              });
            }
        });
        break;
    }
  }

  $scope.sendRequest = function(data){
    bootbox.confirm("Want to send request?", function(result) {
      if(result) {
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, request sent successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.purchase_orders[data].status = 'Waiting';
        $scope.$apply();
      }
    });
  }
});
