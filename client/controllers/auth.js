// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')

  .controller('AuthLoginController', ['$scope', 'AuthServiceAdmin','AuthServiceStudent','AuthServiceStaff','AuthServiceParent', '$state',
      function($scope, AuthServiceAdmin,AuthServiceStudent,AuthServiceStaff,AuthServiceParent, $state) {
    $scope.login = function(T) {
      if (T == 'A') {
        AuthServiceAdmin.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          },function(response){
			  			  $scope.invalidLogin = true;
		  }
		  );
      }
      else if (T == 'S')
      {
        AuthServiceStudent.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          },function(){
			  $scope.invalidLogin = true;
		  });
      }
      else if (T == 'ST')
      {
        AuthServiceStaff.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          },function(){
			  $scope.invalidLogin = true;
		  });
      }
      else if (T == 'P')
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

  .controller('AuthLogoutController', ['$scope', 'AuthServiceAdmin', '$state',
      function($scope, AuthServiceAdmin, $state) {
        AuthServiceAdmin.logout()
      .then(function() { $state.go('login');},
            function() { $state.go('login');}
      );
  }])

  //.controller('SignUpController', ['$scope', 'AuthServiceParent', '$state',
  //  function($scope, AuthService, $state) {
  //    $scope.user = {
  //      email: 'baz@qux.com',
  //      password: 'bazqux'
  //    };
  //
  //    $scope.register = function() {
  //      AuthService.register($scope.user.email, $scope.user.password)
  //        .then(function(response) {
  //          AuthService.link($scope.user.email, response.id);
  //
  //          $state.transitionTo('login');
  //        },function(response){
  //          console.log(response.data.error.message);
  //        });
  //    };
  //  }])
;
