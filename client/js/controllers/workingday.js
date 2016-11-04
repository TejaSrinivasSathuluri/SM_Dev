angular.module('app')


  .controller('WorkingDayController', function ($scope,$rootScope,$state,$window,Calendar,School,WorkingDay) {
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        $scope.schoolId = $scope.userData.schoolId;



     WorkingDay.find({
       filter :{
         where :{
           schoolId : $scope.schoolId
         }
       }
     },function(response){
       $scope.workingDays = response;
       if(response.length == 0)
       {
          days = [
           { day : "Monday",schoolId : $scope.schoolId,working : true },
           { day : "Tuesday",schoolId : $scope.schoolId,working : true },
           { day : "Wednesday",schoolId : $scope.schoolId,working : true },
           { day : "Thursday",schoolId : $scope.schoolId,working : true },
           { day : "Friday",schoolId : $scope.schoolId,working : true },
           { day : "Saturday",schoolId : $scope.schoolId,working : true },
           { day : "Sunday",schoolId : $scope.schoolId,working : false }
          ];
          WorkingDay.createMany(days);

       }
     });

        // -----------------------------------------------------
        //   SAVE Week
        //------------------------------------------------------

                $scope.saveDay = function(day)
                {
                 WorkingDay.prototype$updateAttributes({
                   id : day.id,
                   working : day.working
                 },
                  function () {
                   $state.go($state.current, {}, {reload: true});
                  });
                
                }
                
        

                

});