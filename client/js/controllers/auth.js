
angular
  .module('app')

  .controller('AuthLoginController', ['$scope', 'AuthServiceAdmin','AuthServiceStudent','AuthServiceStaff','AuthServiceParent', '$state',
      function($scope, AuthServiceAdmin,AuthServiceStudent,AuthServiceStaff,AuthServiceParent, $state) {
    $scope.loginUser = 'Admin';
    $scope.login = function() 
    {
      $scope.user.email = $scope.user.email.toLowerCase();
      if ($scope.loginUser == 'Admin') {
        AuthServiceAdmin.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          },function(){
			  			  $scope.invalidLogin = true;
		  }
		  );
      }
      else if ($scope.loginUser == 'Student')
      {
        AuthServiceStudent.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          },function(){
			  $scope.invalidLogin = true;
		  });
      }
      else if ($scope.loginUser == 'Staff')
      {
        AuthServiceStaff.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          },function(){
			  $scope.invalidLogin = true;
		  });
      }
      else if ($scope.loginUser == 'Parent')
      {
        AuthServiceParent.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          },function(){
			  $scope.invalidLogin = true;
		  });
      }

    };
  }])

  .controller('AuthLogoutController', function($scope, AuthServiceAdmin, $state) {
        AuthServiceAdmin.logout()
      .then(function() { $state.go('login');},
            function() { $state.go('login');}
      );
  })




  .controller('SignUpController', function($scope,$state) {
    
     $scope.register = function() {
       
       console.log($scope.user);

     };
   })
;
