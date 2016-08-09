angular
  .module('app')
  .controller('LandingPageController', function ($scope,Admin,Student,Parent,Staff,Noticeboard,School,$window,$rootScope,$filter,$state) {
     
      //--------------------------------------------------------
      //                  BASIC USER DATA
      // --------------------------------------------------------

      if ($window.localStorage.getItem('user'))
      {
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        if ($scope.userData.type == 'Admin')   { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent')  { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff')   { $scope.Staff   = true;}

        $scope.schoolId = $scope.userData.schoolId;
        $scope.date = new Date();

        


          $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

          // --------------------------------------------------------
          //                  GET NOTICE LIST
          // --------------------------------------------------------
          var day =$filter('date')(new Date(), 'yyyy-MM-dd');
          $scope.noticeList = Noticeboard.find({filter:{where:{schoolId:$scope.schoolId,date1:{lt:day},date2:{gt:day}}}});
          //--------------------------------------------------------
          //                   CALENDAR
          // --------------------------------------------------------
          //
          $scope.changeMode = function (mode) { $scope.mode = mode; };
          $scope.today = function () {   $scope.currentDate = new Date(); }
          $scope.isToday = function () {  var today = new Date(), currentCalendarDate = new Date($scope.currentDate);
            today.setHours(0, 0, 0, 0);
            currentCalendarDate.setHours(0, 0, 0, 0);
            return today.getTime() === currentCalendarDate.getTime();
          }
          $scope.loadEvents = function () {    $scope.eventSource = createRandomEvents();};
          $scope.onEventSelected = function (event) {   $scope.event = event; };
          function createRandomEvents() {
            var events = [];
            //for (var i = 0; i < 20; i += 1) {
            var date = new Date();
            //var startDay = Math.floor(Math.random() * 90) - 45;
            //var endDay = Math.floor(Math.random() * 2) + startDay;
            //
            //
            //  startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));

            //startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
            //  if (endDay === startDay) {      endDay += 1; }
            //  endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            //  endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() ));

            for(var i=0;i<$scope.noticeList.length;i++){
              //console.log($scope.noticeList[i].date1);
              events.push({ title:  $scope.noticeList[i].title });

            }

            //}
            return events;
          }


          //--------------------------------------------------------
          //                  GET BIRTHDAY LIST
          // --------------------------------------------------------

          $scope.studentList = Student.find({
            filter: {
              where: {schoolId: $scope.schoolId},
              include: 'class'
            }
          },
            function () {
            $scope.birthdayList =[];
            var j =0;


            for(var i=0;i<$scope.studentList.length;i++)
            {



              var a =  $filter('date')(new Date($scope.studentList[i].dateofBirth), 'MM-dd')    ;
              var b =  $filter('date')(new Date(), 'MM-dd')    ;
              var c= (new Date(a)-new Date(b)) / (1000 * 3600 * 24);
              if ( c <7 && c >=0){
                $scope.birthdayList[j] = { studentId:$scope.studentList[i].id,firstName:$scope.studentList[i].firstName,
                  class:($scope.studentList[i].class.className + '-' +$scope.studentList[i].class.sectionName),
                  dateofBirth:$scope.studentList[i].dateofBirth};
                j++;
              }

            }

            },
            function (response)
            {
              console.log('Cant Fetch Student List');
              if (response.status =401) $state.go('logout', {}, {reload: true}) ;
            });

        $scope.birthDayChk = function(x){
        //   var a =  $filter('date')(new Date(x.dateofBirth), 'MM-dd')    ;
        //   var b =  $filter('date')(new Date(), 'MM-dd')    ;
        //   var c= (new Date(a)-new Date(b)) / (1000 * 3600 * 24);
        //  if (c ==0) return true;
        //   else false;
        }

      }
   })
  
 


  
;
