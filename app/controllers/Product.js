app.controller('ProductController', function($scope, $http) {
  $scope.pf = undefined;
  $scope.products = {};
  $scope.isForm = false;
  $http.get('../../data/product.json').success(function(result){
    $scope.page = 1;
    $scope.products = angular.copy(result.product);
    $scope.displayItems = $scope.products.slice(0, 10);
  });

	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 10;
	  console.log($scope.page);
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
              console.log(val);
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
          product_id:6,
          name:data.name,
          description:data.description,
          price:data.price,
          stock:data.stock,
          cost:data.cost,
          discount_status:(data.discount_status!=undefined?data.discount_status:false),
          discount_qty:(data.discount_qty!=undefined?data.discount_qty:0),
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
