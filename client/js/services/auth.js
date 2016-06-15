// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .factory('AuthService', ['Admin', '$q', '$rootScope', '$window','School',function(User, $q,$rootScope,$window,School) {
    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            user : response.user
          };
          $window.localStorage.setItem('user',JSON.stringify(response.user));
          var school = School.findById({id:response.user.schoolId},function(){
            $rootScope.schoolName = school.schoolName;});
        });
    }

    function logout() {
      return User
        .logout()
        .$promise
        .then(function() {
          $rootScope.currentUser = null;
          $window.localStorage.clear();
        });
    }

    function register(email, password) {
      return User
        .create({
          email: email,
          password: password
        })
        .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);
