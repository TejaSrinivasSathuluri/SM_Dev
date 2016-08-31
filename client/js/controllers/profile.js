angular.module('app')

  .controller('ProfileController', function ($scope,$rootScope,$state,$window,School,Student,Admin,Parent,Staff) {
      
      
      
        $scope.user       = $window.localStorage.getItem('user');
        $scope.parentData = $window.localStorage.getItem('parent');
       
        $scope.userData = JSON.parse($scope.user);
        $scope.parent = JSON.parse($scope.parentData);
       
        $scope.schoolId = $scope.userData.schoolId;

        if ($scope.userData.type == 'Admin'  ) { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent' ) { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff'  ) { $scope.Staff   = true;}
         $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

          if ($scope.parent){
          $scope.editData = $scope.parent;
          $scope.Parent = true;
          $scope.Student = false;

          }
          else{
          $scope.editData = $scope.userData;

          }
       $scope.saveProfile = function()
       {
         if ($scope.Student)
         {
           console.log('Student Profile Update');
           Student.prototype$updateAttributes({
             id:$scope.editData.id,password:$scope.editData.password,firstName:$scope.editData.firstName,lastName:$scope.editData.lastName,
             email:$scope.editData.email
           },function(response){
             console.log(response);
             $scope.responseSaveProfile();
           });
         }
         else if ($scope.Admin)
         {
           console.log('Admin Profile Update');
           Admin.prototype$updateAttributes({
            id:$scope.editData.id,password:$scope.editData.password,firstName:$scope.editData.firstName,lastName:$scope.editData.lastName,
            email:$scope.editData.email
          },function(response){
             $scope.responseSaveProfile();
             console.log(response);
          }, function (response) {
            console.log(response.data.error.message);
          });


         }
         else if ($scope.Parent)
         {
           Parent.prototype$updateAttributes({
             id:$scope.editData.id,password:$scope.editData.password,firstName:$scope.editData.firstName,lastName:$scope.editData.lastName,
             email:$scope.editData.email
           },function(response){
             $scope.responseSaveProfile();
             console.log(response);
           });
         }
         else if ($scope.Staff)
         {
           Staff.upsert({
             id:$scope.editData.id,password:$scope.editData.password,firstName:$scope.editData.firstName,lastName:$scope.editData.lastName,
             email:$scope.editData.email
           },function(response){
             $scope.responseSaveProfile();
             console.log(response);
           });
         }

       }

      // -----------------------------------------------------
      //     FUNCTION AFTER USER UPDATE
      //------------------------------------------------------
        $scope.responseSaveProfile = function ()
        {
          $scope.response = "Profile Saved Successfully";
          setTimeout( function()
          {
            $state.go($state.current, {}, {reload: true});
            $scope.$apply();
          }, 1000 );

        }
      })
