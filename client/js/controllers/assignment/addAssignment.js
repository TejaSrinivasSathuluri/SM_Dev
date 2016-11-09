angular
  .module('app')
.controller('AddAssignmentController', function (Student,
      $scope,$rootScope, $state, Class, Assignment,$window,ngDialog,$filter,School) {

      //--------------------------------------------------------
      //                 GET USER DATA && INITIALIZATION
      //--------------------------------------------------------
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

      


        //--------------------------------------------------------
        //                 GET CLASS LIST
        //--------------------------------------------------------
        $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});

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
            $state.go('assignment');
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
        //                 ADD ASSIGNMENT
        //--------------------------------------------------------
        $scope.addAssignment = function () 
          {
                $scope.formData.fromDate = $filter('date')(new Date($scope.formData.fromDate), 'yyyy-MM-dd');
                $scope.formData.toDate   = $filter('date')(new Date($scope.formData.toDate), 'yyyy-MM-dd');
                $scope.assignmentExists = Assignment.findOne({filter: {where: {schoolId: $scope.userData.schoolId, title: $scope.formData.title, classId: $scope.formData.classSelected, fromDate: $scope.formData.fromDate, toDate: $scope.formData.toDate}}},
                  function ()
                  {
                                  $scope.failureCall('Assignment Record Already exist');
                  },
                  function () 
                  {
                    Assignment.create({  schoolId: $scope.userData.schoolId,
                                    title: $scope.formData.title,
                                    classId:$scope.formData.classSelected,
                                    description:$scope.formData.description,
                                    fromDate:$scope.formData.fromDate,
                                    toDate:$scope.formData.toDate
                                  },
                                  function () 
                                   {
                                           $scope.successCall("Assignment Record Added Successfully");
                                  },
                                  function (response) 
                                  {
                                     console.log(response.data.error.message);
                                  }
                                  );
                  });
          }

});
