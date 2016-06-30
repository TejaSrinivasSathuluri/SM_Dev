angular
  .module('app')
  .directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);

                     });
                  });
               }
            };
         }])
  .service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function(file, uploadUrl){
               var fd = new FormData();
               fd.append('file', file);
               $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })

               .success(function(response){
                 console.log("Uploaded File" + response.result.files);
               })

               .error(function(response){
                 console.log("File Not Upload Because" + JSON.stringify(response));
               });
            }
         }])
  .value('THROTTLE_MILLISECONDS', 250)

  .controller('LandingPageController',
    ['$scope', 'Admin','Student' ,'Parent','Staff','Noticeboard','School','$window','$rootScope','$filter','$state',
    function ($scope,Admin,Student,Parent,Staff,Noticeboard,School,$window,$rootScope,$filter,$state) {
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
        $scope.schoolName= null;
        $scope.schoolId = $scope.userData.schoolId;
        $scope.date = new Date();

        if (Parent)
        {

          $scope.listStudent = Student.find({filter:{where:{fatherEmail:$scope.userData.email}}},function(response){

            response.forEach = function(listStudent){
              var student = listStudent.toJSON();
              StudentParent.create({studentId:student.id,parentId:userData.id,schoolId:$scope.schoolId});
            }
          });
          console.log($scope.listStudent);

        }
        else{

          $scope.school = School.findById({id:$scope.schoolId},function(){ $rootScope.schoolName = $scope.school.schoolName;});

          // --------------------------------------------------------
          //                  GET NOTICE LIST
          // --------------------------------------------------------
          var day =$filter('date')(new Date(), 'yyyy-MM-dd');
          $scope.noticeList = Noticeboard.find({filter:{where:{schoolId:$scope.schoolId,date1:{lt:day},date2:{gt:day}}}});


          //--------------------------------------------------------
          //                   CALENDAR
          // --------------------------------------------------------
          //
          $scope.changeMode = function (mode) {
            $scope.mode = mode;
          };

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
              console.log($scope.noticeList[i].date1);
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
          }, function (response) {
            $scope.birthdayList =[];
            var j =0;
            for(var i=0;i<$scope.studentList.length;i++)
            {
              var a =  $filter('date')(new Date($scope.studentList[i].dateofBirth), 'MM-dd')    ;
              var b =  $filter('date')(new Date(), 'MM-dd')    ;
              var c= (new Date(a)-new Date(b)) / (1000 * 3600 * 24);
              if ( c ==0){
                $scope.birthdayList[j] = { studentId:$scope.studentList[i].id,firstName:$scope.studentList[i].firstName,
                  class:($scope.studentList[i].class.className + '-' +$scope.studentList[i].class.sectionName),
                  dateofBirth:$scope.studentList[i].dateofBirth};
                j++;
              }
            }
          }, function (response) {
            if (response.status =401) $state.go('logout', {}, {reload: true}) ;
          });
        }



      }













   }])


  .controller('DirectoryController',
    ['$scope', 'ngDialog','Admin', '$state', 'School', 'Class', 'Student', 'Parent', 'StudentParent', 'Staff', '$rootScope', '$window','Container','fileUpload','$filter',
      function ($scope,ngDialog, Admin, $state, School, Class, Student, Parent, StudentParent, Staff, $rootScope, $window,Container,fileUpload,$filter) {


        //--------------------------------------------------------
        //                  BASIC USER DATA
        // --------------------------------------------------------

        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.schoolName= null;
        $scope.schoolId = $scope.userData.schoolId;
        $scope.date = new Date();
        $scope.school = School.findById({id:$scope.schoolId},function(){ $rootScope.schoolName = $scope.school.schoolName;});




        //--------------------------------------------------------
        //                  GET CLASS LIST
        // --------------------------------------------------------

        $scope.classList = Class.find   ({filter: {where: {schoolId: $scope.schoolId}}}, function (response) {
        }, function (response) {
          console.log("Classes "+response.data.error.message);
        });

        $scope.studentList = Student.find({
          filter: {
            where: {schoolId: $scope.schoolId},
            include: 'class'
          }
        }, function (response) {
        }, function (response) {
            if (response.status =401) $state.go('logout', {}, {reload: true}) ;
        });






        if (Admin) {
          $scope.studentParent = StudentParent.find({filter: {where: {schoolId: $scope.schoolId}, include: 'parent'}},
            function (response) {
              var i = 0;
              $scope.parentList = [];
              response.forEach(function (studentParent) {
                $scope.p = studentParent.toJSON();
                $scope.parentList[i] = $scope.p.parent;
                i++;
              }, $scope.parentList);

            }, function (response) {
              console.log("StudentParent Data " + response.data.error.message);
              if (response.status = 401) $state.go('logout', {}, {reload: true});
            });
        }
        else if (Student){
          $scope.studentParent = StudentParent.find({filter: {where: {studentId: $scope.userData.id}, include: 'parent'}},
            function (response) {
              var i = 0;
              $scope.parentList = [];
              response.forEach(function (studentParent) {
                $scope.p = studentParent.toJSON();
                $scope.parentList[i] = $scope.p.parent;
                i++;
              }, $scope.parentList);

            }, function (response) {
              console.log("StudentParent Data " + response.data.error.message);
              if (response.status = 401) $state.go('logout', {}, {reload: true});
            });
        }


        //$scope.searchList = $scope.studentList;
         $scope.searchList = [];




        //--------------------------------------------------------
        //                  PROCESS SEARCH FORM
        // --------------------------------------------------------
        $scope.processSearch = function (searchUser) {



          $scope.searchList = [];

                  if      (searchUser   == 't') {
                    $scope.studentBox = false;$scope.parentBox = false;

                    if($scope.formData.staffSearch)
                    {
                      $scope.studentBox = true;
                      $scope.parentBox = true;
                      $scope.rollSearch = true;
                      $scope.classSearch = true;
                    $scope.searchList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}});
                    }
                  }
                  else if (searchUser  == 'p') {
                    alert('Parent Access is Under Developement. Will Be Activated Soon');
                    //$scope.studentBox = false;$scope.staffBox = false;
                    //if($scope.formData.parentSearch) {
                    //  $scope.studentBox = true;
                    //  $scope.staffBox = true;
                    //  $scope.rollSearch = true;
                    //  $scope.classSearch = true;
                    //  $scope.searchList = $scope.parentList;
                    //}
                  }
                  else if (searchUser  == 's') {
                      $scope.parentBox = false;$scope.staffBox = false;$scope.rollSearch = true;$scope.classSearch = true;
                      if($scope.formData.studentSearch) {
                        $scope.parentBox = true;
                        $scope.staffBox = true;
                        $scope.rollSearch = false;
                        $scope.classSearch = false;
                        $scope.searchList = $scope.studentList;
                      }
                  }
                  else    $state.go($state.current, {}, {reload: true});
        }



        if ('Admin') {

          //--------------------------------------------------------
          //                  CLEAR FORM
          // --------------------------------------------------------
          $scope.clearForm = function () {
            $scope.formData = {};
          }

          //--------------------------------------------------------
          //                  EMAIL CHECK
          // --------------------------------------------------------
          $scope.checkEmail = function(type){
            if( type == 'S')
            {
              if ($scope.formData.email)
              {
                console.log($scope.formData.email);
                $scope.emailCheck = Student.findOne({filter: {where: {email: $scope.formData.email}}},function(){
                    alert('Email Already Exists');
                  },
                  // Email Is Not Conflicting
                  function(){             });

              }
            }
            else if ( type == 'ST')
            {
              $scope.emailCheck = Staff.findOne({filter: {where: {email: $scope.formData.email}}},function(){
                  alert('Email Already Exists');
                },
                // Email Is Not Conflicting
                function(){             });
            }
            else if(type =='P')
            {
              $scope.emailCheck = Parent.findOne({filter: {where: {email: $scope.formData.fatherEmail}}},function(){
                  var dialog = ngDialog.open({template: 'linkParent'});
                  dialog.closePromise.then(function (data) {
                    if (data.value && data.value != '$document' && data.value != '$closeButton') {
                      StudentParent.create({ parentId: $scope.emailCheck.id,schoolId: $scope.schoolId});
                    }

                    return true;
                  });
                },

                // Email Is Not Conflicting
                function(){             });
            }

          }

          //--------------------------------------------------------
          //                  ROLL NUMBER CHECK
          // --------------------------------------------------------
          $scope.checkRollnoExists = function() {
            $scope.RollnoExists = false;

            if($scope.formData.rollNo != null && $scope.formData.classId != null){
              $scope.checkRoll = Student.findOne({filter:{where:{classId :$scope.formData.classId,rollNo:$scope.formData.rollNo}}},
              function(){
                $scope.RollnoExists =true;
              });
            }
          }


          $scope.checkRollnoExistsEdit = function() {
            $scope.RollnoExists = false;
            if($scope.editData.rollNo != null && $scope.editData.classId != null){
              $scope.checkRoll = Student.findOne({filter:{where:{classId :$scope.editData.classId,rollNo:$scope.editData.rollNo}}},
                function(){
                  $scope.RollnoExists =true;
                });
            }
          }





          // --------------------------------------------------------
          //                  ADD STUDENT  STARTS
          // --------------------------------------------------------
          $scope.addStudentForm = function () {
            ngDialog.openConfirm({ template: 'addStudent',scope: $scope }).then(
              function (formData) {
                $scope.studentExists = Student.findOne({filter: {where: {classId:formData.classId,rollNo:formData.rollNo}}},
                  function () { $scope.response = 'Student Already Exists For This Class With This Roll Number';},
                  function () {

                    var date1 = new Date(formData.dateofBirth);
                    var date2 = new Date(formData.dateofJoin);
                    formData.dateofBirth = new Date(date1.setDate(formData.dateofBirth.getDate()+1));
                    formData.dateofJoin  = new Date(date2.setDate(formData.dateofBirth.getDate()+1));

                      $scope.newStudent = Student.create({
                      schoolId        : $scope.schoolId,
                      firstName       : formData.firstName,
                      lastName        : formData.lastName,
                      email           : formData.email,
                      password        : formData.password,
                      gender          : formData.gender,
                      dateofBirth     : formData.dateofBirth,
                      rollNo          : formData.rollNo,
                      RFID            : formData.RFID,
                      previousSchool  : formData.previousSchool,
                      dateofJoin      : formData.dateofJoin,
                      classId         : formData.classId,
                      status          : "A",
                      regId           : formData.regId,
                      isDisable       : formData.isDisable,
                      currentAddress  : formData.currentAddress,
                      currentCity     : formData.currentCity,
                      currentState    : formData.currentState,
                      currentPincode  : formData.currentPincode,
                      bloodGroup      : formData.bloodGroup,
                      religion        : formData.religion,
                      caste           : formData.caste,
                      alternateContact: formData.alternateContact,
                      permanentAddress: formData.permanentAddress,
                      permanentCity   : formData.permanentCity,
                      permanentState  : formData.permanentState,
                      permanentPincode: formData.permanentPincode,
                      nationalId      : formData.nationalId,
                      motherTounge    : formData.motherTounge,
                      nationalIdType  : formData.nationalIdType,
                      subCaste        : formData.subCaste,
                      contact         : formData.contact,
                      type            : "Student",
                      created         : new Date(),
                      fatherEmail     : formData.fatherEmail,
                      motherEmail     : formData.motherEmail,
                      fatherName      : formData.fatherName,
                      motherName      : formData.motherName

                    },
                      function () {
                        $scope.response = 'Student Added Successfully';
                        $scope.error = true;

                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 1000 );
                      },
                      function (response) {
                        $scope.response = 'Student Not Created.PleaseCheck All the Fields';
                        $scope.error = true;

                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 2000 );

                        console.log(response.data.error.message);
                      }
                    );

                  });

              },
              function (value) {
              }
            );



          }



          //--------------------------------------------------------
          //                 EDIT STUDENT/PARENT/STAFF STARTS
          //--------------------------------------------------------

          $scope.editUser = function (x) {
            if (x.type == "Student") {
              $scope.editData = {};
              $scope.editData = x;
              $scope.classId = x.classId;
              $scope.rollNo = x.rollNo;

              $scope.editData.dateofBirth = $filter('date')(new Date(x.dateofBirth), 'yyyy-MM-dd');
              var d = new Date($scope.editData.dateofBirth);
              var date2 = new Date(d);
              $scope.editData.dateofBirth = new Date(date2.setDate(d.getDate()));
              $scope.editData.dateofBirth = new Date($scope.editData.dateofBirth);
              //console.log($scope.editData.dateofBirth);


              $scope.editData.dateofJoin = $filter('date')(new Date(x.dateofJoin), 'yyyy-MM-dd');
              var d = new Date($scope.editData.dateofJoin);
              var date2 = new Date(d);
              $scope.editData.dateofJoin = new Date(date2.setDate(d.getDate()));
              $scope.editData.dateofJoin = new Date($scope.editData.dateofJoin);


              ngDialog.openConfirm({
                template: 'editStudent',
                scope: $scope
              }).then(
                function (editData) {

                  if ($scope.classId == editData.classId && $scope.rollNo == editData.rollNo){

                    Student.prototype$updateAttributes({id: x.id}, {
                        firstName            : editData.firstName,
                        lastName             : editData.lastName,
                        email                : editData.email,
                        gender               : editData.gender,
                        dateofBirth          : editData.dateofBirth,
                        rollNo               : editData.rollNo,
                        classId              : editData.classId,
                        RFID                 : editData.RFID,
                        previousSchool       : editData.previousSchool,
                        dateofJoin           : editData.dateofJoin,
                        status               : editData.status,
                        regId                : editData.regId,
                        isDisable            : editData.isDisable,
                        currentAddress       : editData.currentAddress,
                        currentCity          : editData.currentCity,
                        currentState         : editData.currentState,
                        currentPincode       : editData.currentPincode,
                        bloodGroup           : editData.bloodGroup,
                        religion             : editData.religion,
                        caste                : editData.caste,
                        alternateContact     : editData.alternateContact,
                        permanentAddress     : editData.permanentAddress,
                        permanentCity        : editData.permanentCity,
                        permanentState       : editData.permanentState,
                        permanentPincode     : editData.permanentPincode,
                        nationalId           : editData.nationalId,
                        motherTounge         : editData.motherTounge,
                        nationalIdType       : editData.nationalIdType,
                        subCaste             : editData.subCaste,
                        contact              : editData.contact,
                        fatherEmail          : editData.fatherEmail,
                        motherEmail          : editData.motherEmail,
                        fatherName           : editData.fatherName,
                        motherName           : editData.motherName

                      },
                      function () {

                        $scope.response = 'Student Updated Successfully';
                        $scope.error = true;

                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 1000 );
                      },
                      function (response) {
                        alert('Student Is Not Saved.Please Check The Fields');
                        $scope.error =true ;
                        console.log(response.data.error.message);
                      });

                  }
                  else{
                    $scope.studentExists = Student.findOne({filter: {where: {classId:editData.classId,rollNo:editData.rollNo},include:'class'}},
                      function () {
                        $scope.error = true;
                        $scope.response = 'Student Already Exists In Class';

                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 3000 );
                      },
                      function () {
                        Student.prototype$updateAttributes({id: x.id}, {
                            firstName            : editData.firstName,
                            lastName             : editData.lastName,
                            email                : editData.email,
                            gender               : editData.gender,
                            dateofBirth          : editData.dateofBirth,
                            rollNo               : editData.rollNo,
                            classId              : editData.classId,
                            RFID                 : editData.RFID,
                            previousSchool       : editData.previousSchool,
                            dateofJoin           : editData.dateofJoin,
                            status               : editData.status,
                            regId                : editData.regId,
                            isDisable            : editData.isDisable,
                            currentAddress       : editData.currentAddress,
                            currentCity          : editData.currentCity,
                            currentState         : editData.currentState,
                            currentPincode       : editData.currentPincode,
                            bloodGroup           : editData.bloodGroup,
                            religion             : editData.religion,
                            caste                : editData.caste,
                            alternateContact     : editData.alternateContact,
                            permanentAddress     : editData.permanentAddress,
                            permanentCity        : editData.permanentCity,
                            permanentState       : editData.permanentState,
                            permanentPincode     : editData.permanentPincode,
                            nationalId           : editData.nationalId,
                            motherTounge         : editData.motherTounge,
                            nationalIdType       : editData.nationalIdType,
                            subCaste             : editData.subCaste,
                            contact              : editData.contact,
                            fatherEmail          : editData.fatherEmail,
                            motherEmail          : editData.motherEmail,
                            fatherName           : editData.fatherName,
                            motherName           : editData.motherName

                          },
                          function () {

                            $scope.response = 'Student Updated Successfully';
                            $scope.error = true;

                            setTimeout( function()
                            {
                              $state.go($state.current, {}, {reload: true});
                              $scope.$apply();
                            }, 1000 );
                          },
                          function (response) {
                            alert('Student Is Not Saved.Please Check The Fields');
                            $scope.error =true ;
                            console.log(response.data.error.message);
                          });
                      });

                  }


                },
                function (value) {
                }
              );
            }

            else if (x.type == "Staff") {
              $scope.editData = x;
              $scope.editData.dateofBirth = $filter('date')(new Date(x.dateofBirth), 'yyyy-MM-dd');
              var d = new Date($scope.editData.dateofBirth);
              var date2 = new Date(d);
              $scope.editData.dateofBirth = new Date(date2.setDate(d.getDate()));
              console.log($scope.editData.dateofBirth);
              $scope.editData.dateofBirth = new Date($scope.editData.dateofBirth);


              $scope.editData.dateofJoin = $filter('date')(new Date(x.dateofJoin), 'yyyy-MM-dd');
              var d = new Date($scope.editData.dateofJoin);
              var date2 = new Date(d);
              $scope.editData.dateofJoin = new Date(date2.setDate(d.getDate()));
              console.log($scope.editData.dateofJoin);
              $scope.editData.dateofJoin = new Date($scope.editData.dateofJoin);

              ngDialog.openConfirm({
                template: 'editStaff',
                scope: $scope
              }).then(
                function (editData) {
                  Staff.prototype$updateAttributes({id: x.id}, {
                      firstName          : editData.firstName,
                      lastName           : editData.lastName,
                      email              : editData.email,
                      password           : editData.password,
                      gender             : editData.gender,
                      dateofBirth        : editData.dateofBirth,
                      RFID               : editData.RFID,
                      previousSchool     : editData.previousSchool,
                      dateofJoin         : editData.dateofJoin,
                      regId              : editData.regId,
                      isDisable          : editData.isDisable,
                      currentAddress     : editData.currentAddress,
                      currentCity        : editData.currentCity,
                      currentState       : editData.currentState,
                      currentPincode     : editData.currentPincode,
                      bloodGroup         : editData.bloodGroup,
                      religion           : editData.religion,
                      caste              : editData.caste,
                      alternateContact   : editData.alternateContact,
                      permanentAddress   : editData.permanentAddress,
                      permanentCity      : editData.permanentCity,
                      permanentState     : editData.permanentState,
                      permanentPincode   : editData.permanentPincode,
                      nationalId         : editData.nationalId,
                      motherTounge       : editData.motherTounge,
                      nationalIdType     : editData.nationalIdType,
                      subCaste           : editData.subCaste,
                      contact            : editData.contact,
                      qualification      : editData.qualification,
                      qualifiedUniversity: editData.qualifiedUniversity,
                      percentage         : editData.percentage,
                      BED                : editData.BED

                    },
                    function () {
                      $state.go($state.current, {}, {reload: true});
                    },
                    function (response) {
                      console.log(response.data.error.message);
                    });
                },
                function (value) {
                }
              );
            }
          }



          //--------------------------------------------------------
          //                 ADD STAFF STARTS
          //--------------------------------------------------------

          $scope.addStaffForm = function () {
            ngDialog.openConfirm({ template: 'addStaff',scope: $scope }).then(
              function (formData) {
                    var date1 = new Date(formData.dateofBirth);
                    var date2 = new Date(formData.dateofJoin);
                    formData.dateofBirth = new Date(date1.setDate(formData.dateofBirth.getDate()+1));
                    formData.dateofJoin  = new Date(date2.setDate(formData.dateofBirth.getDate()+1));

                    $scope.newStaff = Staff.create({
                        schoolId           : $scope.schoolId,
                        firstName          : formData.firstName,
                        lastName           : formData.lastName,
                        email              : formData.email,
                        password           : formData.password,
                        gender             : formData.gender,
                        dateofBirth        : formData.dateofBirth,
                        RFID               : formData.RFID,
                        previousSchool     : formData.previousSchool,
                        dateofJoin         : formData.dateofJoin,
                        status             : "A",
                        regId              : formData.regId,
                        isDisable          : formData.isDisable,
                        currentAddress     : formData.currentAddress,
                        currentCity        : formData.currentCity,
                        currentState       : formData.currentState,
                        currentPincode     : formData.currentPincode,
                        bloodGroup         : formData.bloodGroup,
                        religion           : formData.religion,
                        caste              : formData.caste,
                        alternateContact   : formData.alternateContact,
                        permanentAddress   : formData.permanentAddress,
                        permanentCity      : formData.permanentCity,
                        permanentState     : formData.permanentState,
                        permanentPincode   : formData.permanentPincode,
                        nationalId         : formData.nationalId,
                        motherTounge       : formData.motherTounge,
                        nationalIdType     : formData.nationalIdType,
                        subCaste           : formData.subCaste,
                        contact            : formData.contact,
                        type               : "Staff",
                        created            : new Date(),
                        qualification      : formData.qualification,
                        qualifiedUniversity: formData.qualifiedUniversity,
                        percentage         : formData.percentage,
                        BED                : formData.BED

                      },
                      function () {
                        setTimeout( function()
                        {
                          formData.response = 'Staff Added Successfully';

                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 1000 );
                      },
                      function (response) {
                        console.log(response.data.error.message);
                      }
                    );



              },
              function (value) {         }
            );



          }







          //--------------------------------------------------------
          //                 DELETE STUDENT/PARENT/STAFF STARTS
          //--------------------------------------------------------

          $scope.deleteUser = function (x) {
            var dialog = ngDialog.open({template: 'deleteUser'});
            dialog.closePromise.then(function (data) {
              console.log(data.value);
              if (data.value && data.value != '$document' && data.value != '$closeButton'&& data.value != '$escape') {
							   if (x.type == "Student")    {
										Student.delete({id: x.id}, function ()
                    {
                              console.log('Student ' + x.firstName + ' ' + x.lastName +' Is Deleted');
                              $scope.resultStudentParent = StudentParent.find({
                                filter: {
                                  where: {
                                  studentId: x.id,
                                  schoolId: $scope.schoolId
                                  }
                                }
                                }, function (response) {
                                    response.forEach(function (resultStudentParent) {
                                    var p = resultStudentParent.toJSON();
                                    StudentParent.deleteById({id: p.id}, function () {
                                    console.log('deleting student and student relation with parent');
                                    $state.go($state.current, {}, {reload: true});
                                    }, function (response) {
                                    console.log(response.data.error.message);
                                    });
                                  });
                                  $state.go($state.current, {}, {reload: true});
                                  },
                                  function (response) {
                                  console.log(response.data.error.message);
                                  }
                                  );
												});

                  }
                else if (x.type == "Parent") {
                  Parent.delete({id: x.id}, function () {
                    $scope.resultStudentParent = StudentParent.find({
                        filter: {
                          where: {
                            parentId: x.id,
                            schoolId: $scope.schoolId
                          }
                        }
                      },
                      function (response) {
                        response.forEach(function (resultStudentParent) {
                          var p = resultStudentParent.toJSON();
                          StudentParent.deleteById({id: p.id}, function () {
                            console.log('deleting  parent and  parent relation with student');
                            $state.go($state.current, {}, {reload: true});
                          }, function (response) {
                            console.log(response.data.error.message);
                          });


                        });

                      }, function (response) {
                        console.log(response.data.error.message);
                      }
                    );
                  });

                }
                else if (x.type == "Staff") {
                  Staff.delete({id: x.id}, function () {
                    console.log('Staff' + x.firstName + ' ' + x.lastName + 'Deleted Successfully');
                    $state.go($state.current, {}, {reload: true});
                  });
                }
              }

              return true;
            });

          }








        }



        //--------------------------------------------------------
        //                 SHOW USER
        //--------------------------------------------------------
        $scope.showUser = function (x) {

          $scope.formData =x;
          if (x.type =='Student')        ngDialog.openConfirm({template: 'showStudent', scope: $scope});
          else if (x.type =='Parent')    ngDialog.openConfirm({template: 'showParent', scope: $scope});
          else if (x.type =='Staff')     ngDialog.openConfirm({template: 'showStaff', scope: $scope});

        }





        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'firstName';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 15;

        $scope.numberOfPages=function(){return Math.ceil($scope.searchList.length/$scope.pageSize);}

      }
    ])

  .controller('ClassController',
    ['$scope', 'Admin', '$state', 'School', 'Class', 'Student', 'Staff', '$rootScope', '$window','ngDialog',
      function ($scope, Admin, $state, School, Class, Student, Staff, $rootScope, $window,ngDialog) {

        //--------------------------------------------------------
        //                  BASIC USER DATA
        // --------------------------------------------------------
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.schoolId = $scope.userData.schoolId;
        $scope.formData = [];

        if($scope.Student){
          $scope.classList = Class.find  ({filter: {where: {id:$scope.userData.classId}, include: 'staff'}},function(){},function(response){if (response.status =401) $state.go('logout', {}, {reload: true}) ;});
        }

        if ($scope.Admin) {
          $scope.staffList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}},function(){},function(response){if (response.status =401) $state.go('logout', {}, {reload: true}) ;});
          $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}, include: 'staff'}},function(){},function(response){if (response.status =401) $state.go('logout', {}, {reload: true}) ;});

		  //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
		   $scope.clearResponse = function (){
			   $scope.response = null;
			   $scope.responseAddClass = null;
         $scope.formData=null;
		   }


          //--------------------------------------------------------
          //                  ADD CLASS
          // --------------------------------------------------------

          $scope.addClass = function () {
            $scope.classExists = Class.findOne({
                filter: {
                  where: {
                    schoolId: $scope.schooId,
                    className: $scope.formData.className,
                    sectionName: $scope.formData.sectionName
                  }
                }
              },
              function () {
                $scope.responseAddClass = 'Class Already Exists';
              },
              function () {
                Class.create({
                    schoolId: $scope.schoolId,
                    className: $scope.formData.className,
                    sectionName: $scope.formData.sectionName,
                    staffId: $scope.formData.staffSelected
                  }, function () {

			  $scope.responseAddClass = "Class "+ $scope.formData.className + "-" + $scope.formData.sectionName + " Created Successfully";
                    setTimeout( function()
                    {
                      $state.go($state.current, {}, {reload: true});
                      $scope.$apply();
                    }, 1000 );
                  },
                  function (response) {
                    console.log(response.data.error.message);
                  });

              });
          }

          //--------------------------------------------------------
          //                  UPDATE CLASS
          // --------------------------------------------------------
          $scope.updateClass = function (x) {
            Class.upsert({id: x.id, staffId: x.staff.id}, function (response) {
				$scope.response="Class " + x.className + "-" + x.sectionName +" Updated Successfully With " + x.staff.firstName;
              setTimeout( function()
              {
                $state.go($state.current, {}, {reload: true});
                $scope.$apply();
              }, 1000 );
            });

          }

          //--------------------------------------------------------
          //                  DELETE CLASS
          // --------------------------------------------------------
          $scope.deleteClass = function (x) {
            var dialog = ngDialog.open({template: 'deleteClass'});
            dialog.closePromise.then(function (data) {
              $scope.response="Class Deleted Successfully";
              if (data.value && data.value != '$document' && data.value != '$closeButton') Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
              setTimeout( function()
              {
                $state.go($state.current, {}, {reload: true});
                $scope.$apply();
              }, 1000 );
              return true;
            });
          }
        }
      // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'className';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.classList.length/$scope.pageSize);}

	  }
    ])

  .controller('SubjectController',
    ['$scope', 'Admin', '$state', 'School', 'Class', 'Student', 'Staff', 'Subject', '$rootScope', '$window','ngDialog',
      function ($scope, Admin, $state, School, Class, Student, Staff, Subject, $rootScope, $window,ngDialog) {
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        $scope.schoolId = $scope.userData.schoolId;
        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.formData = [];
        if($scope.Admin) {

		  //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
		   $scope.clearResponse = function (){
			   $scope.formData = null;
			   $scope.response = null;
			   $scope.responseAddSubject = null;
		   }

          $scope.staffList = Staff.find  ({filter: {where: {schoolId: $scope.schoolId}}}, function () {
          }, function (response) {
            if (response.status = 401) $state.go('logout', {}, {reload: true});
          });


          $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}}, function () {
          }, function (response) {
            if (response.status = 401) $state.go('logout', {}, {reload: true});
          });


          $scope.subjectList = Subject.find({filter: {include: ['staff', 'class']}});



          $scope.addSubject = function () {

            $scope.checkSub = Subject.findOne({
                filter: {
                  where: {
                    classId: $scope.formData.classSelected,
                    subjectName: $scope.formData.subjectName
                  }
                }
              },
              function () {
							$scope.responseAddSubject = 'Subject' +$scope.formData.subjectName + ' Already Exists.';
              },
              function () {
							Subject.create({
								subjectName: $scope.formData.subjectName,
								classId: $scope.formData.classSelected,
								staffId: $scope.formData.staffSelected
							  },
							  function () {

									$scope.responseAddSubject ="Subject "+ $scope.formData.subjectName + " created Successfully in Class";
                  setTimeout( function()
                  {
                    $state.go($state.current, {}, {reload: true});
                    $scope.$apply();
                  }, 1000 );
							  },
							  function () {


							  }
							);
              });

          }


          $scope.updateSubject = function (a) {
            $scope.responseAddSubject ="Subject "+ $scope.formData.subjectName + " Edited Successfully";
						Subject.upsert({id: a.id, staffId: a.staff.id},
						  function () {
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
						  },
						  function (response) {
							console.log(response.data.error.message);
						  });
          }


          $scope.deleteSubject = function (x) {

            var dialog = ngDialog.open({template: 'deleteSubject'});
            dialog.closePromise.then(function (data) {

              if (data.value && data.value != '$document' && data.value != '$closeButton') {
                Subject.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
              }
              return true;
            });

          }
        }
        else if ($scope.Student){
          $scope.subjectList = Subject.find({filter: {where:{classId:$scope.userData.classId},include: ['staff', 'class']}});

        }
		// --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'subjectName';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.subjectList.length/$scope.pageSize);}



      }])

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
      $scope.viewTimetable = [];
      $scope.viewTimetable = School.timetables({"id": $scope.schoolId}, function (response) {
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
            if ($scope.receivers[$scope.receivers.length - 1].title.length != 0 && $scope.receivers[$scope.receivers.length - 1].startTime != null && $scope.receivers[$scope.receivers.length - 1].endTime != null) {
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

  .controller('ScheduleController',
    ['$scope', 'Admin', '$state', 'School', 'Class', 'Subject', 'Schedule', 'Timetable', '$rootScope', '$window',
    function ($scope, Admin, $state, School, Class, Subject, Schedule, Timetable, $rootScope, $window) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      $scope.schoolId = $scope.userData.schoolId;
      $scope.scheduleList = [];

      if ($scope.Admin) {
        $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
        $scope.loadSchedule = function () {
          $scope.subjectList = Subject.find({filter: {where: {classId: $scope.class}}});
          $scope.viewTimetable = School.timetables({"id": $scope.schoolId}, function () {
            $scope.chkSchedule = Schedule.findOne({
                filter: {
                  where: {
                    timetableId: $scope.viewTimetable.id,
                    classId: $scope.class
                  }
                }
              },
              function () {
                $scope.scheduleList = $scope.chkSchedule.schedule;

              },
              function () {

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
      else if ($scope.Student){
          $scope.subjectList = Subject.find({filter: {where: {classId:$scope.userData.classId}}});
          $scope.viewTimetable = School.timetables({id: $scope.schoolId,classId:$scope.userData.classId}, function () {
          $scope.chkSchedule = Schedule.findOne({
                filter: {
                  where: {
                    timetableId: $scope.viewTimetable.id,
                    classId: $scope.userData.classId
                  }
                }
              },
              function () {
                $scope.scheduleList = $scope.chkSchedule.schedule;

              },
              function () {

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




      }
}])

  .controller('NoticeboardController',
    ['$scope', '$state', 'School', 'Noticeboard', '$rootScope', '$window','ngDialog','$filter','Container','fileUpload','$location',
    function ($scope, $state, School, Noticeboard, $rootScope, $window,ngDialog,$filter,Container,fileUpload,$location) {

      //------------------------------------------------
      //            BASIC USER DATA
      //------------------------------------------------

      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      var baseApi = $location.$$protocol + "://"+ $location.$$host + ":" +$location.$$port + "/api/Containers/noticeboard/download/";


      //------------------------------------------------
      //            ADD NOTICE
      //------------------------------------------------

      $scope.addNotice = function () {


        ngDialog.openConfirm({template: 'addNotice',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            console.log(formData);
            formData.date1 = $filter('date')(new Date(formData.date1), 'yyyy-MM-dd');
            formData.date2 = $filter('date')(new Date(formData.date2), 'yyyy-MM-dd');
            Noticeboard.create({title : formData.title,description: formData.description,date1: formData.date1,
              date2:formData.date2,schoolId:$scope.schoolId,
              uploadFile:formData.uploadFile},
              function ()
              {
                $scope.responseNotice = "Notice Added Successfully";
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );

              },function(response){
                console.log(response.data.error.message);
              });

              },
              function (value)
              {

              }
        );

      }



      //------------------------------------------------
      //            SHOW NOTICE BOARD
      //------------------------------------------------

      $scope.noticeList = [];
      $scope.noticeList = Noticeboard.find({filter: {where: {schoolId: $scope.schoolId}}});

      //------------------------------------------------
      //            DELETE NOTICE BOARD
      //------------------------------------------------

      $scope.deleteNotice = function (x) {
        var dialog = ngDialog.open({template: 'deleteNotice'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document' && data.value != '$closeButton')
            Noticeboard.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")},function(){
              $scope.responseNotice = "Notice Deleted Successfully";
              setTimeout( function()
              {
                $state.go($state.current, {}, {reload: true});
                $scope.$apply();
              }, 1000 );
              Container.removeFile({container:"noticeboard",file:x.name},function(){
                console.log("File Deleted");
              },function(response){
                console.log(response.data.error.message);
              });
            });
          $state.go($state.current, {}, {reload: true});
          return true;
        });

      }

      //------------------------------------------------
      //            EDIT NOTICE BOARD
      //------------------------------------------------

      $scope.editNotice = function (x) {
		    $scope.title = x.title;
		    $scope.formData = {description:x.description};
		    $scope.date1 = $filter('date')(new Date(x.date1), 'yyyy-MM-dd');
		    $scope.date2 = $filter('date')(new Date(x.date2), 'yyyy-MM-dd');
		   ngDialog.openConfirm({template: 'editNotice',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            Noticeboard.upsert({id:x.id, title : formData.title,description: formData.description,date1: formData.date1,date2:formData.date2,uploadFile:formData.uploadFile},
              function () {
                $scope.responseNotice = "Notice Saved Successfully";
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
              });
          },
          function(value) {
            $scope.responseNotice = "Notice Was Not Edited.Please Fill All Required Fields";
            setTimeout( function()
            {
              $state.go($state.current, {}, {reload: true});
              $scope.$apply();
            }, 1000 );

          }
        );
      }

        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'title';
      $scope.sortReverse  = false;
      $scope.searchFish   = '';
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.numberOfPages=function(){    return Math.ceil($scope.noticeList.length/$scope.pageSize);}





    }])

  .controller('LibraryController',
    ['$scope', '$state', 'School', 'Library', '$rootScope', '$window','ngDialog',
    function ($scope, $state, School, Library, $rootScope, $window,ngDialog) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      $scope.addLibrary = function () {



              ngDialog.openConfirm({template: 'addBook',
                scope: $scope //Pass the scope object if you need to access in the template
              }).then(
                function(formData) {


                  Library.findOne({filter:{where:{schoolId: $scope.schoolId, name: formData.name, author: formData.author}}},function(){

                    $scope.responseAddLibrary = "Book & Author Combination Already Exists";
                    setTimeout( function()
                    {
                      $state.go($state.current, {}, {reload: true});
                      $scope.$apply();
                    }, 1000 );

                  }, function () {
                    Library.create({
                      schoolId: $scope.schoolId, name: formData.name, author: formData.author,
                      description: formData.description, price: formData.price, available: formData.available
                    }, function () {
                      $scope.responseAddLibrary="Book Added Successfully.";
                      setTimeout( function()
                      {

                        $state.go($state.current, {}, {reload: true});
                        $scope.$apply();
                      }, 500 );


                    },function(response){
                      console.log(response.data.error.message);
                    });

                  });

                },
                function (value)
                {

                }
              );


	}
      $scope.libraryList = [];
      $scope.libraryList = Library.find({filter: {where: {schoolId: $scope.schoolId}}});

      $scope.deleteLibrary = function (x) {
         var dialog = ngDialog.open({template: 'deleteLibrary'});

        dialog.closePromise.then(function (data) {

          if (data.value && data.value != '$document' && data.value != '$closeButton') {
            Library.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")},function(){

				  $scope.responseAddLibrary = "Book Deleted Successfully";
				   setTimeout( function()
						{
						   	$state.go($state.current, {}, {reload: true});

						}, 500 );
			});



          }
          return true;
        });

      }
      $scope.editLibrary = function (x) {
		    $scope.name = x.name;
		    $scope.author = x.author;
		    $scope.price = x.price;
		    $scope.available = x.available;
		    $scope.formData = {description:x.description};
		   ngDialog.openConfirm({template: 'editLibrary',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            console.log(x.id);
            Library.upsert({id:x.id, name : formData.name,author : formData.author,description: formData.description,price: formData.price,available:formData.available},
              function () {
				  $scope.responseAddLibrary = "Book Edited Successfully";
				   setTimeout( function()
						{
						   	$state.go($state.current, {}, {reload: true});
							$scope.$apply();
						}, 500 );
			  });
          },
          function(value) {}
        );
      }

        $scope.sortType     = 'className';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.libraryList.length/$scope.pageSize);}


    }])

  .controller('AssignmentController',
    ['$scope', '$state', 'Class', 'Assignment', '$rootScope', '$window','ngDialog','$filter','fileUpload','Container','$location','$http',
    function ($scope, $state, Class, Assignment, $rootScope, $window,ngDialog,$filter,fileUpload,Container,$location,$http) {

      //--------------------------------------------------------
      //                 GET USER DATA && INITIALIZATION
      //--------------------------------------------------------
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      var baseApi = $location.$$protocol + "://"+ $location.$$host + ":" +$location.$$port + "/api/Containers/assignments/download/";


      if ($scope.Admin) {


        //--------------------------------------------------------
        //                 GET CLASS LIST
        //--------------------------------------------------------
        $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});


        //--------------------------------------------------------
        //                 ADD ASSIGNMENT
        //--------------------------------------------------------

        $scope.addAssignment = function () {


          ngDialog.openConfirm({template: 'addAssignment',
            scope: $scope //Pass the scope object if you need to access in the template
          }).then(
            function(formData) {
              console.log(formData);
              formData.fromDate = $filter('date')(new Date(formData.fromDate), 'yyyy-MM-dd');
              formData.toDate = $filter('date')(new Date(formData.toDate), 'yyyy-MM-dd');
              if (formData.myFile != null) {
                alert('M');
                $scope.downloadFile = baseApi + formData.myFile.name;
                var file = formData.myFile;
                var uploadUrl = "/api/Containers/assignments/upload";
                var uploadUrl2 = "http://localhost:3000/api/Containers/assignments/upload";
                fileUpload.uploadFileToUrl(file, uploadUrl);
                //var fd = new FormData();
                //fd.append('file', file);
                //$http.post(uploadUrl, fd, {
                //  transformRequest: angular.identity,
                //  headers: {'Content-Type': undefined}
                //},function(response){
                //  console.log(response);
                //});
              }

              Assignment.create({
                  schoolId    : $scope.schoolId,
                  title       : formData.title,
                  classId     : formData.classSelected,
                  description : formData.description,
                  fromDate    : formData.fromDate,
                  toDate      : formData.toDate,
                  downloadFile: $scope.downloadFile
                }, function () {
                  $state.go($state.current, {}, {reload: true});
                },
                function (response) {
                  $scope.response = "Error Occurred In Creating Assignment ";
                  console.log(response.data.error.message);
                });

            },
            function (value)
            {

            }
          );

        }
        //--------------------------------------------------------
        //                 SHOW ASSIGNMENT LIST
        //--------------------------------------------------------
        $scope.assignmentlist = [];
        $scope.assignmentlist = Assignment.find({filter: {where: {schoolId: $scope.schoolId}, include: 'class'}});


        //--------------------------------------------------------
        //                 DELETE ASSIGNMENT LIST
        //--------------------------------------------------------
        $scope.deleteAssignment = function (x) {
          var dialog = ngDialog.open({template: 'deleteAssignment'});
          dialog.closePromise.then(function (data) {
            if (data.value && data.value != '$document' && data.value != '$closeButton') {

              Assignment.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")}, function () {
                Container.removeFile({container: "assignments", file: x.name}, function () {
                }, function (response) {
                  console.log(response.data.error.message);
                });
              });
              $state.go($state.current, {}, {reload: true});
            }
            return true;
          });

        }


        //--------------------------------------------------------
        //                 EDIT ASSIGNMENT LIST
        //--------------------------------------------------------
        $scope.editAssignment = function (x) {
          $scope.title = x.title;
          $scope.classSelected = x.classSelected;
          $scope.fromDate = $filter('date')(new Date(x.fromDate), 'yyyy-MM-dd');
          $scope.toDate = $filter('date')(new Date(x.toDate), 'yyyy-MM-dd');
          $scope.formData = {description: x.description};

          ngDialog.openConfirm({
            template: 'editAssignment',
            scope: $scope //Pass the scope object if you need to access in the template
          }).then(
            function (formData) {
              console.log(x.id);
              Assignment.upsert({
                  id: x.id, title: formData.title, classId: formData.classSelected,
                  description: formData.description, toDate: formData.toDate, fromDate: formData.fromDate,
                  uploadFile: formData.uploadFile
                },
                function () {
                  $state.go($state.current, {}, {reload: true});
                });
            }
          );
        }
      }
      else if ($scope.Student){
        //--------------------------------------------------------
        //                 SHOW ASSIGNMENT LIST
        //--------------------------------------------------------
        $scope.assignmentlist = [];
        $scope.assignmentlist = Assignment.find({filter: {where: {schoolId: $scope.schoolId,classId:$scope.userData.classId}, include: 'class'}});
      }

    }])

  .controller('AttendanceController',
    ['$scope', '$state','$window','Class','Attendance','Student','$filter',
    function ($scope,$state,$window,Class,Attendance,Student,$filter) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.studentList =[];

      $scope.delete= function(){
        $scope.test =Attendance.find(function(response){
            response.forEach(function(tests){
              var p = tests.toJSON();
              console.log(p.id);
              Attendance.destroyById({id: p.id});

            });
          });
      }
      //$scope.delete();


      $scope.monthView = function() {
        $scope.monthList =[];
        var getDays = new Date($scope.yearSelected,parseInt($scope.monthSelected)+1,0).getDate();
        $scope.list = Student.find({filter: {where: {classId: $scope.classSelected}}}, function (response) {
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

                        $scope.monthList[i]= {studentId:student.id,RFID:student.RFID,status:$scope.status};

                        console.log($scope.monthList[i]);

                        i++;

                      },function(){

                         for(var s=0;s<getDays;s++) $scope.status[s] =false;
                        $scope.monthList[i] = { studentId :student.id,RFID:student.RFID,status:$scope.status};
                        i++;

                      }
                    );
                    //  -----------
                  }
                  else{
                    for(var s=0;s<getDays;s++) {$scope.status[s] =false;}
                    $scope.monthList[i] = { studentId :student.id,status:$scope.status};
                    i++;

                  }


          });
        });



      }

      $scope.loadDates = function() {
        $scope.studentList = [];
        $scope.presentCount=0;
        $scope.absentCount=0;
        $scope.blockedCount=0;

        if ($scope.Admin || $scope.Staff){
          $scope.list = Student.find({filter: {where: {classId: $scope.classSelected}}}, function () {
            for (var i = 0; i < $scope.list.length; i++) {
              $scope.chk($scope.list[i].id, $scope.list[i].firstName,i,$scope.list[i].RFID,$scope.list[i].rollNo);
            }
          });



          $scope.chk = function(studentId,firstName,i,RFID,rollNo)
          {
              $scope.attendanceRecord = Attendance.findOne(
                {
                  filter:
                    {
                      where:
                        {
                          "RFID":RFID,"day":$scope.dateSelected.getDate(),"month":$scope.dateSelected.getMonth(),"year":$scope.dateSelected.getFullYear()
                        }
                    }
                },
                function(response)
                {
                  if (RFID){

                    $scope.presentCount++;
                    $scope.studentList[i] ={id:studentId ,firstName :firstName,RFID:RFID,rollNo :rollNo,attendanceId :response.id,status:true};
                  }
                  else
                  {
                    $scope.blockedCount++;
                    $scope.studentList[i] ={id:studentId ,firstName :firstName,rollNo :rollNo,status:'Blocked'};

                  }
                },
                function()
                {
                  $scope.absentCount++;
                  if(RFID){

                    $scope.studentList[i] ={id:studentId,firstName : firstName,RFID:RFID,rollNo:rollNo,status:false};

                  }
                  else{
                    $scope.blockedCount++;
                    $scope.studentList[i] ={id:studentId,firstName : firstName,rollNo:rollNo,status:'Blocked'};

                  }


                });



		      }



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
        }
              else if (Student) {

                $scope.list = Student.findOne({filter: {where: {id: $scope.userData.id}}}, function () {
                    $scope.chk($scope.list.id, $scope.list.firstName, 0);

                });

              }


			  }




 }])

  .filter('startFrom', function() { return function(input, start) { start = +start; return input.slice(start); }})

;
