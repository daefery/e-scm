app.controller('PurchaseOrderController', function($scope, $http) {
  $scope.po = undefined;
  $scope.purchase_orders = [];
  $scope.suppliers = {};
  $scope.isForm = false;
  $http.get('../../data/supplier.json').success(function(result_sup){
    $scope.supplier = angular.copy(result_sup.supplier);
    $http.get('../../data/purchase_order.json').success(function(result){
      angular.forEach(result.purchase_order, function(val, key){
        var p = $filter('filter')($scope.supplier, {supplier_id:val.supplier_id})[0];
        var dat = {
          "po_id": val.po_id,
          "detail_id": val.detail_id,
          "supplier_id": p.id,
          "user_id": val.user_id,
          "po_number": val.po_number,
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

    });
  });

	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 10;
	  console.log($scope.page);
	};

  $scope.actionPurchaseOrder = function(type, data){
    switch (type) {
      case 'create':
          $scope.isForm = true;
          $scope.po = undefined;
        break;
      case 'edit':
          $scope.isForm = true;
          $scope.po = data;
          $scope.po.type = 'edit';
        break;
      case 'cancel':
          $scope.isForm = false;
          $scope.po = undefined;
        break;
      case 'delete':
      bootbox.confirm("Are you sure?", function(result) {
          if(result) {
            var pr = angular.copy($scope.purchase_orders);
            angular.forEach(pr, function(val, key){
              console.log(val);
              var index = $scope.purchase_orders.indexOf(val)
              $scope.purchase_orders.splice(index,1);
            });

            $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, purchase order deleted succespoully.',
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
          supplier_id:data.supplier_id,
          user_id:data.user_id,
          po_number:data.po_number,
          shipping_address: data.shipping_address,
          billing_address: data.billing_address,
          shipping_date: data.shipping_date,
          status: data.status,
          created_date: data.created_date
        }
        $scope.purchase_orders.push(param);
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, purchase order created succespoully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
        break;
      case 'edit':
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, purchase order updated succespoully.',
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
                text: 'Congratulation, purchase order deleted succespoully.',
                class_name: 'gritter-success gritter-center'
              });
            }
        });
        break;
    }
  }
});
