
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
     
          },function(){
			  			  $scope.invalidLogin = true;
		  }
		  );
      }
      else if ($scope.loginUser == 'Student')
      {
        AuthServiceStudent.login($scope.user.email, $scope.user.password)
          .then(function () {
        
          },function(){
			  $scope.invalidLogin = true;
		  });
      }
      else if ($scope.loginUser == 'Staff')
      {
        AuthServiceStaff.login($scope.user.email, $scope.user.password)
          .then(function () {
          },function(){
			  $scope.invalidLogin = true;
		  });
      }
      else if ($scope.loginUser == 'Parent')
      {
        AuthServiceParent.login($scope.user.email, $scope.user.password)
          .then(function () {
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
        console.log($scope.user.email);
        console.log($scope.user.password);

            $scope.parentExists = Parent.login({  email : $scope.user.email,password : $scope.user.password
            },function(){
                          console.log($scope.parentExists);
                          Student.findById({ id : $scope.user.key},
                          function(response)
                          {
                           
                                StudentParent.findOne({filter:{ where:{    
                                  studentId : response.id,
                                  parentId  : $scope.parentExists.userId 
                                   }}},function(){
                                                   failureCall('You Have Already Subscribed To This Student.Please Contact Your School Admin For Any Issues');    
                                                                 
                                   },function(){
                                                 StudentParent.create({
                                                          studentId : response.id,
                                                          schoolId  : response.schoolId,
                                                          parentId  : $scope.parentExists.userId 
                                                      },function(){
                                                              console.log('Parent Student Relation Created');  
                                                      },function(response){
                                                              console.log(response.data.error.message);
                                                      }); 
                                   }); 
                           
                                     
                          })   ;
            },function(response){
                 console.log(response);
               failureCall('You Have Not Subscribed Yet.Please Contact Your School Admin');
            })       
     };
   })
;
