app.controller('ProductController', function($scope, $http, $filter) {
  $scope.pf = undefined;
  $scope.products = [];
  $scope.supplier = {};
  $scope.isForm = false;
  $http.get('../../data/supplier.json').success(function(result_sup){
    $scope.supplier = angular.copy(result_sup.supplier);
    $http.get('../../data/product.json').success(function(result){
      angular.forEach(result.product, function(val, key){
        var p = $filter('filter')($scope.supplier, {supplier_id:val.supplier_id})[0];
        var dat = {
          "product_id": val.product_id,
          "supplier_name": p.name,
          "inventory_id": val.inventory_id,
          "name": val.name,
          "type":val.type,
          "description": val.description,
          "price":val.price,
          "qty": val.qty,
          "stock_min": val.stock_min,
          "cost": val.cost,
          "discount_status": val.discount_status,
          "discount_qty_min": val.discount_qty_min,
          "discount_rate": val.discount_rate,
          "expired_status": val.expired_status,
          "expired_date": val.expired_date,
          "created_date": val.created_date
        };
        $scope.products.push(dat);
      });
      $scope.page = 1;
      $scope.displayItems = $scope.products.slice(0, 10);

    });
  });

	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 10;
	};

  $scope.actionProduct = function(type, data){
    switch (type) {
      case 'create':
          $scope.isForm = true;
          $scope.pf = undefined;
        break;
      case 'edit':
          $scope.isForm = true;
          $scope.pf = data;
          $scope.pf.act = 'edit';
        break;
      case 'cancel':
          $scope.isForm = false;
          $scope.pf = undefined;
        break;
      case 'delete':
      bootbox.confirm("Are you sure?", function(result) {
          if(result) {
            var pr = angular.copy($scope.products);
            angular.forEach(pr, function(val, key){
              var index = $scope.products.indexOf(val)
              $scope.products.splice(index,1);
            });

            $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, product deleted successfully.',
                class_name: 'gritter-success gritter-center'
              });
            $scope.$apply();
          }
        });
      break;
    }
  }

  $scope.saveProduct = function(type, data){
    switch (type) {
      case 'create':
        var param = {
          product_id:6234333,
          supplier_name:data.supplier_name,
          name:data.name,
          type:data.type,
          description:data.description,
          price:data.price,
          qty:data.qty,
          stock_min:data.stock_min,
          cost:data.cost,
          discount_status:(data.discount_status!=undefined?data.discount_status:false),
          discount_qty_min:(data.discount_qty_min!=undefined?data.discount_qty_min:0),
          discount_rate:(data.discount_rate!=undefined?data.discount_rate:0),
          expired_status:(data.expired_status!=undefined?data.expired_status:false),
          expired_date:(data.expired_date!=undefined?data.expired_date:""),
          created_date:"10/10/2016"
        }
        $scope.products.push(param);
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, product created successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
        break;
      case 'edit':
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, product updated successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
        break;
      case 'delete':
        bootbox.confirm("Are you sure?", function(result) {
          if(result) {
              var index = $scope.products.indexOf(data)
              $scope.products.splice(index,1);
              $scope.$apply();
              $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, product deleted successfully.',
                class_name: 'gritter-success gritter-center'
              });
            }
        });
        break;
    }
  }
});
