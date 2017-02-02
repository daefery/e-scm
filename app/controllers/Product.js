app.filter('custom', function() {
  return function(input, search) {

    if (!input) return input;
    if (!search) return input;
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
      var actual = ('' + value).toLowerCase();
      if (actual.indexOf(expected) !== -1) {
        result[key] = value;
      }
    });
    return result;
  }
});
app.controller('ProductController', function($scope, $http) {
  $scope.pf = {};
  $scope.products = {};
  $scope.isForm = false;
  $http.get('../../data/product.json').success(function(result){
    $scope.page = 1;
    $scope.products = angular.copy(result.product);
    $scope.displayItems = $scope.products.slice(0, 10);
  });

	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 10;
	  //$scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
	  console.log($scope.page);
	};
  $scope.actionProduct = function(type){
    switch (type) {
      case 'create':
          $scope.isForm = true;
        break;
      case 'edit':
          $scope.isForm = true;
      case 'cancel':
          $scope.isForm = false;
          $scope.pf = {};
        break;
    }
  }

  $scope.saveProduct = function(type, data){
    switch (type) {
      case 'create':
        console.log(data);
        break;
      // default:
      // console.log(data);
    }
  }
  // $scope.createProduct = function() {
  //   var form = "<div class=\"row\"><div class=\"col-xs-12\">"+
  // 		"<div class=\"widget-box\">"+
  // 			"<div class=\"widget-header\">"+
  // 				"<h4 class=\"widget-title\">Text Area</h4>"+
  // 			"</div>"+
  // 			"<div class=\"widget-body\">"+
  // 				"<div class=\"widget-main\">"+
  // 					"<div>"+
  // 						"<label for=\"form-field-8\">Default</label>"+
  // 						"<textarea class=\"form-control\" id=\"form-field-8\" placeholder=\"Default Text\"/>"+
  // 					"</div>"+
  // 					"<hr />"+
  // 					"<div>"+
  // 						"<label for=\"form-field-9\">With Character Limit</label>"+
  // 						"<textarea class=\"form-control limited\" id=\"form-field-9\" maxlength=\"50\"/>"+
  // 					"</div>"+
  // 					"<hr />"+
  // 					"<div>"+
  // 						"<label for=\"form-field-11\">Autosize</label>"+
  // 						"<textarea id=\"form-field-11\" class=\"autosize-transition form-control\"/>"+
  // 					"</div>"+
  //           "<div>"+
  // 						"<label for=\"form-field-11\">Autosize</label>"+
  // 						"<textarea id=\"form-field-11\" class=\"autosize-transition form-control\"/>"+
  // 					"</div>"+
  //           "<div>"+
  // 						"<label for=\"form-field-11\">Autosize</label>"+
  // 						"<textarea id=\"form-field-11\" class=\"autosize-transition form-control\"/>"+
  // 					"</div>"+
  //           "<div>"+
  // 						"<label for=\"form-field-11\">Autosize</label>"+
  // 						"<textarea id=\"form-field-11\" class=\"autosize-transition form-control\"/>"+
  // 					"</div>"+
  //           "<div>"+
  // 						"<label for=\"form-field-11\">Autosize</label>"+
  // 						"<textarea id=\"form-field-11\" class=\"autosize-transition form-control\"/>"+
  // 					"</div>"+
  // 				"</div>"+
  // 			"</div>"+
  // 		"</div>"+
  // 	"</div></div>"+
  //   "</div>";
	// 	bootbox.dialog({
  //     title: 'Create New Product',
	// 		message: form,
	// 		buttons:
	// 		{
	// 			"success" :
	// 			 {
	// 				"label" : "<i class='ace-icon fa fa-check'></i> Success!",
	// 				"className" : "btn-sm btn-success",
	// 				"callback": function() {
	// 					//Example.show("great success");
	// 				}
	// 			},
	// 			"danger" :
	// 			{
	// 				"label" : "Danger!",
	// 				"className" : "btn-sm btn-danger",
	// 				"callback": function() {
	// 					//Example.show("uh oh, look out!");
	// 				}
	// 			},
  //     }
	// 	});
  // }
});
