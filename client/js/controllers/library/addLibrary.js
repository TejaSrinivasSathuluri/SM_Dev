angular
  .module('app')
 .controller('AddLibraryController',function ($scope, $state, School, Library, $rootScope, $window,ngDialog) 
 {


        //--------------------------------------------------------
        //                  BASIC USER DATA
        // --------------------------------------------------------
        $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});




		                
          // ----------------------------------------------------
          //   SUCCESS CALL
          //-----------------------------------------------------
         $scope.successCall = function(message){
           $scope.response = message;
           $scope.error = false;
           $scope.success = true;
          setTimeout( function()
          {
           $scope.response = null;
           $scope.success = false;
            $scope.formData = {};
            $state.go('library');
          }, 1000 );

         }


         

         // ----------------------------------------------------
         //   FAILURE CALL
         //-----------------------------------------------------
         $scope.failureCall = function(message){
           $scope.response = message;
           $scope.error = true;
           $scope.success = false;
         }







          //--------------------------------------------------------
          //                  ADD LIBRARY
          // --------------------------------------------------------

          $scope.addLibrary = function () 
          {

                $scope.libraryExists = Library.findOne({filter: {where: {schoolId: $scope.userData.schoolId, name: $scope.formData.name, author: $scope.formData.author}}},
                  function ()
                  {
                                  $scope.failureCall('Book & Author Combination Already Exists');
                  },
                  function () 
                  {
                    Library.create({  schoolId: $scope.userData.schoolId,
                                    name: $scope.formData.name,
                                    author:$scope.formData.author,
                                    description:$scope.formData.description,
                                    price:$scope.formData.price,
                                    available:$scope.formData.available
                                  },
                                  function () 
                                   {
                                           $scope.successCall("Book Created Succesfully");
                                  },
                                  function (response) 
                                  {
                                     console.log(response.data.error.message);
                                  }
                                  );
                  });
          }

	  });
