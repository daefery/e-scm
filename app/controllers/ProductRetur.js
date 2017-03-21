app.controller('ProductReturController', function($scope, $http, $filter) {
	$scope.newentry = [];
	$scope.totalAmount = 0;
	$scope.totalBeforeDsc = 0;
	$scope.totalDiscount = 0;
	$scope.ne = {};
	$scope.ne.qty = 1;
	$scope.checked =true;
	$scope.trx = {};
	$scope.trx.option = 0;

	$scope.getRandomInt = function(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	$scope.addNewEntry = function(type, data){

		$http.get('../../data/product.json').success(function(result){
			var prod = {};
			var total = 0;

			if(type == 'auto'){
				var i = $scope.getRandomInt(0, result.product.length-1);
				prod = result.product[i];
			}else{
				prod = $filter('filter')(result.product, {product_id:data.code})[0];
			}

			if(prod.discount_status && data.qty >= prod.discount_qty_min){
				var potongan = (prod.discount_rate/100)*(data.qty * prod.price);
				total = (data.qty * prod.price) - potongan;
				$scope.totalDiscount = $scope.totalDiscount + potongan;
			}else{
				total = data.qty * prod.price;
			}
			var toAdd = {
				product_id:prod.product_id,
				name:prod.name,
				price:prod.price,
				discount_status:prod.discount_status,
				discount_min:prod.discount_qty_min,
				qty:data.qty,
				discount_rate:prod.discount_rate,
				expired_date:(prod.expired_status?prod.expired_date:'-'),
				total: total
			};
			$scope.newentry.push(toAdd);
			$scope.totalAmount = $scope.totalAmount + total;
			$scope.totalBeforeDsc = $scope.totalBeforeDsc + (data.qty * prod.price);
		});
		$scope.ne = {};
		$scope.ne.qty = 1;
	}

	$scope.clearEntry = function(){
		var newEntry = angular.copy($scope.newentry);
		bootbox.confirm("Are you sure?", function(result) {
			if(result){
				angular.forEach(newEntry, function(val, key){
					var index = $scope.newentry.indexOf(val);
      		$scope.newentry.splice(index,1);
				});
				$scope.$apply();
			}
		});
	}

$scope.actionProduct = function(type, data){
	switch (type) {
		case 'edit':
			var dat = $scope.newentry[data];
			$scope.ne.qty = dat.qty;
			$scope.ne.code = dat.product_id;
			break;
		default:
		$scope.newentry.splice(data,1);
	}
}

$scope.onSave = function(){
	bootbox.confirm("Are you sure?", function(result) {
		if(result){
			$.gritter.add({
					title: 'Success Message',
					text: 'Congratulation, transaction saved successfully.',
					class_name: 'gritter-success gritter-center'
				});
				$scope.newentry = [];
				$scope.totalAmount = 0;
				$scope.totalBeforeDsc = 0;
				$scope.totalDiscount = 0;
				$scope.ne = {};
				$scope.ne.qty = 1;
				$scope.$apply();
		}
	});
}

$scope.onPrint = function(){
	var divToPrint=document.getElementById('simple-table');
	var newWin= window.open("");
	newWin.document.write(divToPrint.outerHTML);
	newWin.print();
	newWin.close();
}

});
