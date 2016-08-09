angular.module('app')


  .controller('HolidayController', function ($scope,$rootScope,$state,$window,Calendar,School) {
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        $scope.schoolId = $scope.userData.schoolId;
        if ($scope.userData.type == 'Admin'  ) { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent' ) { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff'  ) { $scope.Staff   = true;}
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});



        //-----------------------------------
        // TABS CODE
        //------------------------------------

        $scope.tab = 1;

        $scope.setTab = function(newTab){
          $scope.tab = newTab;
        };

        $scope.isSet = function(tabNum){
          return $scope.tab === tabNum;
        };
      //-------------------------------------
      //  MONTH VIEW SET UP
      //------------------------------------

      var months = new Array(12);
      months[0] = "January";
      months[1] = "February";
      months[2] = "March";
      months[3] = "April";
      months[4] = "May";
      months[5] = "June";
      months[6] = "July";
      months[7] = "August";
      months[8] = "September";
      months[9] = "October";
      months[10] = "November";
      months[11] = "December";


      $scope.monthDays = function(){  return new Array(31);  }


      Calendar.findOne({filter:{where:{schoolId:$scope.schoolId}}},function(response){
        $scope.monthList = response.monthList;
      },function(){
        console.log('creating new calendar for this year');
        $scope.createCalendar();
      });

      $scope.createCalendar= function(){
        var d = new Date();
        $scope.yearSelected = d.getFullYear();
      $scope.monthList =[];
      for(var i=0;i<12;i++){
        var getDays = new Date($scope.yearSelected,i+1,0).getDate();
        $scope.monthDays = function(){  return new Array(getDays);  }
        $scope.status = [];
        for(var s=0;s<getDays;s++) {       $scope.status[s] =false;  }
        $scope.monthList[i] = {month:months[i],status:$scope.status};
      }




      }

      $scope.saveCalendar = function(){
        Calendar.findOne({filter:{where:{schoolId:$scope.schoolId}}},function(response){
          Calendar.upsert({id:response.id,monthList:$scope.monthList});
          console.log('Updating');
        },function(){
          console.log('Creating');

          Calendar.create({schoolId:$scope.schoolId,monthList:$scope.monthList });
        });
      }

      $scope.addHoliday = function(x,y,index) {
        for(var k=0;k<12;k++)
        {
           if(months[k] == x.month) var num = k;
        }
        $scope.monthList[num].status[index]=y;
      }


      School.findById({id:$scope.schoolId},function(response){
        var startDate = new Date(response.startDate);
        var endDate = new Date(response.endDate);
      });

      })
;