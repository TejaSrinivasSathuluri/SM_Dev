
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

  .controller('SignUpController', function($scope,$state,Parent,Student,StudentParent) {
    

    failureCall = function(message)
    {
       $scope.error = true;
       $scope.response = message;
    }

     $scope.register = function() {

            $scope.parentExists = Parent.login({
              filter:{
                where:{
                  email : $scope.user.email,
                  password : $scope.user.password
                }
              }
            },function(){
                          console.log($scope.parentExists);
                          Student.findById({ id : $scope.user.key},
                          function(response)
                          {
                                StudentParent.create({
                                    studentId : response.id,
                                    schoolId  : response.schoolId,
                                    parentId  : $scope.parentExists.userId 
                                });            
                          })   ;
            },function(){

               failureCall('You Have Not Subscribed Yet.Please Contact Your School Admin');
            })       
        console.log($scope.user);
     };
   })
;
