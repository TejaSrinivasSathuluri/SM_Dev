angular
  .module('app')
  .controller('DirectoryController',function (Remarks,Attendance,Mail,$scope,ngDialog, Admin, $state, School, Class, Student, Parent, StudentParent, Staff, $rootScope, $window,$filter,Timetable,Schedule,$http) {


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

        $scope.schoolId = $scope.userData.schoolId;
        $scope.date = new Date();
        $rootScope.image = $scope.school.image;

        $scope.accessCheck = function(response){ if (response.status =401) $state.go('logout', {}, {reload: true});}



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
        //                  GET STUDENT LIST
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
         console.log(searchUser);
         $scope.error = false;
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
                    // alert('Parent Access is Under Developement. Will Be Activated Soon');
                    $scope.studentBox = false;$scope.staffBox = false;
                    if($scope.formData.parentSearch) {
                     $scope.studentBox = true;
                     $scope.staffBox = true;
                     $scope.rollSearch = true;
                     $scope.classSearch = true;
                     $scope.searchList = $scope.parentList;
                    }
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
                $scope.emailCheck = Student.findOne({filter: {where: {email: $scope.formData.email.toLowerCase()}}},function(){
                    alert('Email Already Exists');
                  },
                  // Email Is Not Conflicting
                  function(){             });

              }
            }
            else if ( type == 'ST')
            {
              if ($scope.formData.email){
                $scope.emailCheck = Staff.findOne({filter: {where: {email: $scope.formData.email.toLowerCase()}}},function(){
                    alert('Email Already Exists');
                  },
                  // Email Is Not Conflicting
                  function(){             });

              }
            }
            else if(type =='P')
            {
            }

          }

          //--------------------------------------------------------
          //                  ROLL NUMBER CHECK
          // --------------------------------------------------------
          $scope.checkRollnoExists = function() {
            $scope.RollnoExists = false;
            if($scope.formData.rollNo != null && $scope.formData.classId != null){
              var rollNo = parseInt($scope.formData.rollNo);
              $scope.checkRoll = Student.findOne({filter:{where:{classId :$scope.formData.classId,rollNo:rollNo}}},
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
                  console.log('Roll No Exists')
                },function(){
                  console.log('Roll No Doesnt Exists')
                  $scope.RollnoExists =false;
                });
            }

          }






          $scope.addStudentForm = function () {
            ngDialog.openConfirm({ template: 'addStudent',scope: $scope }).then(
              function (formData) {
                $scope.studentExists = Student.findOne({filter: {where: {classId:formData.classId,rollNo:formData.rollNo}}},
                  function () { $scope.response = 'Student Already Exists For This Class With This Roll Number';},
                  function () {



                    // $scope.image =  "" + '/' + schoolCode + '/' +formData.classId+ '/' + formData.rollNo + '.png';

                    $scope.newStudent = Student.create({
                      schoolId        : $scope.schoolId,
                      firstName       : formData.firstName,
                      lastName        : formData.lastName,
                      email           : formData.email.toLowerCase(),
                      password        : formData.password,
                      gender          : formData.gender,
                      dateofBirth     : formData.dateofBirth,
                      rollNo          : formData.rollNo,
                      RFID            : formData.RFID,
                      previousSchool  : formData.previousSchool,
                      dateofJoin      : formData.dateofJoin,
                      classId         : formData.classId,
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
                      created         : new Date(),
                      image           : $scope.image,
                      fatherName      : formData.fatherName,
                      motherName      : formData.motherName,
                      fatherContact   : formData.fatherContact,
                      motherContact   : formData.motherContact
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
                        $scope.response = 'Student Not Created.Please Check All the Fields';
                        $scope.error = true;
                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 2000 );
                        console.log(response);
                      }
                    );

                  });

              },
              function (value) {
              }
            );



          }



          //--------------------------------------------------------
          //               UPDATE STUDENT
          //--------------------------------------------------------
          updateStudent = function(editData)
          {
                    Student.prototype$updateAttributes({id: editData.id}, {
                        firstName            : editData.firstName,
                        password             : editData.password,
                        lastName             : editData.lastName,
                        email                : editData.email.toLowerCase(),
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
                        fatherContact        : editData.fatherContact,
                        motherContact        : editData.motherContact,
                        fatherName           : editData.fatherName,
                        motherName           : editData.motherName

                      },
                      function () {
                        $scope.response = 'Student Updated Successfully';
                        $scope.error = true;
                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                        }, 1000 );
                      },
                      function (response) {

                        alert('Student Is Not Saved.Please Check The Fields');
                        $scope.error =true ;
                        console.log(response.data.error.message);
                      });
          }


          //--------------------------------------------------------
          //                 EDIT STUDENT/PARENT/STAFF STARTS
          //--------------------------------------------------------

          $scope.editUser = function (x) {
            if (x.type == "Student") {
              $scope.editData = null;
              $scope.editData = x;
              $scope.classId = x.classId;
              $scope.rollNo = x.rollNo;

              $scope.editData.dateofBirth = new Date($scope.editData.dateofBirth);
              $scope.editData.dateofJoin = new Date($scope.editData.dateofJoin);
              console.log('Editing Student Details');


              ngDialog.openConfirm({
                template: 'editStudent',
                scope: $scope
              }).then(
                function (editData) {

                  if ($scope.classId == editData.classId && $scope.rollNo == editData.rollNo)
                  {

                     console.log('Updating Student Details');
                     updateStudent(editData);


                  }
                  else
                  {
                      $scope.studentExists = Student.findOne({filter: {where: {classId:editData.classId,rollNo:editData.rollNo},include:'class'}},
                      function ()
                      {
                        $scope.error = true;
                        $scope.response = 'Student Already Exists In Class With Roll No :' + $scope.editData.rollNo;
                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 3000 );
                      },
                      function ()
                      {
                         updateStudent(editData);
                      });

                  }


                },
                function (value)
                {
                              $state.go($state.current, {}, {reload: true});
                }
              );
            }

            else if (x.type == "Staff") {
              $scope.editData = x;
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
                template: 'editStaff',
                scope: $scope
              }).then(
                function (editData) {
                  Staff.prototype$updateAttributes({id: x.id}, {
                      firstName          : editData.firstName,
                      lastName           : editData.lastName,
                      email              : editData.email.toLowerCase(),
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
                       $scope.response = 'Staff Updated Successfully';
                       $scope.error =true ;
                       setTimeout(function() {
                          //  $scope.processSearch('t');

                        }, 1000);
                    },
                    function (response) {
                      console.log(response.data.error.message);
                    });
                },
                function (value) {

                          $scope.response = 'Staff Not Updated';
                            $scope.error =true ;
                      setTimeout(function() {
                      $scope.processSearch('t');

                      }, 1000);



                }
              );
            }
          }




          //--------------------------------------------------------
          //                 ADD STAFF STARTS
          //--------------------------------------------------------
           $scope.addComment = function()
           {
             console.log($scope.formData);
             if ($scope.formData.type == 'Staff')
             {
               console.log('Staff Gave Remarks');

                Remarks.create({
                  studentId : $scope.formData.id,
                  staffId : $scope.userData.id,
                  comment : $scope.comment
                });
             }
             else if ($scope.formData.type == 'Admin')
             {
               console.log('Admin Gave Remarks');
                    Remarks.create({
                    adminId : $scope.formData.id,
                    staffId : $scope.userData.id,
                    comment : $scope.comment
                  });
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
                        email              : formData.email.toLowerCase(),
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
                        created            : new Date(),
                        qualification      : formData.qualification,
                        qualifiedUniversity: formData.qualifiedUniversity,
                        percentage         : formData.percentage,
                        BED                : formData.BED

                      },
                      function () {
                        $scope.response = 'Staff Added Successfully';
                       $scope.error =true ;
                       setTimeout(function() {
                            $state.go($state.current, {}, {reload: true});
                           $scope.processSearch('t');
                       }, 1000);
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
            var dialog = ngDialog.open({template: 'deleteUser',closeByDocument: false,className: 'ngdialog-theme-default deletepopup'});
            dialog.closePromise.then(function (data) {

              if (data.value && data.value != '$document' && data.value != '$closeButton'&& data.value != '$escape') {
							   if (x.type == "Student")    {
										Student.deleteById({id: x.id}, function ()
                    {
                       $scope.response = 'Student Deleted Successfully';
                       $scope.error =true ;
                       setTimeout(function() {
                            $state.go($state.current, {}, {reload: true});
                           $scope.processSearch('s');
                       }, 1000);
												});

                  }
                else if (x.type == "Parent") {
                  Parent.deleteById({id: x.id}, function () {
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
                  Staff.deleteById({id: x.id}, function () {
                     $scope.response = 'Staff Deleted Successfully';
                            $scope.error =true ;
                      setTimeout(function() {
                            $state.go($state.current, {}, {reload: true});
                      $scope.processSearch('t');

                      }, 1000);
                  });
                }
              }

              return true;
            });

          }



        //--------------------------------------------------------
        //                 SHOW USER
        //--------------------------------------------------------

        $scope.showUser = function (x)
        {
          $scope.tab = 1;
          $scope.setTab = function(newTab){  $scope.tab = newTab; };
          $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };
          $scope.formData =x;
          if      (x.type =='Student')
                  {
                      // monthView(x);
                      ngDialog.openConfirm({template: 'showStudent', scope: $scope});
                  }
          else if (x.type =='Parent')    ngDialog.openConfirm({template: 'showParent',  scope: $scope});
          else if (x.type =='Staff')     ngDialog.openConfirm({template: 'showStaff',   scope: $scope});
        }

        //  ------------------------------------------------------
        //
        // --------------------------------------------------------


              monthView = function(x)
              {

                      // $scope.monthList =[];
                      year = new Date().getFullYear();
                      month = new Date().getMonth();
                      var getDays = new Date(year,parseInt(month)+1,0).getDate();
                      $scope.monthDays = function(){   return new Array(getDays);    }
                      $scope.list =[];

                          //-----------
                            Attendance.find({filter:{where: {RFID:x.RFID,year:year }}},
                            function(response)
                            {
                                        var i=0;
                                        response.forEach(function(data)
                                        {
                                              $scope.list[i] = data.toJSON();
                                              console.log($scope.list);
                                              i++;
                                          // if(data.day) $scope.count[i]=dayCount++;
                                          // console.log($scope.count[i]);
                                        });

                            });
                          //  -----------

                  }






        // -----------------------------------------------------------




        //--------------------------------------------------------
        //                 PARENT SUBSCRIPTION
        //--------------------------------------------------------
        $scope.addParentSubscription = function (x) {
           var dialog = ngDialog.open({template: 'parentSubscription'});
            dialog.closePromise.then(function (data)
            {
              parentEmail = data.value.parentEmail.toLowerCase();
              if (data.value && data.value != '$document' && data.value != '$closeButton'&& data.value != '$escape') {
                 var message = null;
                Parent.create({
                  email :parentEmail,password :"parent"
                },function()
                {
                    message = 'Welcome To Study Monitor.Your default password is parent.Please subscribe to your child ' + x.firstName + ' ' + x.lastName + ' '+ window.location.origin + '/#/signup' + ' using the following Key : ' + x.id ;

                  sendSubscriptionEmail(parentEmail,x,message);

                },function(){
                    message = "Please subscribe to your child " + x.firstName + ' ' + x.lastName +' '+  window.location.origin + "/#/signup" + " using the following Key : " + x.id ;

                  sendSubscriptionEmail(parentEmail,x,message);
                })

              }

              return true;
            });
        }


        //--------------------------------------------------------
        //                 SEND PARENT SUBSCRIPTION EMAIL
        //--------------------------------------------------------


          sendSubscriptionEmail = function(email,x,message) {
            subject = 'Student Subscription From ' + $scope.school.schoolName;
                  Mail.create({

                        email : email.toLowerCase(),
                        message : message,
                        subject:subject,
                        schoolId : x.schoolId
                  },function(){},function(response){
                    console.log(response.data.error.message);
                  });


          }


        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'firstName';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 15;

        $scope.numberOfPages=function(){return Math.ceil($scope.filtered.length/$scope.pageSize);}

      });
