app_login.controller('LoginController', function($scope) {
  $scope.log = {};
  $scope.error = true;

  $scope.dologin = function(uname, pass){
    // console.log(uname, pass);
  	if(uname && pass){
  		var valid = true;
      var user_type = '';
      switch(uname){
  			case 'chasier':
          user_type = 'csr';
  				if(pass != 'csr123')
  					valid = false;
  				break;
  			case 'inventory':
          user_type = 'inv';
  				if(pass != 'inv123')
  					valid = false;
  				break;
  			case 'admin':
          user_type = 'admin';
  				if(pass != 'admin123')
  					valid = false;
  				break;
  			default : valid = false;
  		}
  		if(valid){
        var user_credential = {
            username:uname,
            type:user_type
        }
        localStorage.setItem('user_credential', JSON.stringify(user_credential));
  			window.location.replace("http://e-scm.localdev.info/main");
  		}else{
        $scope.error = valid;
        $scope.msg_text = 'username or password incorect.';
  		}
  	}else{
      $scope.error = false;
  		$scope.msg_text = 'login form is required.';
  	}
  }
});
