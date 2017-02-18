app.controller('SupplierController', function($scope, $http) {
  $scope.sf = undefined;
  $scope.suppliers = {};
  $scope.isForm = false;
  $http.get('../../data/supplier.json').success(function(result){
    $scope.page = 1;
    $scope.suppliers = angular.copy(result.supplier);
    $scope.displayItems = $scope.suppliers.slice(0, 10);
  });

	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 10;
	  console.log($scope.page);
	};

  $scope.actionSupplier = function(type, data){
    switch (type) {
      case 'create':
          $scope.isForm = true;
          $scope.sf = undefined;
        break;
      case 'edit':
          $scope.isForm = true;
          $scope.sf = data;
          $scope.sf.type = 'edit';
        break;
      case 'cancel':
          $scope.isForm = false;
          $scope.sf = undefined;
        break;
      case 'delete':
      bootbox.confirm("Are you sure?", function(result) {
          if(result) {
            var pr = angular.copy($scope.suppliers);
            angular.forEach(pr, function(val, key){
              console.log(val);
              var index = $scope.suppliers.indexOf(val)
              $scope.suppliers.splice(index,1);
            });

            $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, supplier deleted successfully.',
                class_name: 'gritter-success gritter-center'
              });
            $scope.$apply();
          }
        });
      break;
    }
  }

  $scope.saveSupplier = function(type, data){
    switch (type) {
      case 'create':
        var param = {
          supplier_id:6,
          name:data.name,
          description:data.description,
          address:data.address,
          phone:data.phone,
          created_date:"10/10/2016"
        }
        $scope.suppliers.push(param);
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, supplier created successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
        break;
      case 'edit':
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, supplier updated successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
        break;
      case 'delete':
        bootbox.confirm("Are you sure?", function(result) {
          if(result) {
              var index = $scope.suppliers.indexOf(data)
              $scope.suppliers.splice(index,1);
              $scope.$apply();
              $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, supplier deleted successfully.',
                class_name: 'gritter-success gritter-center'
              });
            }
        });
        break;
    }
  }
});
