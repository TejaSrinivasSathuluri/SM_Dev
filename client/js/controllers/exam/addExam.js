angular.module('app')


  .controller('AddExamController', 
  function ($scope, $state, School, Exam,Class,$rootScope, $window,ngDialog,$filter,Subject) 
  {

        //------------------------------------------------
        //            BASIC USER DATA
        //------------------------------------------------

          $scope.user = $window.localStorage.getItem('user');
          $scope.userData = JSON.parse($scope.user);
          $scope.schoolId = $scope.userData.schoolId;
          if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
          if ($scope.userData.type == 'Student') { $scope.Student = true;}
          if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
          if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
          $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});
        //------------------------------------------------
        //            BASIC USER DATA
        //------------------------------------------------
        

     
         //--------------------------------------------
         //          GET CLASS LIST
         //--------------------------------------------
         $scope.classList = Class.find({filter: {where: {schoolId: $scope.schoolId}}});


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
            $state.go('exams');
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



          //------------------------------------------------------------------------
          //                 ADD EXAM
          //-------------------------------------------------------------------------
            $scope.addExam = function () 
            {
               var toDate  = $filter('date')(new Date($scope.formData.toDate), 'yyyy-MM-dd');     
               var fromDate = $filter('date')(new Date($scope.formData.fromDate), 'yyyy-MM-dd');
                Exam.findOne
                (
                  {
                    filter:{
                        where:{
                              schoolId: $scope.userData.schoolId,
                              examName:$scope.formData.examName,
                              classId:$scope.formData.classId
                        }
                    }
                  },
                function(){
                  $scope.failureCall(' Exam Record Already Exists');
                 

                },function(){


                              if ($scope.formData.toDate - $scope.formData.fromDate >= 0)
                              {

                                // Exam Create Process Starts
                                  Exam.create(
                                      {
                                          fromDate   : $scope.formData.fromDate,
                                          toDate     : $scope.formData.toDate,
                                          examName   : $scope.formData.examName,
                                          classId    : $scope.formData.classId,
                                          schoolId: $scope.userData.schoolId
                                    },function()          
                                    {    $scope.successCall(' Exam Record Added Successfully'); 
                                    });
                                // Exam Create Process Ends
                              }
                              else 
                              {
                                $scope.failureCall('Exam To Date Should Be Greater Than From Date');
                              }
                });
            } 

        //     {
        //         $scope.formData.fromDate = $filter('date')(new Date($scope.formData.fromDate), 'yyyy-MM-dd');
        //         $scope.formData.toDate   = $filter('date')(new Date($scope.formData.toDate), 'yyyy-MM-dd');
        //         $scope.ExamExists = Exam.findOne({filter: {where: {schoolId: $scope.userData.schoolId, examName: $scope.formData.examName, classId: $scope.formData.classId}}},
        //           function ()
        //           {
        //                           $scope.failureCall('Exam Record Already exist');
        //           },
        //           function () 
        //           {
        //             Exam.create({  schoolId: $scope.userData.schoolId,
        //                             examName: $scope.formData.examName,
        //                             classId:$scope.formData.classSelected,
        //                             fromDate:$scope.formData.fromDate,
        //                             toDate:$scope.formData.toDate
        //                           },
        //                           function () 
        //                            {
        //                                    $scope.successCall("Assignment Record Added Successfully");
        //                           },
        //                           function (response) 
        //                           {
        //                              console.log(response.data.error.message);
        //                           }
        //                           );
        //           });
        //   }     
});
