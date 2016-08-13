// Copyright Study Monitor. 2016. All Rights Reserved.
// Node module: Study Monitor

angular
  .module('app')
  .factory('AuthServiceAdmin',   ['Admin',  '$q', '$rootScope', '$window','School',function(User,   $q,$rootScope,$window,School) {
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
          console.log('Admin Logged In');
          $window.localStorage.setItem('user',JSON.stringify(response.user));
          var school = School.findById({id:response.user.schoolId},function(response){
            $window.localStorage.setItem('school',JSON.stringify(response));
          });
        });
    }

     function logout() {
      return User
        .logout()
        .$promise
        .then(function() {
          console.log('Admin Logged Out');
          $rootScope.currentUser = null;
          $window.localStorage.clear();
        }, function (response) {
          $rootScope.currentUser = null;
          $window.localStorage.clear();
          console.log('Admin ' + response.data.error.message);
        });
    }    return {
      login: login,
      logout:logout    
    };
  }])
  .factory('AuthServiceStudent', ['Student','$q', '$rootScope', '$window','School',function(User, $q,$rootScope,$window,School) {
  function login(email, password) {
    return User
      .login({email: email, password: password})
      .$promise
      .then(function(response) {
        $window.localStorage.setItem('user',JSON.stringify(response.user));
        var school = School.findById({id:response.user.schoolId},function(response){
         
          $window.localStorage.setItem('school',JSON.stringify(response));

        });
      });
  }

  return {
    login: login
  };
}])
  .factory('AuthServiceStaff',   ['Staff',  '$q', '$rootScope', '$window','School',function(User,   $q,$rootScope,$window,School) {
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

  return {
    login: login
  };
}])
  .factory('AuthServiceParent',  ['Parent', '$q', '$rootScope', '$window','School',function(User,  $q,$rootScope,$window,School) {
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
      });
  }

  return {
    login: login
  };
}]);
