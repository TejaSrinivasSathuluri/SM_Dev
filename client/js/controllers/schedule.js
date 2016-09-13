angular.module('app')
  .controller('ScheduleController',function ($scope, Student,Admin, $state, School, Class, Subject, Schedule, Timetable, $rootScope, $window) 
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

        successCall = function(message)
        {
                    $scope.response = message;
                    setTimeout( function()
                    {
                      $state.go($state.current, {}, {reload: true});
                      $scope.$apply();
                    }, 1000 );
        }







       // ------------------------------------------------
      //             DELETE SCHEDULE
      // ------------------------------------------------
       
       $scope.deleteSchedule = function()
       {
         Class.schedules.destroy({ id : $scope.class },
         function()
         {
           successCall('TimeTable Deleted Successfully');
         },
         function(response)
         {
              console.log(response.data.error.message);
         });
       } 




      // -----------------------------------------------------------
      // GET CLASS LIST
      // --------------------------------------------------------------

       School.findOne({filter: { where :{ id: $scope.schoolId },include :  'classes'}},
        function(response)
        {
          $scope.classList = response.classes; 
        });




      if ($scope.Admin) 
      {
        console.log('Admin or Staff TimeTable');

        $scope.loadSchedule = function () 
        {
          School.findOne({filter: { where :{ id: $scope.schoolId },
                                  include : [
                                    {
                                      relation :'classes',scope: {
                                        where :{
                                          id : $scope.class
                                        },
                                         include : [
                                           {
                                             relation : 'schedules'
                                           },
                                           {
                                             relation : 'subjects'
                                           }
                                         ]
                                      }
                                    }
                                  ]}},
        function(response)
        {
          $scope.subjectList = response.classes[0].subjects;
          if(response.classes[0].schedules != undefined)           
          {
            $scope.classSelected = true;
            $scope.scheduleList = response.classes[0].schedules.schedule;
          }
          else  
          { 
              $scope.scheduleList = [];
              School.timetables({ id: $scope.schoolId},
              function(response)
              {
                  for (var i = 0; i < response.schedule.length; i++) 
                  {
                      $scope.scheduleList[i] = response.schedule[i];
                      $scope.scheduleList[i].startTime = new Date(response.schedule[i].startTime);
                      $scope.scheduleList[i].endTime = new Date(response.schedule[i].endTime);
                      if ($scope.scheduleList[i].attendance != true) 
                      {
                        $scope.scheduleList[i].attendance == false;
                        $scope.scheduleList[i].startTime = response.schedule[i].title;
                        $scope.scheduleList[i].endTime = null;
                        $scope.scheduleList[i].Monday = null;
                      }
                    }
              });
              
          }
        });


          //--------------------------------SAVE SCHEDULE----------------------------------- 
         
         
          $scope.saveSchedule = function () 
          {
            Class.schedules.update({ id : $scope.class},
            { 
              schedule: $scope.scheduleList
            },
            function(response)
            {
                  successCall('Timetable Updated Successfully');
            },
            function(response)
            {
                console.log(response);
                Class.schedules.create({ id : $scope.class},
                { 
                  schedule: $scope.scheduleList
                },
                function()
                {
                  console.log('Timetable Created Successfully For The Class');
                  successCall('Timetable Saved Successfully');
                });
            });
          }

          //--------------------------------SAVE SCHEDULE----------------------------------- 
          

        }
      }
      else if ($scope.Student)
      {
         
         
          Student.findOne({
            filter:{
              where:{
                id : $scope.userData.id
              },
              include : [
                {  
                  relation : 'class' ,scope:{
                      include :[
                        {
                          relation : 'subjects'
                        },
                        {
                          relation : 'schedules'
                        }
                      ]
                  }
                }

              ]
            }
          },function(response)
          {
            console.log(response);
            $scope.subjectList = response.class.subjects;
            $scope.scheduleList = response.class.schedules.schedule;
          });
 
      }
})
