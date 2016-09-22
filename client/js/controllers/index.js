angular
  .module('app')
  .controller('IndexController', function ($scope,Admin,Student,Parent,Staff,Noticeboard,School,$window,$rootScope,$filter,$state) {
     
      

      if (!$window.localStorage.getItem('user'))
      {
        console.log('Index');
        $state.go('logout');
        

      }
      else
      {
         $scope.user = $window.localStorage.getItem('user');
         $scope.userData = JSON.parse($scope.user);
         
        if ($scope.userData.type == 'Admin')   { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent')  { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff')   { $scope.Staff   = true;}
       

      }
          
      

     


})
  .controller('MenuController', function ($scope,Admin,Student,Parent,Staff,Noticeboard,School,$window,$rootScope,$filter,$state) {
     
      if (!$window.localStorage.getItem('user'))

      {
         console.log('Menu Controller .Not Logged In');
      }
      else
      {
         $scope.reloadConsole = function(){
            $window.open('http://localhost:3000/#/dashboard','_self');
                              location.reload();

            
         }
         console.log('Menu Controller .Logged In');
         $scope.user = $window.localStorage.getItem('user');
         $scope.userData = JSON.parse($scope.user);
        if ($window.localStorage.getItem('parent'))
        {
              $scope.student =   $scope.userData.id;
              $scope.changeStudent = function()
              {
              Student.findOne({filter:{where:{ id : $scope.student},include:'school'}},function (response){
                console.log(response);
              $window.localStorage.setItem('user',JSON.stringify(response));
              $window.localStorage.setItem('school',JSON.stringify(response.school));
              $state.go('dashboard'); 

              });
              }
        }

      }
});
