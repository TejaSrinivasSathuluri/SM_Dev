// Copyright Study Monitor. 2016. All Rights Reserved.
// Node module: Study Monitor

angular
  .module('app')
  .factory('AuthServiceAdmin',   ['Admin',  '$q', '$rootScope', '$window','School','$state',
  function(User,   $q,$rootScope,$window,School,$state) {
    function login(email, password) {
      return User
        .login({email: email.toLowerCase(), password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            user : response.user
          };
          console.log(response);
          console.log('Admin Logged In');
          $window.localStorage.setItem('user',JSON.stringify(response.user));
          var school = School.findById({id:response.user.schoolId},function(response){
            $window.localStorage.setItem('school',JSON.stringify(response));
            $state.go('dashboard');
            
          });

        });
    }

     function logout() {
      return User
        .logout()
        .$promise
        .then(function() {
          console.log('Admin Logged Out');
          for (var prop in $rootScope) {
           if (prop.substring(0,1) !== '$') {
              delete $rootScope[prop];
             }
}
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
  .factory('AuthServiceStudent', ['Student','$q', '$rootScope', '$window','School','$state',function(User, $q,$rootScope,$window,School,$state) {
  function login(email, password) {
    return User
      .login({email: email.toLowerCase(), password: password})
      .$promise
      .then(function(response) {
        $window.localStorage.setItem('user',JSON.stringify(response.user));
        var school = School.findById({id:response.user.schoolId},function(response){
         
          $window.localStorage.setItem('school',JSON.stringify(response));
            $state.go('dashboard');
        
        });
      });
  }

  return {
    login: login
  };
}])
  .factory('AuthServiceStaff',   ['Staff',  '$q', '$rootScope', '$window','School','$state',function(User,  $q,$rootScope,$window,School,$state) {
  function login(email, password) {
    return User
      .login({email: email.toLowerCase(), password: password})
      .$promise
      .then(function(response) {
        $rootScope.currentUser = {
          id: response.user.id,
          tokenId: response.id,
          user : response.user
        };
        $window.localStorage.setItem('user',JSON.stringify(response.user));
        var school = School.findById({id:response.user.schoolId},function(){
          $rootScope.schoolName = school.schoolName;
            $state.go('dashboard');
        });
      });
  }

  return {
    login: login
  };
}])



 
  .factory('AuthServiceParent',  ['Parent', '$q', '$rootScope', '$window','School','StudentParent','Student','$state',
  function(User,  $q,$rootScope,$window,School,StudentParent,Student,$state) {
  function login(email, password) {
    return User
      .login({email: email.toLowerCase(), password: password})
      .$promise
      .then(function(response) {
       

       $rootScope.currentUser = {
          id: response.user.id,
          tokenId: response.id,
          user : response.user
        };

         StudentParent.find({filter:{
            where :{
              parentId: response.user.id
            },include :['student','school','parent']
          }
        },
          function(response)
          {
              $window.localStorage.setItem('students',JSON.stringify(response));
              $window.localStorage.setItem('parent',JSON.stringify(response[0].parent));
              $window.localStorage.setItem('user',JSON.stringify(response[0].student));
              $window.localStorage.setItem('school',JSON.stringify(response[0].school));

              $rootScope.students = response.students;
              $rootScope.Parent = true;
              $state.go('dashboard',{ reload: true });
              location.reload();
          });
      });
  }

  return {
    login: login
  };
}]);
