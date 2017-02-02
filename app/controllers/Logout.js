app.controller('LogoutController', function($scope){
  $scope.logout = function(){
		bootbox.confirm("Are you sure?", function(result) {
			if(result) {
				localStorage.removeItem("user_credential");
        		window.location.replace("/");
			}
		});
  }
});
