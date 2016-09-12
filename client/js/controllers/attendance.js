angular.module('app')
.controller('AttendanceController', function ($scope,$rootScope,$state,$window,Class,Attendance,Student,School) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.studentList =[];
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

      //-----------------------------------
      // TABS CODE
      //------------------------------------

      $scope.tab = 1;
      $scope.setTab = function(newTab){  $scope.tab = newTab; };
      $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


      //-----------------------------------------------------------
      //                    DELETE CODE
      //-----------------------------------------------------------

      $scope.delete= function(){
        var count =0;
        $scope.test =Attendance.find(function(response){
            response.forEach(function(tests){
              var p = tests.toJSON();
              console.log(count);
              Attendance.destroyById({id: p.id},function()
              {
              },function(response){
                  console.log(response);
              });
              count++;  
            });
          });
      }
      // $scope.delete();


      //-----------------------------------
      // MONTH VIEW
      //------------------------------------
      $scope.monthView = function() 
      {

        $scope.monthList =[];
        var getDays = new Date($scope.yearSelected,parseInt($scope.monthSelected)+1,0).getDate();
        $scope.monthDays = function(){   return new Array(getDays);    }
        Student.find({filter: {where: {classId: $scope.classSelectedMonth},include:'school'}}, function (response) 
        {
          var i=0;
          $scope.status=[];
          response.forEach(function(list)
          {
             
                    var student = list.toJSON();
                    var key = student.RFID + $scope.yearSelected + $scope.monthSelected;
                 
                    //-----------
                  
                    Attendance.find({filter:{where: {RFID:student.RFID,month:parseInt($scope.monthSelected),year:$scope.yearSelected }}},
                      function(response)
                      {

                            
                              $scope.status=[];
                              for(var s=0;s<getDays;s++)  
                                {
                                     $scope.status[s] =false;
                                }
                              response.forEach(function(data)
                              {
                                var data = data.toJSON();
                                $scope.status[parseInt(data.day)-1]= true;
                              });
                              
                              $scope.monthList[i] = {student:student,status:$scope.status};
                              i++;

                      },function()
                      {
                              for(var s=0;s<getDays;s++) $scope.status[s] =false;
                              $scope.monthList[i] = { student :student,status:$scope.status};
                              i++;
                      }
                    );
                    //  -----------
                    
          });
        });

      }


      //-----------------------------------
      // DAY VIEW
      //------------------------------------



      $scope.loadDates = function() 
      {
            if ($scope.dateSelected <= new Date())  
            {

                    $scope.studentList = [];
                    $scope.presentCount=0;
                    $scope.absentCount=0;

                    Student.find({filter: {where: {classId: $scope.classSelected},include:'school'}}, 
                    function (response) 
                    {
                        for (var i = 0; i < response.length; i++)  $scope.chk(response[i],i);
                        
                    });
                          
            }
            else{
              alert('Future Date Is Not Accepted');
            }
      }





    //-------------------------------- 
    //  CHK ATTENDANCE
    // ------------------------------

                                  $scope.chk = function(student,i)
                                  {
                                    var day = parseInt($scope.dateSelected.getDate());
                                    var month = parseInt($scope.dateSelected.getMonth());
                                    var year = parseInt($scope.dateSelected.getFullYear());
                                    var key = student.RFID+ student.school.code + year+month+day;
                                    
                                    Attendance.findById({id: key},
                                        function(response)
                                        {
                                             $scope.presentCount++;
                                             $scope.studentList[i] ={id :response.id,student:student,status:true };

                                        },
                                        function()
                                        {
                                             $scope.absentCount++;
                                             console.log('RFID:'+ student.RFID + ' Is Absent');
                                             $scope.studentList[i] ={student:student,status:false};
                                        });

                                  }

     



    //-------------------------------- 
    //  ADD/DELETE ATTENDANCE
    // ------------------------------
      $scope.addAttendance = function(x)
      {
      
                          if (x.status == true) 
                          {
                            
                                Attendance.create(
                                { 
                                      id :x.student.RFID + x.student.school.code + $scope.dateSelected.getFullYear()  + $scope.dateSelected.getMonth() + $scope.dateSelected.getDate(),   
                                      RFID:x.student.RFID,
                                      day:$scope.dateSelected.getDate(),
                                      month:$scope.dateSelected.getMonth(),
                                      year:$scope.dateSelected.getFullYear()
                                },
                                function()
                                {
                                        console.log('Attendance Added');
                                        $scope.studentList=[];
                                        $scope.loadDates();
                                },
                                function(response)
                                {
                                        console.log('Attendance Not Added');
                                        console.log(response);
                                });
                          }
                          else 
                          {
                                        console.log(x);
                                        Attendance.deleteById({id:x.id},function()
                                        {
                                          console.log('Attendance Deleted');
                                          $scope.loadDates();
                                        });

                          }
      }


 });