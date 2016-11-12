angular
  .module('app')
  .controller('LandingPageController', function ($scope,Admin,Student,Parent,Staff,Noticeboard,School,$window,$rootScope,$filter,$state) {
     
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);


        
        School.findById({id : $scope.userData.schoolId},function(response)
        {
               $window.localStorage.setItem('school',JSON.stringify(response));
               $rootScope.image = $scope.school.image;
               document.getElementById('myIframe1').src = $scope.school.images;
               document.getElementById('myIframe2').src = $scope.school.video;
        });         
       

        $scope.schoolData = $window.localStorage.getItem('school');
        $scope.school = JSON.parse($scope.schoolData);

        if ($scope.userData.type == 'Admin')   { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent')  { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff')   { $scope.Staff   = true;}


        $scope.schoolId = $scope.userData.schoolId;
        $scope.date = new Date();
 
      
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

                    School.findOne({ filter:{ where:{ id : $scope.userData.schoolId },
                                include:[
                                    { 
                                      relation :'noticeboards'
                                    },
                                   { 
                                      relation: 'exams',scope : {
                                        where :{
                                          classId : $scope.userData.classId
                                        }
                                      }
                                   },
                                    {
                                      relation: 'assignments',scope : {
                                        where :{
                                          classId : $scope.userData.classId
                                        }
                                      }
                                    }
                                  ]}},
                    function(response){

                       notices  = response.noticeboards;
                       exams = response.exams;
                       assignments = response.assignments;
                       
                       for (var i = 0; i < notices.length; i += 1) 
                          { 
                            
                                  startTime = new Date(notices[i].date1);
                                  endTime = new Date(new Date(notices[i].date2).getTime() + 24 * 60 * 60000);
                                  events.push({
                                     count:true,
                                      id : notices[i].id,
                                      title: notices[i].title,
                                      description: notices[i].description,
                                      startTime: startTime,
                                      endTime: endTime,
                                      allDay: true,
                                      notice:true
                                  });
                              
                               
                          }

                          for (var i = 0; i < assignments.length; i += 1) 
                          { 
                            
                                  

                                        startTime = new Date(assignments[i].fromDate);
                                        endTime = new Date(new Date(assignments[i].toDate).getTime() + 24 * 60 * 60000);
                                        events.push({
                                          count:true,
                                            id : assignments[i].id,
                                            title: assignments[i].title,
                                            description: assignments[i].description,
                                            startTime: startTime,
                                            endTime: endTime,
                                            allDay: true,
                                            assignment:true
                                        });
                               
                          }

                          for (var i = 0; i < exams.length; i += 1) 
                          {
                                  startTime = new Date(exams[i].fromDate);
                                  endTime = new Date(new Date(exams[i].toDate).getTime() + 24 * 60 * 60000);
                                  events.push({
                                      count:i+1,
                                      id : exams[i].id,
                                      title: exams[i].examName,
                                      description: exams[i].examName,
                                      startTime: startTime,
                                      endTime: endTime,
                                      allDay: true,
                                      exam:true
                                  });
                              
                               
                          }
                    });
                    return events;
                }



                
          //---------------------------------------------

           
           


          //--------------------------------------------------------
          //                  GET BIRTHDAY LIST
          // --------------------------------------------------------

          Student.find({ filter: { where: {schoolId: $scope.schoolId,classId: $scope.userData.classId},include: 'class'}},
            function (response) 
            {
                  $scope.birthdayList =[];
                  var j =0;
                  for(var i=0;i< response.length;i++)
                  {
                    var a =  $filter('date')(new Date($scope.studentList[i].dateofBirth), 'MM-dd')    ;
                    var b =  $filter('date')(new Date(), 'MM-dd')    ;
                    var c= (new Date(a)-new Date(b)) / (1000 * 3600 * 24);
                    if ( c <7 && c >=0)
                    {
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
              console.log(response);
              if (response.status =401) $state.go('logout', {}, {reload: true}) ;
            });


 


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
