angular
  .module('app')
  .controller('IndexController', function ($scope,Admin,Student,Parent,Staff,Noticeboard,School,$window,$rootScope,$filter,$state) {
     
      

      if (!$window.localStorage.getItem('user'))
      {
        console.log('Index');
        $state.go('logout');
        

      }
      else{
        $state.go('logout');

      }
          
      

        // $scope.user = $window.localStorage.getItem('user');
        // $scope.userData = JSON.parse($scope.user);
        // if ($scope.userData.type == 'Admin')   { $scope.Admin   = true;}
        // if ($scope.userData.type == 'Student') { $scope.Student = true;}
        // if ($scope.userData.type == 'Parent')  { $scope.Parent  = true;}
        // if ($scope.userData.type == 'Staff')   { $scope.Staff   = true;}

        // $scope.schoolId = $scope.userData.schoolId;
        // $scope.date = new Date();
         
        //   $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

});
