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
  }])
  .factory('AuthServiceStudent', ['Student','$q', '$rootScope', '$window','School',function(Student, $q,$rootScope,$window,School) {
  function login(email, password) {
    return User
      .login({email: email, password: password})
      .$promise
      .then(function(response) {
        $window.localStorage.setItem('user',JSON.stringify(response.user));
        var school = School.findById({id:response.user.schoolId},function(){
          $window.localStorage.setItem('school',JSON.stringify(response));

        });
      });
  }

  function logout() {
    return User
      .logout()
      .$promise
      .then(function() {
        $rootScope.currentUser = null;
        $rootScope.schoolName = null;
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
}])
  .factory('AuthServiceStaff',   ['Staff',  '$q', '$rootScope', '$window','School',function(Staff,   $q,$rootScope,$window,School) {
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
        $rootScope.schoolName = null;
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
}])
  .factory('AuthServiceParent',  ['Parent', '$q', '$rootScope', '$window','School',function(Parent,  $q,$rootScope,$window,School) {
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

  function logout() {
    return User
      .logout()
      .$promise
      .then(function() {
        $rootScope.currentUser = null;
        $rootScope.schoolName = null;
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
