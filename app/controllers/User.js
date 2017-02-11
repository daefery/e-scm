app.controller('UserController', function($scope, $http, $filter){
  $scope.formerror = false;
  $scope.us = undefined;
  $scope.isForm = false;
  $scope.users = [];
  $http.get('../../data/user.json').success(function(result){
    angular.forEach(result.user, function(val, key){
      var dat = {
        user_id:val.user_id,
        username:val.username,
        type:val.type,
        created_date:val.created_date
      }
      $scope.users.push(dat);
    });
  });

  $scope.actionUser = function(type, data){
    switch (type) {
      case 'create':
          $scope.isForm = true;
          $scope.us = undefined;
        break;
      case 'edit':
          $scope.isForm = true;
          $scope.us = data;
          $scope.us.formtype = 'edit';
        break;
      case 'cancel':
          $scope.isForm = false;
          $scope.us = undefined;
        break;
      case 'delete':
      bootbox.confirm("Are you sure?", function(result) {
          if(result) {
            var pr = angular.copy($scope.users);
            angular.forEach(pr, function(val, key){
              var index = $scope.users.indexOf(val)
              $scope.users.splice(index,1);
            });

            $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, user deleted successfully.',
                class_name: 'gritter-success gritter-center'
              });
            $scope.$apply();
          }
        });
      break;
    }
  }

  $scope.saveUser = function(type, data){
    $scope.formerror = false;
    switch (type) {
      case 'create':
      if(data.password != data.re_password){
        $scope.formerror = true;
        $scope.msg_text = "password doesn't match, please check your input.";
      }else {
        var param = {
          user_id:4,
          username:data.username,
          password:data.password,
          type:data.type,
          created_date:"10/10/2016"
        }
        $scope.users.push(param);
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, user created successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
      }
        break;
      case 'edit':
        $.gritter.add({
          title: 'Success Message',
          text: 'Congratulation, user updated successfully.',
          class_name: 'gritter-success gritter-center'
        });
        $scope.isForm = false;
        break;
      case 'delete':
        bootbox.confirm("Are you sure?", function(result) {
          if(result) {
              var index = $scope.users.indexOf(data)
              $scope.users.splice(index,1);
              $scope.$apply();
              $.gritter.add({
                title: 'Success Message',
                text: 'Congratulation, user deleted successfully.',
                class_name: 'gritter-success gritter-center'
              });
            }
        });
        break;
    }
  }
});
