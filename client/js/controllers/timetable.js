angular
  .module('app')
   .controller('TimetableController',
    ['$scope', 'Admin', '$state', 'School', 'Timetable','Schedule', '$rootScope', '$window',
    function ($scope, Admin, $state, School, Timetable,Schedule, $rootScope, $window) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      if ($scope.userData.type == 'Admin') {
        $scope.Admin = true;
      }
      if ($scope.userData.type == 'Student') {
        $scope.Student = true;
      }
      if ($scope.userData.type == 'Parent') {
        $scope.Parent = true;
      }
      if ($scope.userData.type == 'Staff') {
        $scope.Staff = true;
      }
      $scope.schoolId = $scope.userData.schoolId;
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});





        $scope.viewTimetable = [];
      $scope.viewTimetable = School.timetables({"id": $scope.schoolId}, function () {
          $scope.receivers = [];
          for (var i = 0; i < $scope.viewTimetable.schedule.length; i++) {
            $scope.viewTimetable.schedule[i].startTime = new Date($scope.viewTimetable.schedule[i].startTime);
            $scope.viewTimetable.schedule[i].endTime = new Date($scope.viewTimetable.schedule[i].endTime);
            $scope.viewTimetable.schedule[i].duration = ($scope.viewTimetable.schedule[i].endTime - $scope.viewTimetable.schedule[i].startTime) / 60000;
            $scope.receivers.push({
              title: $scope.viewTimetable.schedule[i].title,
              startTime: $scope.viewTimetable.schedule[i].startTime, endTime: $scope.viewTimetable.schedule[i].endTime,
              duration: $scope.viewTimetable.schedule[i].duration, attendance: $scope.viewTimetable.schedule[i].attendance
            });
          }
        },
        function () {
          $scope.receivers = [{title: "", startTime: "", endTime: "", duration: "", attendance: ""}];
        }
      );
     if ($scope.Admin){
      $scope.addRecipient = function (receiver) {
        if (receiver.title.length != 0) {
          if (receiver.startTime < receiver.endTime) {
            receiver.duration = (receiver.endTime - receiver.startTime) / 60000;
            $scope.receivers.push({title: "", startTime: "", endTime: "", duration: "", attendance: ""});
          }
          else {
            alert('Start Time Should Be Lessthan End Time ');
          }
        }
        else {
          alert('Please fill the fields');
        }
      }
      $scope.deleteRecipient = function (receiver) {
        for (var i = 1; i < $scope.receivers.length; i++) {
          if ($scope.receivers[i] === receiver) {

            $scope.receivers.splice(i, 1);
            break;
          }
        }
      }
      $scope.saveTimetable = function () {
        $scope.chkTimetable = School.timetables({"id": $scope.schoolId}, function () {
            if ($scope.receivers[$scope.receivers.length - 1].title.length != 0 && $scope.receivers[$scope.receivers.length - 1].startTime != null && $scope.receivers[$scope.receivers.length - 1].endTime != null) 
            {
              if($scope.receivers[$scope.receivers.length - 1].startTime < $scope.receivers[[$scope.receivers.length - 1]].endTime){

              $scope.newTimetable = Timetable.upsert({id: $scope.chkTimetable.id, schedule: $scope.receivers},
                function () {
                  Timetable.schedules.destroyAll({id: $scope.chkTimetable.id}, function () {
                    $scope.response = "Timetable Saved Successfully";
                    setTimeout( function()
                    {
                      $state.go($state.current, {}, {reload: true});
                      $scope.$apply();
                    }, 1000 );
                  });
                });
              }
              else{
                alert('Start Time Should Be Lessthan End Time ');
              }
                

            }
            else {
              alert('Please fill the fields');
            }

          },
          function () {
            $scope.newTimetable = Timetable.create({schoolId: $scope.schoolId, schedule: $scope.receivers});
            $scope.response = "Timetable Created Successfully";
            setTimeout( function()
            {
              $state.go($state.current, {}, {reload: true});
              $scope.$apply();
            }, 1000 );
          });
      }
    }
    }])


  
  
  

;
