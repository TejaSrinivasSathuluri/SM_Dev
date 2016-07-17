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
        }


          $scope.school = School.findById({id:$scope.schoolId},function(){
            $rootScope.image = $scope.school.image;
            $rootScope.schoolName = $scope.school.schoolName;});

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
              if ( c ==0){
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
   }])


  .controller('DirectoryController',
    ['$scope', 'ngDialog','Admin', '$state', 'School', 'Class', 'Student', 'Parent', 'StudentParent', 'Staff', '$rootScope', '$window','fileUpload','$filter',
      function ($scope,ngDialog, Admin, $state, School, Class, Student, Parent, StudentParent, Staff, $rootScope, $window,fileUpload,$filter) {


        //--------------------------------------------------------
        //                  BASIC USER DATA
        // --------------------------------------------------------

        $scope.user = $window.localStorage.getItem('user');
        $scope.schoolData = $window.localStorage.getItem('school');
        $scope.userData = JSON.parse($scope.user);
        $scope.school = JSON.parse($scope.schoolData);

        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}

        $scope.schoolName= null;
        $scope.schoolId = $scope.userData.schoolId;
        $scope.date = new Date();
        //$rootScope.schoolName = $scope.school.schoolName;





        //$scope.school = School.findById({id:$scope.schoolId},function(){
        //  schoolCode = $scope.school.code;
        //
        //});


        //var xhr = new XMLHttpRequest();
        //var dropboxToken = '-p5lctzPHiwAAAAAAAAA43U_T_YF5XRqEwkFSoqw2STJdZx5bm4OpzmfUJ6crNy_';
        //xhr.open('POST', 'https://content.dropboxapi.com/2/files/get_thumbnail');
        //xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
        //xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
        //  path: '/' + response.id + '.png',
        //  mode: 'view',
        //  autorename: true,
        //  mute: false
        //}));
        //



        //xhr.open('POST', 'https://content.dropboxapi.com/2/files/get_preview');
        //xhr.open('POST', 'https://content.dropboxapi.com/2/files/get_thumbnail');
        //xhr.open('POST', 'https://content.dropboxapi.com/2/files/create_shared_link');
   //     xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
   //     xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
   //       path: '/immi.png',
   //        }));
   //     xhr.send();
   //     console.dir(xhr.response);
   //     console.dir(xhr);
   //$scope.img = xhr.response;



          $scope.accessCheck = function(response){
          if (response.status =401) $state.go('logout', {}, {reload: true}) ;
        }



        //--------------------------------------------------------
        //                  GET CLASS LIST
        // --------------------------------------------------------
        $scope.classList = Class.find({filter: {where: {schoolId: $scope.schoolId}}},
          function () {},
          function (response) {
          $scope.accessCheck(response);
          console.log('Error In Finding Classes');
        });


        //--------------------------------------------------------
        //                  GET CLASS LIST
        // -------------------------------------------------------
        $scope.studentList = Student.find({filter: {where: {schoolId: $scope.schoolId}, include: 'class'}},
          function () {},
          function (response) {
          $scope.accessCheck(response);
          console.log('Error In Finding Students');
          });


        //--------------------------------------------------------
        //                  SHOW EMPTY  LIST INITIALLY
        // -------------------------------------------------------
        $scope.searchList = [];




        //*********************ADMIN & STAFF ACCESS*********************
        if (Admin || Staff)
        {
          $scope.studentParent = StudentParent.find({filter: {where: {schoolId: $scope.schoolId}, include: 'parent'}},
            function (response) {
              var i = 0;
              $scope.parentList = [];
              response.forEach(function (studentParent) {
                $scope.p = studentParent.toJSON();
                $scope.parentList[i] = $scope.p.parent;
                i++;
              }, $scope.parentList);

            },
            function (response) {
              $scope.accessCheck(response);
              console.log("StudentParent Data " + response.data.error.message);
            });
        }
        else if (Student)
        {
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
              $scope.accessCheck(response);
            });
        }
        else if (Parent){

        }






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
                  //else    $state.go($state.current, {}, {reload: true});
        }



        if ('Admin') {

          //--------------------------------------------------------
          //                  CLEAR FORM
          // --------------------------------------------------------
          $scope.clearForm = function () { $scope.formData = {}; }

          //--------------------------------------------------------
          //                  EMAIL CHECK
          // --------------------------------------------------------
          $scope.checkEmail = function(type){
            if( type == 'S')
            {
              if ($scope.formData.email)
              {
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
                },function(){
                  $scope.RollnoExists =false;
                });
            }

          }


          // --------------------------------------------------------
          //                  ADD STUDENT  STARTS
          // --------------------------------------------------------

          var schoolCode= $scope.school.code;
          var url = 'http://studymonitor.net/appimages';
          $scope.updateImage = function(){
            Student.find({filter: {where: {schoolId: $scope.schoolId}}},function(response){
              response.forEach(function(students){
                var student = students.toJSON();
                var image = url + '/' + schoolCode + '/' + student.classId + '/' + student.rollNo + '.png';
                Student.prototype$updateAttributes({id: student.id}, {image:image},function(){
                  console.log('image path set successfully');
                });
              });
            });
          }
        //  $scope.updateImage();



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
                    //var getclass = Class.findOne({filter:{where:{id:formData.classId}}});
                    //console.log(getclass);
                    $scope.image =  url + '/' +schoolCode+ '/' +formData.classId+ '/' + formData.rollNo + '.png';


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
                      motherName      : formData.motherName,
                      image           : $scope.image

                    },
                      function () {

                                                          //if (formData.image != null){
                                                          //  console.log('Uploading Image');
                                                          //  xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
                                                          //  xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
                                                          //  xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                                                          //  xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
                                                          //    path: '/' + response.id + '.png',
                                                          //    mode: 'add',
                                                          //    autorename: true,
                                                          //    mute: false
                                                          //  }),function(){
                                                          //    console.log(xhr.response);
                                                          //
                                                          //  });
                                                          //
                                                          //  xhr.send(formData.image);
                                                          //
                                                          //}

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
          $scope.tab = 1;
          $scope.setTab = function(newTab){  $scope.tab = newTab; };
          $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };
          $scope.formData =x;
          if      (x.type =='Student')   ngDialog.openConfirm({template: 'showStudent', scope: $scope});
          else if (x.type =='Parent')    ngDialog.openConfirm({template: 'showParent',  scope: $scope});
          else if (x.type =='Staff')     ngDialog.openConfirm({template: 'showStaff',   scope: $scope});

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


        if($scope.Student)
        {
          $scope.classList = Class.find  ({filter: {where: {id:$scope.userData.classId}, include: 'staff'}},function(){},
            function(response) {                $scope.accessCheck(response); });
        }

        if ($scope.Admin)
        {
           $scope.staffList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}},function(){},function(response){if (response.status =401) $state.go('logout', {}, {reload: true}) ;});
           $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}, include: 'staff'}},function(){},function(response){if (response.status =401) $state.go('logout', {}, {reload: true}) ;});

		      //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
		       $scope.clearResponse = function ()
           {
			           $scope.response = null;
			           $scope.responseAddClass = null;
                 $scope.formData=null;
		       }


          //--------------------------------------------------------
          //                  ADD CLASS
          // --------------------------------------------------------

          $scope.addClass = function () {

            ngDialog.openConfirm({template: 'addClass',
              scope: $scope //Pass the scope object if you need to access in the template
            }).then(
              function(formData) {

                $scope.classExists = Class.findOne({filter: {where: { schoolId: formData.schoolId, className: formData.className, sectionName: formData.sectionName}}},
                  function ()
                  {
                    $scope.error = true;
                    $scope.success = false;

                    $scope.responseAddClass = 'Class Already Exists';
                  },
                  function () {
                    Class.create({schoolId: $scope.schoolId,className: formData.className,sectionName:formData.sectionName,staffId:formData.staffSelected},
                      function () {
                        $scope.error = false;
                        $scope.success = true;

                        $scope.responseAddClass = "Class "+ formData.className + "-" + formData.sectionName + " Created Successfully";
                        console.log($scope.responseAddClass);

                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 1000 );
                      },
                      function (response) { console.log(response.data.error.message);});

                  });


              },
              function (value) { }
            );
          }


          //--------------------------------------------------------
          //                  UPDATE CLASS
          // --------------------------------------------------------
          $scope.updateClass = function (x) {
            Class.upsert({id: x.id, staffId: x.staff.id}, function () {
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
              if (data.value && data.value != '$document' && data.value != '$closeButton')
              {
                Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
                $scope.response="Class Deleted Successfully";
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
                return true;
              }
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
            ngDialog.openConfirm({template: 'addSubject',
              scope: $scope //Pass the scope object if you need to access in the template
            }).then(
              function(formData) {
                $scope.checkSub = Subject.findOne({
                    filter: {
                      where: {
                        classId: formData.classSelected,
                        subjectName: formData.subjectName
                      }
                    }
                  },
                  function () {
                    $scope.responseAddSubject = 'Subject ' + formData.subjectName + ' Already Exists For The Class.' ;
                    $scope.error = true;
                    $scope.success = false;
                  },
                  function () {
                    Subject.create({
                        subjectName: formData.subjectName,
                        classId: formData.classSelected,
                        staffId: formData.staffSelected
                      },
                      function () {

                        $scope.responseAddSubject ="Subject "+ formData.subjectName + " created Successfully in Class";
                        $scope.error = false;
                        $scope.success = true;
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




              },
              function (value) { }
            );
          }


          $scope.updateSubject = function (a) {
						Subject.upsert({id: a.id, staffId: a.staff.id},
						  function () {
                $scope.responseAddSubject ="Subject  Edited Successfully";

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
    ['$scope', '$state', 'School', 'Noticeboard', '$rootScope', '$window','ngDialog','$filter',
    function ($scope, $state, School, Noticeboard, $rootScope, $window,ngDialog,$filter) {

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
      //var baseApi = $location.$$protocol + "://"+ $location.$$host + ":" +$location.$$port + "/api/Containers/noticeboard/download/";


      //------------------------------------------------
      //            ADD NOTICE
      //------------------------------------------------

      $scope.addNotice = function () {


        ngDialog.openConfirm({template: 'addNotice',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
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

            });
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
    ['$scope', '$state', 'Class', 'Assignment', '$rootScope', '$window','ngDialog','$filter','fileUpload','$location','$http',
    function ($scope, $state, Class, Assignment, $rootScope, $window,ngDialog,$filter,fileUpload,$location,$http) {

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
      //var baseApi = $location.$$protocol + "://"+ $location.$$host + ":" +$location.$$port + "/api/Containers/assignments/download/";


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

  .controller('AttendanceController', ['$scope', '$state','$window','Class','Attendance','Student','$filter',
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
      //-----------------------------------
      // TABS CODE
      //------------------------------------

      $scope.tab = 1;
      $scope.setTab = function(newTab){  $scope.tab = newTab; };
      $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };




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
        $scope.monthDays = function(){
          return new Array(getDays);
        }
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

      $scope.loadDates = function() {
        $scope.studentList = [];
        $scope.presentCount=0;
        $scope.absentCount=0;
        $scope.blockedCount=0;

              if ($scope.Admin || $scope.Staff){
          $scope.list = Student.find({filter: {where: {classId: $scope.classSelected}}}, function () { for (var i = 0; i < $scope.list.length; i++) {
	          if ( $scope.list[i].RFID.length != 0){
				  		  $scope.chk($scope.list[i].id, $scope.list[i].firstName,i,$scope.list[i].RFID,$scope.list[i].rollNo);
		       	  }
			      else{
				  $scope.blockedCount++;
				  $scope.studentList[i] ={id:$scope.list[i].id,firstName : $scope.list[i].firstName,rollNo:$scope.list[i].rollNo,status:"Blocked"};
    			  }

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
                    $scope.presentCount++;

                    $scope.studentList[i] ={id:studentId ,firstName :firstName,RFID:RFID,rollNo :rollNo,attendanceId :response.id,status:true};

                },
                function()
                {
                  $scope.absentCount++;
				  console.log("Absent");
                  $scope.studentList[i] ={id:studentId,firstName : firstName,RFID:RFID,rollNo:rollNo,status:false};
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

      $scope.sendEmail = function(){
        $state.go('email') ;

      }


 }])
  .controller('TransportController',
    ['$scope', '$state','$window','$filter','ngDialog','Bus','VehicleType','BusService',
    function ($scope,$state,$window,$filter,ngDialog,Bus,VehicleType,BusService) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}



      //-----------------------------------
      // TABS CODE
      //------------------------------------

      $scope.tab = 1;
      $scope.setTab = function(newTab){  $scope.tab = newTab; };
      $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };




      //**************************************VEHICLE CORNER************************************
      //-----------------------------------------------------
      //   CLEAR RESPONSE
      //-----------------------------------------------------
      $scope.clearResponseVehicle  = function() {
        $scope.responseAddVehicleType = null;
      }

      // -----------------------------------------------------
      //   ADD VEHICLE TYPE
      //-----------------------------------------------------
      $scope.addVehicleType = function()
      {
             $scope.chkVehicle = VehicleType.findOne({filter:{where:{name:$scope.formData.name,schoolId:$scope.schoolId}}},function(){
               $scope.responseAddVehicleType = 'Vehicle Already Exists';
             }, function () {
                 VehicleType.create({name:$scope.formData.name,schoolId:$scope.schoolId},function(){
                   $scope.responseAddVehicleType = 'Vehicle Added Successfully';
                   $scope.successCallVehicle();

                 });
             });

      }

      // -----------------------------------------------------
      //   DELETE VEHICLE TYPE
      //-----------------------------------------------------
      $scope.deleteVehicleType = function(x)
      {

        var dialog = ngDialog.open({template: 'deleteVehicleType'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document' && data.value != '$closeButton')

            VehicleType.deleteById({id: x.id},function(){
              $scope.responseAddVehicleType = 'Vehicle Type Removed Successfully';
              $scope.successCallVehicle();

            });

          return true;
        });

      }


      // ----------------------------------------------------
      //   SUCCESS CALL
      //-----------------------------------------------------
      $scope.successCallVehicle = function(){
        setTimeout( function()
        {
          $scope.showVehicle();
          $scope.clearResponseVehicle();
          $scope.formData = {};
        }, 1000 );

      }

      // ----------------------------------------------------
      //   SHOW VEHICLE TYPE
      //-----------------------------------------------------
      $scope.showVehicle= function(){
        $scope.vehicleTypeList = VehicleType.find({filter:{where:{schoolId:$scope.schoolId}}});
      }
      $scope.showVehicle();


      //**************************************VEHICLE CORNER************************************










      //**************************************BUS CORNER************************************
      //  INIT FUNCTIONS


      //-----------------------------------------------------
      //   CLEAR RESPONSE
      //-----------------------------------------------------
      $scope.clearResponse  = function() {  $scope.responseAddBus = null; }

      // ----------------------------------------------------
      //   SHOW VEHICLE TYPE
      //-----------------------------------------------------

      $scope.vehicleTypeList = VehicleType.find({filter:{where:{schoolId:$scope.schoolId}}});


      // ----------------------------------------------------
      //   SUCCESS CALL
      //-----------------------------------------------------
      $scope.successCallBus = function(){
        setTimeout( function()
        {
          $scope.showBus();
          $scope.clearResponse();
          $scope.formData = {};
        }, 1000 );

      }




      // ----------------------------------------------------
      //   SHOW VEHICLE TYPE
      //-----------------------------------------------------
      $scope.showBus= function(){
        $scope.busList = Bus.find({filter:{where:{schoolId:$scope.schoolId},include:'vehicleType'}});
      }
      $scope.showBus();


      // -----------------------------------------------------
      //   ADD BUS
      //-----------------------------------------------------
      $scope.addBus = function()
      {
             Bus.findOne({filter:{where:{busNo:$scope.formData.busNo,schoolId:$scope.schoolId}}},function(){
               $scope.responseAddBus = 'Bus Already Exists With This Number';
             }, function () {
                 Bus.create({busNo:$scope.formData.busNo,
                   vehicleTypeId:$scope.formData.vehicleTypeId,
                   capacity:$scope.formData.capacity,
                   schoolId:$scope.schoolId},
                   function(){
                   $scope.responseAddBus = 'Bus Added Successfully';
                     $scope.successCallBus();
                 });
             });

      }

      // ----------------------------------------------------
      //                         EDIT BUS
      //-----------------------------------------------------
      $scope.editBus = function(x)
      {
          $scope.editData = x;
          ngDialog.openConfirm({template: 'editBus',
            scope: $scope
          }).then(
            function(editData) {

              Bus.upsert({id: x.id,vehicleTypeId:editData.vehicleTypeId,capacity:editData.capacity},
                function(){
                  $scope.responseAddBus = 'Bus Updated Successfully';
                  $scope.successCallBus();
                });
            },
            function() {
              $scope.responseAddBus = "Bus Details Were Not Edited.Please Check Required Fields";
              $scope.successCallBus();
            }
          );

      }


      // -----------------------------------------------------
      //   DELETE BUS
      //-----------------------------------------------------
      $scope.deleteBus = function(x)
      {

        var dialog = ngDialog.open({template: 'deleteBus'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document' && data.value != '$closeButton')

            Bus.deleteById({id: x.id},function(){
              $scope.responseAddBus = 'Bus Removed Successfully';
              $scope.successCallBus();
            });

          return true;
        });




      }


      //**************************************BUS CORNER************************************



      //**************************************SERVICE CORNER************************************
      //-----------------------------------------------------
      //   CLEAR RESPONSE
      //-----------------------------------------------------
      $scope.clearResponseBusService  = function() {
        $scope.responseAddBusService = null;
      }

      // -----------------------------------------------------
      //   ADD SERVICE
      //-----------------------------------------------------
      $scope.addBusService = function()
      {
        $scope.chkVehicle = BusService.findOne({filter:{where:{name:$scope.formData.name,schoolId:$scope.schoolId}}},function(){
          $scope.responseAddBusService = 'Service Already Exists';
        }, function () {
          BusService.create({name:$scope.formData.name,schoolId:$scope.schoolId},function(){
            $scope.responseAddBusService = 'Service Added Successfully';
            $scope.successCallBusService();

          });
        });

      }

      // -----------------------------------------------------
      //   DELETE SERVICE
      //-----------------------------------------------------
      $scope.deleteBusService = function(x)
      {

        var dialog = ngDialog.open({template: 'deleteBusService'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document' && data.value != '$closeButton')

            BusService.deleteById({id: x.id},function(){
              $scope.responseAddBusService = 'Bus Service Removed Successfully';
              $scope.successCallBusService();

            });

          return true;
        });

      }


      // ----------------------------------------------------
      //   SUCCESS CALL
      //-----------------------------------------------------
      $scope.successCallBusService = function(){
        setTimeout( function()
        {
          $scope.showBusService();
          $scope.clearResponseBusService();
          $scope.formData = {};
        }, 1000 );

      }

      // ----------------------------------------------------
      //   SHOW SERVICE
      //-----------------------------------------------------
      $scope.showBusService= function(){
        $scope.busserviceList = BusService.find({filter:{where:{schoolId:$scope.schoolId}}});
      }
      $scope.showBusService();


      //**************************************BUSSERVICE CORNER***********************************


 }])


  .controller('HolidayController',
    ['$scope', '$state','$window','Calendar','School',function ($scope,$state,$window,Calendar,School) {
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        $scope.schoolId = $scope.userData.schoolId;
        if ($scope.userData.type == 'Admin'  ) { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent' ) { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff'  ) { $scope.Staff   = true;}


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


      //$scope.addWorkingDays = function(){
      School.findById({id:$scope.schoolId},function(response){
        var startDate = new Date(response.startDate);
        var endDate = new Date(response.endDate);
        console.log(startDate.getMonth());
      });
      //}

      }])

  .controller('EmailController',
    ['$scope', '$state','$window','School',function ($scope,$state,$window,School) {
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        $scope.schoolId = $scope.userData.schoolId;
        if ($scope.userData.type == 'Admin'  ) { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent' ) { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff'  ) { $scope.Staff   = true;}

      var xhr = new XMLHttpRequest();

      //xhr.upload.onprogress = function(evt) {
      //  var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
      //  // Upload in progress. Do something here with the percent complete.
      //};

      //xhr.onload = function() {
      //  if (xhr.status === 200) {
      //    var fileInfo = JSON.parse(xhr.response);
      //    console.log(xhr.response);
      //    // Upload succeeded. Do something here with the file info.
      //  }
      //  else {
      //    var errorMessage = xhr.response || 'Unable to upload file';
      //
      //    // Upload failed. Do something here with the error.
      //  }
      //};

      $scope.uploadFile = function(){

        var dropboxToken = '-p5lctzPHiwAAAAAAAAA43U_T_YF5XRqEwkFSoqw2STJdZx5bm4OpzmfUJ6crNy_';
        xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
        xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
          path: '/immi.png' ,
          mode: 'add',
          autorename: true,
          mute: false
        }));

        xhr.send($scope.file);
      }


      }])
  .controller('ProfileController',
    ['$scope', '$state','$window','School','Student','Admin','Parent','Staff',
      function ($scope,$state,$window,School,Student,Admin,Parent,Staff) {
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        $scope.schoolId = $scope.userData.schoolId;

        if ($scope.userData.type == 'Admin'  ) { $scope.Admin   = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent' ) { $scope.Parent  = true;}
        if ($scope.userData.type == 'Staff'  ) { $scope.Staff   = true;}
      $scope.editData = $scope.userData;
       $scope.saveProfile = function()
       {
         if ($scope.Student)
         {
           console.log('Student Profile Update');
           Student.prototype$updateAttributes({
             id:$scope.editData.id,password:$scope.editData.password,firstName:$scope.editData.firstName,lastName:$scope.editData.lastName,
             email:$scope.editData.email
           },function(response){
             console.log(response);
             $scope.responseSaveProfile();
           });
         }
         else if ($scope.Admin)
         {
           console.log('Admin Profile Update');
           Admin.prototype$updateAttributes({
            id:$scope.editData.id,password:$scope.editData.password,firstName:$scope.editData.firstName,lastName:$scope.editData.lastName,
            email:$scope.editData.email
          },function(response){
             $scope.responseSaveProfile();
             console.log(response);
          }, function (response) {
            console.log(response.data.error.message);
          });


         }
         else if ($scope.Parent)
         {
           Parent.prototype$updateAttributes({
             id:$scope.editData.id,password:$scope.editData.password,firstName:$scope.editData.firstName,lastName:$scope.editData.lastName,
             email:$scope.editData.email
           },function(response){
             $scope.responseSaveProfile();
             console.log(response);
           });
         }
         else if ($scope.Staff)
         {
           Staff.upsert({
             id:$scope.editData.id,password:$scope.editData.password,firstName:$scope.editData.firstName,lastName:$scope.editData.lastName,
             email:$scope.editData.email
           },function(response){
             $scope.responseSaveProfile();
             console.log(response);
           });
         }

       }

      // -----------------------------------------------------
      //     FUNCTION AFTER USER UPDATE
      //------------------------------------------------------
        $scope.responseSaveProfile = function ()
        {
          $scope.response = "Profile Saved Successfully";
          setTimeout( function()
          {
            $state.go($state.current, {}, {reload: true});
            $scope.$apply();
          }, 1000 );

        }




      }])


  .filter('startFrom', function() { return function(input, start) { start = +start; return input.slice(start); }})

;
