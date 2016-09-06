angular.module('app')
  .controller('ScheduleController',function ($scope, Admin, $state, School, Class, Subject, Schedule, Timetable, $rootScope, $window) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}

      $scope.schoolId = $scope.userData.schoolId;
      $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

      $scope.scheduleList = [];

      if ($scope.Admin) {
        $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
        $scope.loadSchedule = function () {
          $scope.subjectList = Subject.find({filter: {where: {classId: $scope.class,schoolId:$scope.schoolId}}});
          $scope.viewTimetable = School.timetables({"id": $scope.schoolId}, function () {
            $scope.chkSchedule = Schedule.findOne({
                filter: 
                {
                  where: 
                      {
                        timetableId : $scope.viewTimetable.id,
                        classId     : $scope.class
                      }
                }
              },
              function () {
                $scope.scheduleList = $scope.chkSchedule.schedule;

              },
              function () {
              console.log('Class TimeTable Is Generating');
                for (var i = 0; i < $scope.viewTimetable.schedule.length; i++) {

                  $scope.scheduleList[i] = $scope.viewTimetable.schedule[i];
                  $scope.scheduleList[i].startTime = new Date($scope.viewTimetable.schedule[i].startTime);
                  $scope.scheduleList[i].endTime = new Date($scope.viewTimetable.schedule[i].endTime);
                  if ($scope.scheduleList[i].attendance != true) {
                    $scope.scheduleList[i].attendance == false;
                    $scope.scheduleList[i].startTime = $scope.viewTimetable.schedule[i].title;
                    $scope.scheduleList[i].endTime = null;
                    $scope.scheduleList[i].Monday = null;
                  }
                }
              })
          }, function () {
            $scope.scheduleList = [];
          });

          $scope.saveSchedule = function () {
            $scope.chkSchedule = Schedule.findOne({
                filter: {
                  where: {
                    timetableId: $scope.viewTimetable.id,
                    classId: $scope.class
                  }
                }
              },
              function () {

                Schedule.upsert({
                    id: $scope.chkSchedule.id,
                    classId: $scope.class,
                    schedule: $scope.scheduleList
                  }, function () {
                    $scope.response = "Timetable Saved Successfully";
                    setTimeout( function()
                    {
                      $state.go($state.current, {}, {reload: true});
                      $scope.$apply();
                    }, 1000 );
                  },
                  function (response) {
                    console.log(response.data.error.message);
                  });
              },
              function () {

                Schedule.create({
                  timetableId: $scope.viewTimetable.id,
                  classId: $scope.class,
                  schedule: $scope.scheduleList
                }, function () {
                  $scope.response = "Timetable Created Successfully";
                  setTimeout( function()
                  {
                    $state.go($state.current, {}, {reload: true});
                    $scope.$apply();
                  }, 1000 );
                });

              });
          }

        }
      }
      else if ($scope.Student)
      {
          $scope.subjectList = Subject.find({filter: {where: {classId:$scope.userData.classId}}});
          $scope.viewTimetable = School.timetables({id: $scope.schoolId,classId:$scope.userData.classId}, 
          function () 
          {
       
                      $scope.chkSchedule = Schedule.findOne(
                      {
                          filter: {
                            where: {
                              timetableId: $scope.viewTimetable.id,
                              classId: $scope.userData.classId
                            }
                          }
                      },
                      function () 
                      {
                          $scope.scheduleList = $scope.chkSchedule.schedule;
                      });

          }, 
          function () 
          {
            $scope.scheduleList = [];
          });
      }
})
