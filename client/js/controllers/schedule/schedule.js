angular.module('app')
  .controller('ScheduleController',function ($scope, Student,Admin, $state, School, Class, Subject, Schedule, Timetable, $rootScope, $window,WorkingDay) 
  {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      if ($scope.userData.type == 'Admin')   { $scope.Admin = true;  }
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent')  { $scope.Parent = true; }
      if ($scope.userData.type == 'Staff')   { $scope.Staff = true;  }

      $scope.schoolId = $scope.userData.schoolId;
      $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

      $scope.scheduleList = [];

      // ------------------------------------------------
      //             SUCCESS CALL
      // ------------------------------------------------

        $scope.successCall = function(message){
           $scope.response = message;
           $scope.error = false;
           $scope.success = true;
          setTimeout( function()
          {
           $scope.response = null;
           $scope.success = false;
            $scope.formData = {};
            $state.go('schedule');
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



      // ------------------------------------------------
      //             DELETE SCHEDULE
      // ------------------------------------------------
        // $scope.deleteSchedule = function(){
        //   Schedule.find(function(response){response.forEach(function(day)
        //                               {
                                          
        //                                    Schedule.deleteById({id :day.id});
        //                               });
        //                });
        // }


      //  // ------------------------------------------------
      // //             DELETE SCHEDULE
      // // ------------------------------------------------
       
      //  $scope.deleteSchedule = function()
      //  {
      //    Class.schedules.destroy({ id : $scope.classId },
      //    function()
      //    {
      //      $scope.successCall('TimeTable Deleted Successfully');
      //    },
      //    function(response)
      //    {
      //         console.log(response.data.error.message);
      //    });
      //  } 




      //-----------------------------------------------------------
      //GET CLASS LIST
      //--------------------------------------------------------------

       School.findOne({filter: { where :{ id: $scope.schoolId },include :  ['classes','timetables']}},
        function(response)
        {
          $scope.classList = response.classes; 
          $scope.timetableList = response.timetables;
         
         if($scope.timetableList.length == 0)
          {
            $scope.noTimetable = true;
          }
          
        });
        //----------------------------------------------------------------------
        // Load TimeTable Starts
        //-----------------------------------------------------------------------
          if($scope.Admin || $scope.Staff)
          {
          $scope.loadTimetable = function()
          {
            $scope.scheduleList = [];
            Timetable.find({filter:{where :{ schoolId :$scope.schoolId},
            include:[
            {
              relation : 'schedules',scope:{include :[{
                                                       relation: 'workingDay'},
                                                     {
                                                        relation: 'class',scope:{
                                                        include :'subjects'
                                                      }
                                                    }],where :{classId : $scope.classId}
                                            }
            }]}},
            function(response)
            {
              $scope.timetables = response;
              // console.log(response);
            });
          }
          }
         else if ($scope.Student)
         {
            $scope.scheduleList = [];
            Timetable.find({filter:{where :{ schoolId :$scope.schoolId},
            include:[
            {
              relation : 'schedules',scope:{           include :
                                                      [
                                                        {
                                                         relation: 'workingDay'},
                                                      {
                                                        relation: 'class',scope:{
                                                        include :'subjects'
                                                      }
                                                    }],where :{classId : $scope.userData.classId}
                                            }
            }]}},
            function(response)
            {
              $scope.timetables = response;
              console.log(response);
            });
         }
          //----------------------------------------------------------------------
          // Load TimeTable Ends
          //-----------------------------------------------------------------------

         //--------------------------------SAVE SCHEDULE----------------------------------- 
         
         
          $scope.saveSchedule = function (y) 
          {
            Schedule.prototype$updateAttributes({ id : y.id , subjectId : y.subjectId });
            //  console.log(y.id);
            //  console.log(y.subjectId);
          }

          //--------------------------------SAVE SCHEDULE----------------------------------- 
      
      
})
