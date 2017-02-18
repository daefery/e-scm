app.controller('AuditTrailController', function($scope, $http, $filter) {
  $scope.AuditTrail = [];
	$http.get('../../data/audit_trail.json').success(function(audit_result){
    $http.get('../../data/user.json').success(function(user_result){
      angular.forEach(audit_result.audit_trail, function(val, key){
        var dat = {
          "id": val.id,
          "user": $filter('filter')(user_result.user, {user_id:val.user_id})[0].username,
          "event_type": val.event_type,
          "description": val.description,
          "created_date": val.created_date
        };
        $scope.AuditTrail.push(dat);
      });
    });
  });
});
