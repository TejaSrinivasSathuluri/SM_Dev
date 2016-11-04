angular.module('app')
  .controller('GenerateScheduleController',function ($scope, Student,Admin, $state, School, Class, Subject, Schedule, Timetable, $rootScope, $window,WorkingDay) 
  {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      if ($scope.userData.type == 'Admin')   { $scope.Admin = true;  }
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent')  { $scope.Parent = true; }
      if ($scope.userData.type == 'Staff')   { $scope.Staff = true;  }

      $scope.schoolId = $scope.userData.schoolId;
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


      // -----------------------------------------------------------
      // GET CLASS LIST
      // --------------------------------------------------------------

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
      


          $scope.generateSchedule = function () 
          {
                        
                    School.findOne({filter: { where :{ id: $scope.schoolId },include : 'timetables'}},
                    function(response)
                    {
                            if(response.timetables.length == 0)
                            {
                                       $scope.failureCall('Please Generate the School TimeTable First and Then Come Back to Class TimeTables'); 
                            }
                            else
                            {

                                checkClassTimetable(response.timetables);
                            }
                    
                    });     
          }

          checkClassTimetable = function(timetables)
          {
                Class.findOne({ filter :{ where :{ id : $scope.classId},include:'schedules'}},
                function(response)
                {
                    if(response.schedules.length == 0){
                             
                             createSchedules(timetables);   
                    }
                    else{
                                $scope.failureCall('TimeTable For this Class Already Exists');
                    }
                })              
          }
          createSchedules = function(timetables)
          {
                for(var i=0; i < timetables.length; i++)
                {
                    timetableId = timetables[i].id;
                    addSchedule(timetableId);
                    
                }
          }
          $rootScope.count = 0;
           addSchedule = function(timetableId)
           {

                    WorkingDay.find({ filter :{ where :{ schoolId : $scope.schoolId}}},
                    function(response)
                    {
                            response.forEach(function(day)
                            {
                                 Schedule.create({ timetableId : timetableId,
                                                   workingDayId : day.id,
                                                   classId : $scope.classId 
                                                },
                                  function () 
                                   {
                                           $scope.successCall("Schedule Created Successfully");
                                  });
                            });
                    });
           }
  
                

                

          
     
});
