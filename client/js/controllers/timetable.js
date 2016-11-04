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





        $scope.receivers = [];
      Timetable.find({filter :{ where :{schoolId: $scope.schoolId},include:'schedules'}}, 
       function (response) 
       {
          if(response.length == 0)           $scope.receivers = [{title: "", startTime: "", endTime: "", duration: "", attendance: ""}];
          else {
                $scope.receivers = response;
                i=0;
               for(i=0;i< response.length;i++)
               {
                     $scope.receivers[i].startTime = new Date($scope.receivers[i].startTime); 
                     $scope.receivers[i].endTime = new Date($scope.receivers[i].endTime); 

                };
                // $scope.receivers = [{title: "", startTime: "", endTime: "", duration: "", attendance: ""}];
          }    
       }
      );
       $scope.deleteRow=function(receiver){

          Timetable.deleteById({id:receiver.id});
          $state.reload();
        }
      $scope.addRow=function(receiver){

          $scope.receivers.push({title: "", startTime: "", endTime: "", duration: "", attendance: ""});
      }
      $scope.addRecipient = function (receiver) 
        {
                             if (receiver.title.length != 0) {
                                if (receiver.startTime < receiver.endTime) {
                                      receiver.duration = (receiver.endTime - receiver.startTime) / 60000;                                    
                                      if (receiver.id)
                                      {
                                        Timetable.prototype$updateAttributes({
                                          id:receiver.id,schoolId: $scope.schoolId,title: receiver.title,startTime:receiver.startTime,endTime:receiver.endTime,duration:receiver.duration,attendance:receiver.attendance
                                        });
                                      }
                                      else
                                      {
                                      Timetable.create({
                                        schoolId: $scope.schoolId,title: receiver.title,startTime:receiver.startTime,endTime:receiver.endTime,duration:receiver.duration,attendance:receiver.attendance
                                      });
                                      }
                                }
                                else {
                                        alert('Start Time Should Be Lessthan End Time ');
                                     }
                            }
                            else {
                                     alert('Please fill the fields');
                            }

      $scope.deleteRecipient = function (receiver) {
        for (var i = 1; i < $scope.receivers.length; i++) {
          if ($scope.receivers[i] === receiver) {

            $scope.receivers.splice(i, 1);
            break;
          }
        }
      }
     

     
    
    }}
    ]);
