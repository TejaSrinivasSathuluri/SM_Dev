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
                 console.log("File Not Upload Becasue" + response);
               });
            }
         }])

  .controller('DashboardController', ['$scope', 'Admin', 'Container','$state','fileUpload',
    function ($scope, Admin,Container, $state,fileUpload) {
        //$scope.day = moment();
   }

  ])

  .controller('DirectoryController',
    ['$scope', 'ngDialog','Admin', '$state', 'School', 'Class', 'Student', 'Parent', 'StudentParent', 'Staff', '$rootScope', '$window','Container','fileUpload','$filter',
      function ($scope,ngDialog, Admin, $state, School, Class, Student, Parent, StudentParent, Staff, $rootScope, $window,Container,fileUpload,$filter) {


        //--------------------------------------------------------
        //                  BASIC USER DATA
        // --------------------------------------------------------

        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        console.log($scope.userData);
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
            if (response.status =401) $state.go('forbidden', {}, {reload: true}) ;
        });
        console.log($scope.userData.type);
        if ($scope.userData.type== 'Admin') {
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
              if (response.status = 401) $state.go('forbidden', {}, {reload: true});
            });
        }
        else if ($scope.userData.type== 'Student'){
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
              if (response.status = 401) $state.go('forbidden', {}, {reload: true});
            });
        }


        $scope.searchList = $scope.studentList;



        //--------------------------------------------------------
        //                  PROCESS SEARCH FORM
        // --------------------------------------------------------
        $scope.processSearch = function () {
                  if ($scope.formData.staffSearch == true) {
                    $scope.searchList = [];
                    $scope.parentList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}});
                  }
                  else         { $state.go($state.current, {}, {reload: true}); }
                }


        if ($scope.userData.type== 'Admin') {

          //--------------------------------------------------------
          //                  CLEAR FORM
          // --------------------------------------------------------
          $scope.clearForm = function () {
            $scope.formData = {};
          }


          //--------------------------------------------------------
          //                  ADD STUDENT  STARTS
          // --------------------------------------------------------
          $scope.addStudent = function () {
            $scope.studentExists = Student.findOne({
                filter: {
                  where: {
                    schoolId: $scope.schoolId,
                    classId: $scope.formData.class,
                    rollNo: $scope.formData.rollNo
                  }
                }
              },
              function (response) {
                console.log(response);
                $scope.response = 'Student Already Exists For This Class With This Roll Number';
              },
              function () {

                $scope.newStudent = Student.create({
                    schoolId: $scope.schoolId,
                    firstName: $scope.formData.firstName,
                    lastName: $scope.formData.lastName,
                    email: $scope.formData.email,
                    password: $scope.formData.password,
                    gender: $scope.formData.gender,
                    image: "../../uploads/students",
                    dateofBirth: $scope.formData.dateOfBirth,
                    rollNo: $scope.formData.rollNo,
                    RFID: $scope.formData.RFID,
                    prevSchool: $scope.formData.previousSchool,
                    dateofJoin: $scope.formData.dateOfJoin,
                    classId: $scope.formData.class,
                    status: "A",
                    regId: $scope.formData.regId,
                    isDisable: $scope.formData.isDisable,
                    prevSchoolTC: "../../uploads/students/TC",
                    currentAddress: $scope.formData.currentAddress,
                    currentCity: $scope.formData.currentCity,
                    currentState: $scope.formData.currentState,
                    currentPincode: $scope.formData.currentPincode,
                    bloodGroup: $scope.formData.bloodGroup,
                    religion: $scope.formData.religion,
                    caste: $scope.formData.caste,
                    alternateContact: $scope.formData.alternateContact,
                    permanentAddress: $scope.formData.permanentAddress,
                    permanentCity: $scope.formData.permanentCity,
                    permanentState: $scope.formData.permanentState,
                    permanentPincode: $scope.formData.permanentPincode,
                    nationalId: $scope.formData.nationalId,
                    motherTounge: $scope.formData.motherTounge,
                    nationalIdType: $scope.formData.nationalIdType,
                    subCaste: $scope.formData.subCaste,
                    contact: $scope.formData.contact,
                    type: "Student",
                    created: $scope.date
                  },
                  function () {
                    //$scope.formData.studentImg['title'] = $scope.newStudent.id + ".PNG";
                    //var file = $scope.formData.studentImg;
                    //
                    //
                    //console.log('file is ' );
                    //console.dir(file);
                    //
                    //var uploadUrl = "/api/Containers/students/upload";
                    //fileUpload.uploadFileToUrl(file, uploadUrl);
                    if ($scope.formData.motherFirstName != null && $scope.formData.motherPassword != null && $scope.formData.motherEmail != null) {
                      console.log('creating mother');
                      $scope.newParent1 = Parent.create({
                          firstName: $scope.formData.motherFirstName,
                          lastName: $scope.formData.motherLastName,
                          email: $scope.formData.motherEmail,
                          contact: $scope.formData.motherPhone,
                          password: $scope.formData.motherPassword,
                          type: "Parent",
                          created: $scope.date
                        }, function () {
                          console.log('creating mother parent relation');
                          StudentParent.create({
                            studentId: $scope.newStudent.id,
                            parentId: $scope.newParent1.id,
                            schoolId: $scope.schoolId
                          });
                        }, function (response) {
                          console.log(response.data.error.message);
                        }
                      );

                    }
                    if ($scope.formData.fatherFirstName != null && $scope.formData.fatherPassword != null && $scope.formData.fatherEmail != null) {
                      console.log('creating father');
                      $scope.newParent2 = Parent.create({id: $scope.newStudent.id}, {
                          firstName: $scope.formData.fatherFirstName,
                          lastName: $scope.formData.fatherLastName,
                          email: $scope.formData.fatherEmail,
                          contact: $scope.formData.fatherPhone,
                          password: $scope.formData.fatherPassword,
                          type: "Parent",
                          created: $scope.date
                        },
                        function () {
                          console.log('creating father parent relation');
                          StudentParent.create({
                            studentId: $scope.newStudent.id,
                            parentId: $scope.newParent2.id,
                            schoolId: $scope.schoolId
                          });
                          $state.go($state.current, {}, {reload: true});

                        },
                        function (response) {
                          console.log(response.data.error.message);
                        });
                    }
                    else {
                      $state.go($state.current, {}, {reload: true});
                    }
                  },
                  function (response) {
                    console.log(response.data.error.message);
                    $scope.response = response.data.error.message;
                    if (response.status = 401) $state.go('forbidden', {}, {reload: true});
                  }
                );

              });
          }
          //--------------------------------------------------------
          //                 ADD STUDENT ENDS
          //--------------------------------------------------------


          //--------------------------------------------------------
          //                 DELETE STUDENT/PARENT/STAFF STARTS
          //--------------------------------------------------------

          $scope.deleteUser = function (x) {
            var dialog = ngDialog.open({template: 'deleteUser'});
            dialog.closePromise.then(function (data) {
              if (data.value && data.value != '$document' && data.value != '$closeButton') {
                if (x.type == "Student") {
                  Student.delete({id: x.id}, function () {
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
                    console.log('Staff Deleted Successfully');
                    $state.go($state.current, {}, {reload: true});
                  });
                }
              }

              return true;
            });


          }

          //--------------------------------------------------------
          //                 DELETE STUDENT/PARENT/STAFF ENDS
          //--------------------------------------------------------


          //--------------------------------------------------------
          //                 EDIT STUDENT/PARENT/STAFF STARTS
          //--------------------------------------------------------

          $scope.editUser = function (x) {
            if (x.type == "Student") {
              $scope.formData = x;
              ngDialog.openConfirm({
                template: 'editStudent',
                scope: $scope //Pass the scope object if you need to access in the template
              }).then(
                function (formData) {
                  if (formData.firstName == null || formData.lastName == null || formData.email == null || formData.bloodGroup == null ||
                    formData.contact == null || formData.status == null || formData.dateofBirth == null || formData.dateofJoin == null) {

                    Student.prototype$updateAttributes({id: x.id}, {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        password: formData.password,
                        gender: formData.gender,
                        dateofBirth: formData.dateOfBirth,
                        rollNo: formData.rollNo,
                        RFID: formData.RFID,
                        prevSchool: formData.previousSchool,
                        dateofJoin: formData.dateOfJoin,
                        classId: formData.class,
                        status: formData.status,
                        regId: formData.regId,
                        isDisable: formData.isDisable,
                        currentAddress: formData.currentAddress,
                        currentCity: formData.currentCity,
                        currentState: formData.currentState,
                        currentPincode: formData.currentPincode,
                        bloodGroup: formData.bloodGroup,
                        religion: formData.religion,
                        caste: formData.caste,
                        alternateContact: formData.alternateContact,
                        permanentAddress: formData.permanentAddress,
                        permanentCity: formData.permanentCity,
                        permanentState: formData.permanentState,
                        permanentPincode: formData.permanentPincode,
                        nationalId: formData.nationalId,
                        motherTounge: formData.motherTounge,
                        nationalIdType: formData.nationalIdType,
                        subCaste: formData.subCaste,
                        contact: formData.contact

                      },
                      function () {
                        $state.go($state.current, {}, {reload: true});
                      },
                      function (response) {
                        console.log(response.data.error.message);
                      });
                  }
                },
                function (value) {
                }
              );
            }
            else if (x.type == "Parent") {
              $scope.formData = x;
              ngDialog.openConfirm({
                template: 'editParent', scope: $scope //Pass the scope object if you need to access in the template
              }).then(
                function (formData) {
                  Parent.prototype$updateAttributes({id: x.id}, {
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      email: formData.email,
                      password: formData.password,
                      contact: formData.contact
                    },
                    function () {
                      $state.go($state.current, {}, {reload: true});
                    }, function (response) {
                      console.log(response.data.error.message);
                    });
                },
                function (value) {
                }
              );
            }
            else if (x.type == "Staff") {
              $scope.formData = x;
              //$scope.dateofBirth = $filter('date')(new Date(x.dateOfBirth), 'MM/dd/yyyy');
              ngDialog.openConfirm({
                template: 'editStaff',
                scope: $scope
              }).then(
                function (formData) {
                  Staff.prototype$updateAttributes({id: x.id}, {
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      email: formData.email,
                      password: formData.password,
                      gender: formData.gender,
                      dateofBirth: formData.dateOfBirth,
                      rollNo: formData.rollNo,
                      RFID: formData.RFID,
                      prevSchool: formData.previousSchool,
                      dateofJoin: formData.dateOfJoin,
                      classId: formData.class,
                      status: formData.status,
                      regId: formData.regId,
                      isDisable: formData.isDisable,
                      currentAddress: formData.currentAddress,
                      currentCity: formData.currentCity,
                      currentState: formData.currentState,
                      currentPincode: formData.currentPincode,
                      bloodGroup: formData.bloodGroup,
                      religion: formData.religion,
                      caste: formData.caste,
                      alternateContact: formData.alternateContact,
                      permanentAddress: formData.permanentAddress,
                      permanentCity: formData.permanentCity,
                      permanentState: formData.permanentState,
                      permanentPincode: formData.permanentPincode,
                      nationalId: formData.nationalId,
                      motherTounge: formData.motherTounge,
                      nationalIdType: formData.nationalIdType,
                      subCaste: formData.subCaste,
                      contact: formData.contact,
                      qualification: formData.qualification,
                      qualifiedUniversity: formData.qualifiedUniversity,
                      percentage: formData.percentage,
                      BED: formData.BED

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
          //                 EDIT STUDENT/PARENT/STAFF ENDS
          //--------------------------------------------------------


          //--------------------------------------------------------
          //                 ADD STAFF STARTS
          //--------------------------------------------------------

          $scope.addStaff = function () {

            $scope.newStaff = Staff.create({
                schoolId: $scope.schoolId,
                firstName: $scope.formData.firstName,
                lastName: $scope.formData.lastName,
                email: $scope.formData.email,
                password: $scope.formData.password,
                contact: $scope.formData.contact,
                gender: $scope.formData.gender,
                image: "../../uploads/staff",
                dateofBirth: $scope.formData.dateOfBirth,
                RFID: $scope.formData.RFID,
                isDisable: $scope.formData.isDisable,
                dateofJoin: $scope.formData.dateOfJoin,
                status: $scope.formData.status,
                regId: $scope.formData.regId,
                currentAddress: $scope.formData.currentAddress,
                currentCity: $scope.formData.currentCity,
                currentState: $scope.formData.currentState,
                currentPincode: $scope.formData.currentPincode,
                bloodGroup: $scope.formData.bloodGroup,
                religion: $scope.formData.religion,
                caste: $scope.formData.caste,
                permanentAddress: $scope.formData.permanentAddress,
                permanentCity: $scope.formData.permanentCity,
                permanentState: $scope.formData.permanentState,
                permanentPincode: $scope.formData.permanentPincode,
                nationalId: $scope.formData.nationalId,
                motherTounge: $scope.formData.motherTounge,
                nationalIdType: $scope.formData.nationalIdType,
                subCaste: $scope.formData.subCaste,
                qualification: $scope.formData.qualification,
                qualifiedUniversity: $scope.formData.qualifiedUniversity,
                percentage: $scope.formData.percentage,
                BED: $scope.formData.BED,
                type: 'Staff', created: $scope.date
              },
              function () {

                console.log("Staff Added Successfully");
                $state.go($state.current, {}, {reload: true});
              },
              function (response) {
                $scope.response = "Staff Is Not Created " + response.data.error.message;
                console.log("Error In Adding Staff " + response.data.error.message);
              }
            )
          }

          //--------------------------------------------------------
          //                 ADD STAFF ENDS
          //--------------------------------------------------------

        }



        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'firstName';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 3;
        $scope.data = ($scope.searchList.concat($scope.parentList)).length;
        $scope.numberOfPages=function(){
          return Math.ceil($scope.data/$scope.pageSize);
        }

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
          $scope.classList = Class.find  ({filter: {where: {id:$scope.userData.classId}, include: 'staff'}},function(){},function(response){if (response.status =401) $state.go('forbidden', {}, {reload: true}) ;});
        }

        if ($scope.Admin) {
          $scope.staffList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}},function(){},function(response){if (response.status =401) $state.go('forbidden', {}, {reload: true}) ;});
          $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}, include: 'staff'}},function(){},function(response){if (response.status =401) $state.go('forbidden', {}, {reload: true}) ;});

		  //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
		   $scope.clearResponse = function (){
			   $scope.response = null;
			   $scope.responseAddClass = null;
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
              //      $state.go($state.current, {}, {reload: true});
			  $scope.responseAddClass = "Class "+ $scope.formData.className + "-" + $scope.formData.sectionName + " Created Successfully";
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
            });

          }

          //--------------------------------------------------------
          //                  DELETE CLASS
          // --------------------------------------------------------
          $scope.deleteClass = function (x) {
            var dialog = ngDialog.open({template: 'deleteClass'});
            dialog.closePromise.then(function (data) {
              if (data.value && data.value != '$document' && data.value != '$closeButton') Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
              $state.go($state.current, {}, {reload: true});
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
        $scope.pageSize = 3;
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
			   $scope.response = null;
			   $scope.responseAddSubject = null;
		   } 
		   
          $scope.staffList = Staff.find  ({filter: {where: {schoolId: $scope.schoolId}}}, function () {
          }, function (response) {
            if (response.status = 401) $state.go('forbidden', {}, {reload: true});
          });
		  
		  
          $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}}, function () {
          }, function (response) {
            if (response.status = 401) $state.go('forbidden', {}, {reload: true});
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
						  //      $state.go($state.current, {}, {reload: true});
									$scope.responseAddSubject ="Subject "+ $scope.formData.subjectName + " created Successfully in Class";
							  },
							  function (response) {
								  
								$scope.responseAddSubject = "Subject Already Exists";
							  }
							);
              });

          }


          $scope.updateSubject = function (a) {
						Subject.upsert({id: a.id, staffId: a.staff.id},
						  function () {
							$state.go($state.current, {}, {reload: true});
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
                $state.go($state.current, {}, {reload: true});
              }
              return true;
            });

          }
        }
        else if ($scope.Student){
          $scope.subjectList = Subject.find({filter: {where:{classId:$scope.userData.classId},include: ['staff', 'class']}});
           console.log($scope.subjectList);
        }
		// --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'subjectName';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 3;
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
                    $state.go($state.current, {}, {reload: true});
                  });
                });

            }
            else {
              alert('Please fill the fields');
            }

          },
          function () {
            $scope.newTimetable = Timetable.create({schoolId: $scope.schoolId, schedule: $scope.receivers});
            $state.go($state.current, {}, {reload: true});
          });
      }
    }
    }])

  .controller('ScheduleController', ['$scope', 'Admin', '$state', 'School', 'Class', 'Subject', 'Schedule', 'Timetable', '$rootScope', '$window',
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
                    $state.go($state.current, {}, {reload: true});
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
                  $state.go($state.current, {}, {reload: true});
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
                        $scope.formData.date1 = new Date($scope.formData.date1);
                        $scope.formData.date2 = new Date($scope.formData.date2);
                        var file =  $scope.myFile;
                        var uploadUrl = "/api/Containers/noticeboard/upload";
                        if ($scope.myFile != null)
                        {
                          fileUpload.uploadFileToUrl(file, uploadUrl);
                        }

                        Noticeboard.create({
                            title: $scope.formData.title,description: $scope.formData.description,date1: $scope.formData.date1,date2: $scope.formData.date2,
                            uploadFile: baseApi +file['name'],name: file['name'],schoolId: $scope.schoolId
                          },
                          function () { $state.go($state.current, {}, {reload: true});}
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
              function () {$state.go($state.current, {}, {reload: true});});
          },
          function(value) {

          }
        );
      }
    }])

  .controller('LibraryController', ['$scope', '$state', 'School', 'Library', '$rootScope', '$window','ngDialog',
    function ($scope, $state, School, Library, $rootScope, $window,ngDialog) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      $scope.addLibrary = function () {
        Library.create({
          schoolId: $scope.schoolId, name: $scope.formData.name, author: $scope.formData.author,
          description: $scope.formData.description, price: $scope.formData.price, available: $scope.formData.available
        }, function () {
          $state.go($state.current, {}, {reload: true});
        });
      }
      $scope.librarylist = [];
      $scope.librarylist = Library.find({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.deleteLibrary = function (x) {
         var dialog = ngDialog.open({template: 'deleteLibrary'});

        dialog.closePromise.then(function (data) {

          if (data.value && data.value != '$document' && data.value != '$closeButton') {
            Library.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
            $state.go($state.current, {}, {reload: true});
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
              function () {$state.go($state.current, {}, {reload: true});});
          },
          function(value) {}
        );
      }

    }])

  .controller('AssignmentController', ['$scope', '$state', 'Class', 'Assignment', '$rootScope', '$window','ngDialog','$filter','fileUpload','Container','$location','$http',
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

          if ($scope.myFile != null) {
            $scope.downloadFile = baseApi + $scope.myFile.name;
            var file = $scope.myFile;
            var uploadUrl = "/api/Containers/assignments/upload";
            var uploadUrl2 = "http://localhost:3000/api/Containers/assignments/upload";
            //fileUpload.uploadFileToUrl(file, uploadUrl);
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
            });
          }

          Assignment.create({
              schoolId: $scope.schoolId,
              title: $scope.formData.title,
              classId: $scope.formData.classSelected,
              description: $scope.formData.description,
              fromDate: $scope.formData.fromDate,
              toDate: $scope.formData.toDate,
              downloadFile: $scope.downloadFile
            }, function () {
              $state.go($state.current, {}, {reload: true});
            },
            function (response) {
              $scope.response = "Error Occurred In Creating Assignment ";
              console.log(response.data.error.message);
            });

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

      .controller('AttendanceController', ['$scope', '$state','$window','Class','Attendance','Student',
    function ($scope,$state,$window,Class,Attendance,Student) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.studentList =[];
      //console.log(new Date(2014, 1, 0).getDate());
      $scope.test=[];
      for(var i=0;i<new Date(2014,1,0).getDate();i++)
      {
        $scope.test= [{date :new Date(2014,0,i+1)}];
      }

      console.log($scope.test);

      //
      $scope.loadDates = function() {
        $scope.studentList = [];
        if ($scope.Admin || $scope.Staff){
          $scope.list = Student.find({filter: {where: {classId: $scope.classSelected}}}, function () {
            for (var i = 0; i < $scope.list.length; i++) {
              $scope.studentList[i]={studentId:$scope.list[i].id,data:$scope.test};
              console.log($scope.studentList);
              //$scope.chk($scope.list[i].id, $scope.list[i].firstName,i);
            }
          });

          $scope.chk = function(studentId,firstName,i)
          {
            var firstDay = new Date($scope.dateSelected.getFullYear(), $scope.dateSelected.getMonth(), 1);
            var lastDay  = new Date($scope.dateSelected.getFullYear(), $scope.dateSelected.getMonth()+1, 0);
            $scope.attendanceRecord = Attendance.find({filter:{where:{studentId:studentId,date:{between:[firstDay,lastDay]}}}},function(response){

              $scope.studentList[i] ={id:studentId ,firstName :firstName,attendanceId :response.id,status:true}
            },function(){
              $scope.studentList[i] ={id:studentId,firstName : firstName,status:false}
            });
          }

          //-----------------


          //------------------
          $scope.addAttendance = function(x){
            if (x.status == true) {
              Attendance.findOne({filter:{where:{studentId:x.id,date:$scope.dateSelected}}},function(){

              },function(){
                Attendance.create({studentId:x.id,date:$scope.dateSelected});
              });

            }
            else {
              if (x.id != null) {
                Attendance.delete({id:JSON.stringify(x.attendanceId).replace(/["']/g, "")},function(){},function(response){ console.log(response.data.error.message);});
              }
            }
          }
        }
              else if ($scope.userData.type =='Student') {

                $scope.list = Student.findOne({filter: {where: {id: $scope.userData.id}}}, function () {
                    $scope.chk($scope.list.id, $scope.list.firstName, 0);
                    console.log($scope.list);
                });

              }


			  }




 }])
      .filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
	})
      ;
