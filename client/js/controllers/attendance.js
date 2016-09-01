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
              Attendance.destroyById({id: p.id},function(){
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
      $scope.monthView = function() {

        $scope.monthList =[];
        var getDays = new Date($scope.yearSelected,parseInt($scope.monthSelected)+1,0).getDate();
        $scope.monthDays = function(){   return new Array(getDays);    }
        $scope.list = Student.find({filter: {where: {classId: $scope.classSelectedMonth}}}, function (response) {
          var i=0;
          $scope.status=[];
          response.forEach(function(list){

            var student = list.toJSON();
            if (student.RFID){
                    //-----------
                    Attendance.find(
                      {
                        filter:
                        {
                          where: {RFID:student.RFID,month:parseInt($scope.monthSelected),year:$scope.yearSelected,
                                   day:
                                   {
                                         between:[1,getDays]
                                    }
                          }
                        }
                      },
                      function(response){
                        $scope.status=[];
                        response.forEach(function(data){
                          var data = data.toJSON();
                          $scope.status[parseInt(data.day)-1]= true;
                        });
                       if($scope.status.length ==0){
                         for(var s=0;s<getDays;s++) {$scope.status[s] =false;}

                       }
                        $scope.monthList[i]= {studentId:student.id,firstName:student.firstName,rollNo:student.rollNo,RFID:student.RFID,status:$scope.status};


                        i++;

                      },function(){

                         for(var s=0;s<getDays;s++) $scope.status[s] =false;
                        $scope.monthList[i] = { studentId :student.id,firstName:student.firstName,rollNo:student.rollNo,RFID:student.RFID,status:$scope.status};
                        i++;

                      }
                    );
                    //  -----------
                  }
                  else{
                    for(var s=0;s<getDays;s++) {$scope.status[s] =false;}
                    $scope.monthList[i] = { studentId :student.id,firstName:student.firstName,rollNo:student.rollNo,status:$scope.status};
                    i++;

                  }


          });
        });

      }


      //-----------------------------------
      // DAY VIEW
      //------------------------------------



      $scope.loadDates = function() {
        
        if ($scope.dateSelected <= new Date())  {

                              $scope.studentList = [];
                              $scope.presentCount=0;
                              $scope.absentCount=0;
                              $scope.blockedCount=0;

      
                                $scope.list = Student.find({filter: {where: {classId: $scope.classSelected},include:'school'}}, function () {
                                    for (var i = 0; i < $scope.list.length; i++) {
                                    if ( $scope.list[i].RFID.length != 0){
                                        $scope.chk($scope.list[i].id, $scope.list[i].firstName,i,$scope.list[i].RFID,$scope.list[i].rollNo,$scope.list[i].school.code);
                                      }
                                    else{
                                  $scope.blockedCount++;
                                  $scope.studentList[i] ={id:$scope.list[i].id,firstName : $scope.list[i].firstName,rollNo:$scope.list[i].rollNo,status:"Blocked"};
                                    }

                                    }
                                  });
                       
			  }
        else{
          alert('Future Date Is Not Accepted');
        }
      }





    //-------------------------------- 
    //  CHK ATTENDANCE
    // ------------------------------

                                  $scope.chk = function(studentId,firstName,i,RFID,rollNo,schoolCode)
                                  {
                                    var day = parseInt($scope.dateSelected.getDate());
                                    var month = parseInt($scope.dateSelected.getMonth());
                                    var year = parseInt($scope.dateSelected.getFullYear());
                                    var schoolCode = parseInt(schoolCode);
                                    $scope.attendanceRecord = Attendance.findOne(
                                        {
                                          filter:
                                            {
                                              where:
                                                {
                                                  RFID:RFID,
                                                  day        : day,
                                                  month      : month,
                                                  year       : year,
                                                  schoolCode : schoolCode
                                                }
                                            }
                                        },
                                        function(response)
                                        {
                                            $scope.presentCount++;

                                            $scope.studentList[i] ={id:studentId ,firstName :firstName,RFID:RFID,rollNo :rollNo,attendanceId :response.id,status:true,schoolCode:schoolCode};

                                        },
                                        function()
                                        {
                                          $scope.absentCount++;
                                                console.log('RFID:'+ RFID + ' Is Absent');
                                          $scope.studentList[i] ={id:studentId,firstName : firstName,RFID:RFID,rollNo:rollNo,status:false,schoolCode:schoolCode};
                                        });



                                  }

     
    //-------------------------------- 
    //  ADD ATTENDANCE
    // ------------------------------
      $scope.addAttendance = function(x){
                          if (x.status == true) {
                            Attendance.findOne({filter:{where:{RFID:x.RFID,"day":$scope.dateSelected.getDate(),"month":$scope.dateSelected.getMonth(),"year":$scope.dateSelected.getFullYear()}}},function(){

                            },function(){
                              Attendance.create({RFID:x.RFID,"day":$scope.dateSelected.getDate(),"month":$scope.dateSelected.getMonth(),"year":$scope.dateSelected.getFullYear()});
                              $scope.studentList=[];
                              $scope.loadDates();
                              console.log('Attendance Added');

                            });

                          }
                          else {
                            console.log(x.attendanceId);
                            if (x.attendanceId != null) {
                              Attendance.delete({id:JSON.stringify(x.attendanceId).replace(/["']/g, "")},function(){
                                console.log('Attendance Deleted');
                                $scope.loadDates();

                              },function(response){ console.log(response.data.error.message);});
                            }
                          }
                        }


 })