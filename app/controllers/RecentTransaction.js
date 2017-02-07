app.controller('RecentTransactionController', function($scope, $http, $filter){
  $scope.rectrans = {};
  $http.get('../../data/transaction.json').success(function(trans_result){
    $scope.rectrans = trans_result.transaction;
  });

  $scope.viewDetail = function(id){
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

  $scope.closeTransaction = function(){
    bootbox.confirm("Are you sure?", function(result) {
  		if(result){
  			$.gritter.add({
  					title: 'Success Message',
  					text: 'Congratulation, the transaction is close today.',
  					class_name: 'gritter-success gritter-center'
  				});
          $scope.rectrans = undefined;
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
