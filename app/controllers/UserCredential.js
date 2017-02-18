app_login.controller('LoginController', function($scope, $http, $filter) {
  $scope.log = {};
  $scope.error = true;

  $scope.dologin = function(uname, pass){
  	if(uname && pass){
      $http.get('../../data/user.json')
        .success(function(data) {
          var user = $filter('filter')(data.user, { username: uname, password:pass });
          if(user.length > 0){
            if(user[0].password == pass){
              var user_credential = {
                  username:user[0].username,
                  type:user[0].type
              }
              localStorage.setItem('user_credential', JSON.stringify(user_credential));
              window.location.replace("/main");
            }else{
              $scope.error = false;
              $scope.msg_text = 'username or password incorect.';
            }
          }else{
            $scope.error = false;
            $scope.msg_text = 'username or password incorect.';
          }
      });
  	}else{
      $scope.error = false;
  		$scope.msg_text = 'login form is required.';
  	}
  }
});
