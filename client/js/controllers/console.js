angular
  .module('app')
  .controller('LandingPageController', function ($scope,Admin,Student,Parent,Staff,Noticeboard,School,$window,$rootScope,$filter,$state) {
     
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);


        
        School.findById({id : $scope.userData.schoolId},function(response)
        {
             $window.localStorage.setItem('school',JSON.stringify(response));
        });         
       

        $scope.schoolData = $window.localStorage.getItem('school');
        $scope.school = JSON.parse($scope.schoolData);

        if ($scope.userData.type == 'Admin')   { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent')  { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff')   { $scope.Staff   = true;}


        $scope.schoolId = $scope.userData.schoolId;
        $scope.date = new Date();
        $rootScope.image = $scope.school.image;


          



        document.getElementById('myIframe').src = $scope.school.video;
            


          // --------------------------------------------------------
          //                  GET NOTICE LIST
          // --------------------------------------------------------

          
        //  firstDay   = new Date(new Date().getTime() - 24*60*60000);
        //  lastDay   = new Date(new Date().getTime() + 24*60*60000);
          // var day =$filter('date')(new Date(), 'yyyy-MM-dd');
          // var firstDay =$filter('date')(new Date(firstDay), 'yyyy-MM-dd');
         
        

          // $scope.noticeList= [];
          // Noticeboard.find({filter:{where:{schoolId:$scope.schoolId,date1:{lt:firstDay},date2:{gt:lastDay}}}},function(response){
          //   $scope.noticeList = response;
          //   response.forEach(function(notices){
          //     var p = notices.toJSON();
          //   });
          // });
      
          //--------------------------------------------------------
          //                   CALENDAR
          // --------------------------------------------------------
                      $scope.changeMode = function (mode) { $scope.mode = mode; };
                      
                      $scope.today = function () {   $scope.currentDate = new Date(); }
                      
                      $scope.isToday = function () {  var today = new Date(), currentCalendarDate = new Date($scope.currentDate);
                        today.setHours(0, 0, 0, 0);
                        currentCalendarDate.setHours(0, 0, 0, 0);
                        return today.getTime() === currentCalendarDate.getTime();
                      }

                      $scope.loadEvents = function () {    $scope.eventSource = createRandomEvents(); };
                      // $scope.loadEvents();
                      $scope.onEventSelected = function (event) { $scope.event = event; };

                    function createRandomEvents() 
                    {
                    var events = [];
                    var notices = School.noticeboards({
                      id : $scope.userData.schoolId
                    },function(response){



                       for (var i = 0; i < response.length; i += 1) 
                          {
                                  startTime = new Date(notices[i].date1);
                                  endTime = new Date(new Date(notices[i].date2).getTime() + 24 * 60 * 60000);
                                  events.push({
                                      id : notices[i].id,
                                      title: notices[i].title,
                                      description: notices[i].description,
                                      startTime: startTime,
                                      endTime: endTime,
                                      allDay: true
                                  });
                              
                               
                          }
                    });
                  
                   
                          // for (var i = 0; i < 20; i += 1) 
                          // {
                          //     var date = new Date();
                          //     var eventType = Math.floor(Math.random() * 2);
                          //     var startDay = Math.floor(Math.random() * 90) - 45;
                          //     console.log('startday' + startDay);
                          //     var endDay = Math.floor(Math.random() * 2) + startDay;
                          //     console.log('endDay' + endDay);
                          //     var startTime;
                          //     var endTime;
                          //     if (eventType === 0) {
                          //         startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                          //         if (endDay === startDay) {
                          //             endDay += 1;
                          //         }
                          //         endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                          //         events.push({
                          //             title: 'All Day - ' + i,
                          //             startTime: startTime,
                          //             endTime: endTime,
                          //             allDay: true
                          //         });
                          //     } 
                          //     else 
                          //     {
                          //         var startMinute = Math.floor(Math.random() * 24 * 60);
                          //         var endMinute = Math.floor(Math.random() * 180) + startMinute;
                          //         startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                          //         endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                          //         events.push({
                          //             title: 'Event - ' + i,
                          //             startTime: startTime,
                          //             endTime: endTime,
                          //             allDay: false
                          //         });
                          //     }
                          // }
                    return events;
                }
          //---------------------------------------------

           
           


          //--------------------------------------------------------
          //                  GET BIRTHDAY LIST
          // --------------------------------------------------------


    if($scope.Student){

                $scope.studentList = Student.find({
            filter: {
              where: {schoolId: $scope.schoolId,classId: $scope.userData.classId},
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



    }

    else if ($scope.Staff || $scope.Admin) 
    
    {
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


    }







// ---------------------------------
//   HIGHLIGHT TODAY'S BIRTHDAY
// ---------------------------------

        $scope.birthDayChk = function(x){
          var a =  $filter('date')(new Date(x.dateofBirth), 'MM-dd')    ;
          var b =  $filter('date')(new Date(), 'MM-dd')    ;
          var c= (new Date(a)-new Date(b)) / (1000 * 3600 * 24);
         if (c ==0) return true;
          else false;
        }


});
