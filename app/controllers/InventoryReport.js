app.controller('InventoryReportController', function($scope, $http, $filter){
  $scope.invreport = [];
  $http.get('../../data/supplier.json').success(function(sup_result){
    $http.get('../../data/product.json').success(function(prod_result){
      angular.forEach(prod_result.product, function(value, key){
        var temp_prod = {
          'product_id':value.product_id,
          'name':value.name,
          'description':value.description,
          'type':value.type,
          'price':value.price,
          'cost':value.cost,
          'update_date':value.lastupdate_date,
          'supplier':$filter('filter')(sup_result.supplier, {supplier_id:value.supplier_id})[0],
          'transaction':{
            'purchase':{
              'avg_price':135000,
              'amount_paid':100000,
              'total':135000+100000
            },
            'sales':{
              'no_sold':8,
              'sold':9,
              'waste':0,
              'loss_price':10000,
              'income_at':25000000
            }
          }
        }
        $scope.invreport.push(temp_prod);
      });
    });
    $scope.page = 1;
    $scope.displayItems = $scope.invreport.slice(0, 10);
  });

  $scope.viewDetail = function(dat){
		$('#detail-'+dat).toggleClass('open');
    $('#detail-btn-'+dat+' .ace-icon').toggleClass('fa-search-plus').toggleClass('fa-search-minus');
  }
  $scope.printDiv = function(divName) {
    var divToPrint=document.getElementById(divName);
     var newWin= window.open("");
     newWin.document.write(divToPrint.outerHTML);
     newWin.print();
     newWin.close();
  }
});
