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
          });
      }
      else if (T == 'S')
      {
        AuthServiceStudent.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          });
      }
      else if (T == 'ST')
      {
        AuthServiceStaff.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          });
      }
      else if (T == 'P')
      {
        AuthServiceParent.login($scope.user.email, $scope.user.password)
          .then(function () {
            $state.go('dashboard');
          });
      }

    };
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthServiceAdmin', '$state','$window',
      function($scope, AuthServiceAdmin, $state,$window) {
        AuthServiceAdmin.logout()
      .then(function() {
        $window.localStorage.clear();
        $state.go('login');
      },function(response){
        $window.localStorage.clear();
          $state.go('login');
          console.log(response.data.error.message);
        });
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthServiceStudent', '$state','$window',
      function($scope, AuthServiceStudent, $state,$window) {
        AuthServiceStudent.logout()
      .then(function() {
        $window.localStorage.clear();
        $state.go('login');
      },function(response){
        $window.localStorage.clear();
          $state.go('login');
          console.log(response.data.error.message);
        });
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthServiceParent', '$state','$window',
      function($scope, AuthServiceParent, $state,$window) {
        AuthServiceParent.logout()
      .then(function() {
        $window.localStorage.clear();
        $state.go('login');
      },function(response){
        $window.localStorage.clear();
          $state.go('login');
          console.log(response.data.error.message);
        });
  }]).controller('AuthLogoutController', ['$scope', 'AuthServiceStaff', '$state','$window',
      function($scope, AuthServiceStaff, $state,$window) {
        AuthServiceStaff.logout()
      .then(function() {
        $window.localStorage.clear();
        $state.go('login');
      },function(response){
        $window.localStorage.clear();
          $state.go('login');
          console.log(response.data.error.message);
        });
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
