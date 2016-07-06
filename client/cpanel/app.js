/*** Created by Mansoor on 6/9/2016.*/

//angular.module('formApp', [ 'ui.router', 'lbServices'])

// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices'])


  .controller('formController',function($scope,$window,Admin)
  {
      $scope.formData ={ email:"priya@study.com",password:"123"};
      $scope.formData.errmsg='';
    $scope.Admin = false;

    $scope.processForm = function()
      {
        $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
        Admin.login($scope.credentials,function (response) {
            $window.localStorage.setItem('user',JSON.stringify(response.user));
  window.location= '/cpanel/index.html'
            $scope.Admin = true;
        },
          function (response) { $scope.formData.errmsg=response.data.error.message;}
        );
      }

  })

  .run(['$rootScope', '$state','$window',function($rootScope, $state,$window) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in

      if (!$window.localStorage.getItem('user')) {
        if (next.authenticate && !$rootScope.currentUser) {
          event.preventDefault(); //prevent current page from loading
          $rootScope.currentUser = null;
          $rootScope.schoolName = null;
          $window.localStorage.clear();
          $state.go('/');
        }
      }
      $rootScope.currentUser = $window.localStorage.getItem('user');
    });
  }]);





