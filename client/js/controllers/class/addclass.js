angular
  .module('app')
 .controller('AddClassController',function ($scope, Admin, $state, School, Class, Student, Staff, $rootScope, $window) 
 {


        //--------------------------------------------------------
        //                  BASIC USER DATA
        // --------------------------------------------------------
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);

        $scope.formData = [];

        $scope.school = School.findById({id:$scope.userData.schoolId},function() {});

        School.findOne({
          filter:{
            where :{  id : $scope.userData.schoolId },
            include:
            [
                  {
                      relation: 'staffs'
                  }
            ]
          }
        },function(response)
        {
             $rootScope.image = response.image;
             $scope.staffList = response.staffs;
        });



		      //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
		       $scope.clearResponse = function ()
           {
			           $scope.response = null;
			           $scope.responseAddClass = null;
                 $scope.formData=null;
		       }

           
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
            $state.go('class');
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
          //                  ADD CLASS
          // --------------------------------------------------------

          $scope.addClass = function () 
          {

                $scope.classExists = Class.findOne({filter: {where: { schoolId: $scope.userData.schoolId, className: $scope.formData.className, sectionName: $scope.formData.sectionName}}},
                  function ()
                  {
                                  $scope.failureCall('Class Already Exists');
                  },
                  function () 
                  {
                    Class.create({  schoolId: $scope.userData.schoolId,
                                    className: $scope.formData.className,
                                    sectionName:$scope.formData.sectionName,
                                    staffId:$scope.formData.staffSelected
                                  },
                                  function () 
                                   {
                                           $scope.successCall("Class Created Successfully");
                                  },
                                  function (response) 
                                  {
                                     console.log(response.data.error.message);
                                  }
                                  );
                  });
          }

	  });
