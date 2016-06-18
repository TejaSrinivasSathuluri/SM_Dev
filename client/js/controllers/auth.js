// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
     
    $scope.login = function() {
      AuthService.login($scope.user.email, $scope.user.password)
        .then(function() {
          $state.go('console');
        });
    };
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state','$window',
      function($scope, AuthService, $state,$window) {
    AuthService.logout()
      .then(function() {
        $window.localStorage.clear();
        $state.go('home');
      },function(response){
        $window.localStorage.clear();
          $state.go('home');
          console.log(response.data.error.message);
        });
  }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.register = function() {
      AuthService.register($scope.user.email, $scope.user.password)
        .then(function() {
          $state.transitionTo('sign-up-success');
        });
    };
  }]);
