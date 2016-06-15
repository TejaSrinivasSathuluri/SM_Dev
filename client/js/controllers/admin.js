angular
  .module('app')
  .controller('LandingPageController', ['$scope', function ($scope) {

  }])
  .controller('DashboardController', ['$scope', 'Admin', '$state', function ($scope, Admin, $rootScope, $state) {

  }
  ])
  .controller('DirectoryController',
    ['$scope', 'ngDialog','Admin', '$state', 'School', 'Class', 'Student', 'Parent', 'StudentParent', 'Staff', '$rootScope', '$window',
      function ($scope,ngDialog, Admin, $state, School, Class, Student, Parent, StudentParent, Staff, $rootScope, $window) {
        $scope.user = $window.localStorage.getItem('user');
        var userData = JSON.parse($scope.user);
        $scope.schoolName= null;
        $scope.schoolId = userData.schoolId;
        $scope.school = School.findById({id:$scope.schoolId},function(){
          $rootScope.schoolName = $scope.school.schoolName;
        });

        $scope.date = new Date();
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
          console.log("Student Data "+response.data.error.message);
        });

          $scope.studentParent = StudentParent.find({filter: {where: {schoolId: $scope.schoolId}, include: 'parent'}},
            function (response) {
              var i = 0;
              $scope.parentList = [];
              response.forEach(function (studentParent) { $scope.p = studentParent.toJSON();
                                                          $scope.parentList[i] = $scope.p.parent;
                                                          i++;
                                                        }, $scope.parentList);

            }, function (response) {
                                    console.log("StudentParent Data " + response.data.error.message);
            });

        $scope.searchList = $scope.studentList;
        $scope.processSearch = function () {
          if ($scope.formData.staffSearch == true) {
            $scope.searchList = [];
            $scope.parentList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}});
          }
          else         {
            $state.go($state.current, {}, {reload: true});
          }
        }
        //--------------------------------------------------------
        $scope.addStudent = function () {
          $scope.studentExists = Student.findOne({
              filter: {
                where: {
                  schoolId: $scope.schoolId,
                  classId: $scope.formData.studentClass,
                  rollNo: $scope.formData.studentRollNo
                }
              }
            },
            function () {
              $scope.responsemessage = 'Student Already Exists For This Class With This Roll Number';
            },
            function () {

              $scope.newStudent = Student.create({
                  schoolId: $scope.schoolId,
                  username: $scope.formData.studentFirstName,
                  lastName: $scope.formData.studentLastName,
                  email: $scope.formData.studentEmail,
                  password: $scope.formData.studentPassword,
                  gender: $scope.formData.studentGender,
                  image: $scope.formData.studentImg,
                  dateofBirth: $scope.formData.studentDateOfBirth,
                  rollNo: $scope.formData.studentRollNo,
                  RFID: $scope.formData.studentRFID,
                  prevSchool: $scope.formData.studentPreviousSchool,
                  dateofJoin: $scope.formData.studentDateOfJoin,
                  classId: $scope.formData.studentClass,
                  status: $scope.formData.studentStatus,
                  regId: $scope.formData.studentRegId,
                  isDisable: $scope.formData.studentIsDisable,
                  prevSchoolTC: $scope.formData.studentPreviousTC,
                  currentAddress: $scope.formData.studentCurrentAddress,
                  currentCity: $scope.formData.studentCurrentCity,
                  currentState: $scope.formData.studentCurrentState,
                  currentPincode: $scope.formData.studentCurrentPincode,
                  bloodGroup: $scope.formData.studentBloodGroup,
                  religion: $scope.formData.studentReligion,
                  caste: $scope.formData.studentCaste,
                  alternateContact: $scope.formData.studentAlternateContact,
                  permanentAddress: $scope.formData.studentPermanentAddress,
                  permanentCity: $scope.formData.studentPermanentCity,
                  permanentState: $scope.formData.studentPermanentState,
                  permanentPincode: $scope.formData.studentPermanentPincode,
                  nationalId: $scope.formData.studentNationalId,
                  motherTounge: $scope.formData.studentMotherTounge,
                  nationalIdType: $scope.formData.studentNationalIdType,
                  subCaste: $scope.formData.studentSubCaste,
                  contact: $scope.formData.studentContact,
                  type: "Student",
                  created: $scope.date
                },
                function () {

                  if ($scope.formData.motherFirstName != null && $scope.formData.motherPassword != null && $scope.formData.motherEmail != null) {
                    console.log('creating mother');
                    $scope.newParent1 = Parent.create({
                        username: $scope.formData.motherFirstName,
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
                      username: $scope.formData.fatherFirstName,
                      lastName: $scope.formData.fatherLastName,
                      email: $scope.formData.fatherEmail,
                      contact: $scope.formData.fatherPhone,
                      password: $scope.formData.fatherPassword,
                      type: "Parent",
                      created: $scope.date
                    }, function () {
                      console.log('creating father parent relation');
                      StudentParent.create({
                        studentId: $scope.newStudent.id,
                        parentId: $scope.newParent2.id,
                        schoolId: $scope.schoolId
                      });
                      $state.go($state.current, {}, {reload: true});

                    }, function (response) {
                      console.log(response.data.error.message);
                    });
                  }

                }
              );


            });
        }
        $scope.deleteUser = function (x) {
          var dialog = ngDialog.open({template: 'deleteUser'});
          dialog.closePromise.then(function (data) {
            if (data.value && data.value != '$document')  {


              if (x.type == "Student") {
                Student.delete({id: x.id}, function () {
                  $scope.resultStudentParent =StudentParent.find({filter: {where: {studentId: x.id,schoolId:$scope.schoolId}}}, function (response) {
                      response.forEach(function(resultStudentParent){
                        var p = resultStudentParent.toJSON();

                        StudentParent.deleteById({id:p.id},function(){
                          console.log('deleting student and student relation with parent');
                          $state.go($state.current, {}, {reload: true});
                        },function(response){
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
                  $scope.resultStudentParent = StudentParent.find({filter: {where: {parentId: x.id,schoolId:$scope.schoolId}}},
                    function (response) {
                      response.forEach(function(resultStudentParent){
                        var p = resultStudentParent.toJSON();
                        StudentParent.deleteById({id:p.id},function(){
                          console.log('deleting  parent and  parent relation with student');
                          $state.go($state.current, {}, {reload: true});
                        },function(response){
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
        $scope.editUser = function (x) {
          ngDialog.openConfirm({template: 'editStudent',
            scope: $scope //Pass the scope object if you need to access in the template
          }).then(
            function(formData) {
              Student.upsert({id:x.id,
                  username: $scope.formData.studentFirstName,
                  lastName: $scope.formData.studentLastName,
                  email: $scope.formData.studentEmail,
                  password: $scope.formData.studentPassword,
                  gender: $scope.formData.studentGender,
                  image: $scope.formData.studentImg,
                  dateofBirth: $scope.formData.studentDateOfBirth,
                  rollNo: $scope.formData.studentRollNo,
                  RFID: $scope.formData.studentRFID,
                  prevSchool: $scope.formData.studentPreviousSchool,
                  dateofJoin: $scope.formData.studentDateOfJoin,
                  classId: $scope.formData.studentClass,
                  status: $scope.formData.studentStatus,
                  regId: $scope.formData.studentRegId,
                  isDisable: $scope.formData.studentIsDisable,
                  prevSchoolTC: $scope.formData.studentPreviousTC,
                  currentAddress: $scope.formData.studentCurrentAddress,
                  currentCity: $scope.formData.studentCurrentCity,
                  currentState: $scope.formData.studentCurrentState,
                  currentPincode: $scope.formData.studentCurrentPincode,
                  bloodGroup: $scope.formData.studentBloodGroup,
                  religion: $scope.formData.studentReligion,
                  caste: $scope.formData.studentCaste,
                  alternateContact: $scope.formData.studentAlternateContact,
                  permanentAddress: $scope.formData.studentPermanentAddress,
                  permanentCity: $scope.formData.studentPermanentCity,
                  permanentState: $scope.formData.studentPermanentState,
                  permanentPincode: $scope.formData.studentPermanentPincode,
                  nationalId: $scope.formData.studentNationalId,
                  motherTounge: $scope.formData.studentMotherTounge,
                  nationalIdType: $scope.formData.studentNationalIdType,
                  subCaste: $scope.formData.studentSubCaste,
                  contact: $scope.formData.studentContact

              },
                function () {$state.go($state.current, {}, {reload: true});});
            },
            function(value) {}
          );
        }
        $scope.updateUser = function () {
          if ($scope.formData.type == "Student") {
            Student.prototype$updateAttributes({id: $scope.formData.id},
              {contact: $scope.formData.newContact, username: $scope.formData.newName},
              function () {
                $state.go($state.current, {}, {reload: true});
              }, function (response) {
                if (response.data.error.status == 500)        $state.go($state.current, {}, {reload: true});
                console.log(response.data.error.message);
              });
          }
          else if ($scope.formData.type == "Parent") {
            Parent.prototype$updateAttributes({id: $scope.formData.id},
              {contact: $scope.formData.newContact, username: $scope.formData.newName},
              function () {
                $state.go($state.current, {}, {reload: true});
              }, function (response) {
                if (response.data.error.status == 500)        $state.go($state.current, {}, {reload: true});
                console.log(response.data.error.message);
              });
          }
          else if ($scope.formData.type == "Staff") {
            Staff.prototype$updateAttributes({id: $scope.formData.id},
              {contact: $scope.formData.newContact, username: $scope.formData.newName},
              function () {
                $state.go($state.current, {}, {reload: true});
              }, function (response) {
                if (response.data.error.status == 500)        $state.go($state.current, {}, {reload: true});
                console.log(response.data.error.message);
              });
          }


        }
        $scope.addStaff = function () {

          $scope.newStaff = Staff.create({
              schoolId: $scope.schoolId, username: $scope.formData.staffFirstName, lastName: $scope.formData.staffLastName,
              email: $scope.formData.staffEmail, password: $scope.formData.staffPassword,contact: $scope.formData.staffContact,
              gender: $scope.formData.staffGender,
              image: $scope.formData.staffImg,
              dateofBirth: $scope.formData.staffDateOfBirth,
              rollNo: $scope.formData.staffRollNo,
              RFID: $scope.formData.staffRFID,
              dateofJoin: $scope.formData.staffDateOfJoin,
              status: $scope.formData.staffStatus,
              regId: $scope.formData.staffRegId,
              currentAddress: $scope.formData.staffCurrentAddress,
              currentCity: $scope.formData.staffCurrentCity,
              currentState: $scope.formData.staffCurrentState,
              currentPincode: $scope.formData.staffCurrentPincode,
              bloodGroup: $scope.formData.staffBloodGroup,
              religion: $scope.formData.staffReligion,
              caste: $scope.formData.staffCaste,
              permanentAddress: $scope.formData.staffPermanentAddress,
              permanentCity: $scope.formData.staffPermanentCity,
              permanentState: $scope.formData.staffPermanentState,
              permanentPincode: $scope.formData.staffPermanentPincode,
              nationalId: $scope.formData.staffNationalId,
              motherTounge: $scope.formData.staffMotherTounge,
              nationalIdType: $scope.formData.staffNationalIdType,
              subCaste: $scope.formData.staffSubCaste,
              contact: $scope.formData.staffContact,
              type: 'Staff',created: $scope.date
            },
            function () {

              console.log("Add Staff" +$scope.newStaff);
              $state.go($state.current, {}, {reload: true});
            },
            function (response) {
              console.log("Add Staff Response" +response.data.error.message);
            }
          )
        }
        $scope.sortType     = 'username';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';

      }
    ])

  .controller('ClassController',
    ['$scope', 'Admin', '$state', 'School', 'Class', 'Student', 'Staff', '$rootScope', '$window',
      function ($scope, Admin, $state, School, Class, Student, Staff, $rootScope, $window) {
        $scope.user = $window.localStorage.getItem('user');
        var userData = JSON.parse($scope.user);
        $scope.schoolId = userData.schoolId;
        $scope.formData = [];
        $scope.staffList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}});
        $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}, include: 'staff'}});
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
              $scope.response = 'Class Already Exists';
            },
            function () {
              Class.create({
                  schoolId: $scope.schoolId, className: $scope.formData.className,
                  sectionName: $scope.formData.sectionName,
                  staffId: $scope.formData.staffSelected
                }, function () {
                  $state.go($state.current, {}, {reload: true});
                },
                function (response) {
                  console.log(response.data.error.message);
                });

            });
        }
        $scope.editClass = function (x) {
          $('#newStaff').val(x.staff.id);
        }
        $scope.deleteClass = function (x) {
          Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
          $state.go($state.current, {}, {reload: true});
        }
        $scope.updateClass = function (x) {
          Class.upsert({id: x.id, staffId: $scope.formData.newStaff},
            function () {
              $state.go($state.current, {}, {reload: true});
            }, function (response) {
            });
        }
      }
    ])

  .controller('SubjectController',
    ['$scope', 'Admin', '$state', 'School', 'Class', 'Student', 'Staff', 'Subject', '$rootScope', '$window',
      function ($scope, Admin, $state, School, Class, Student, Staff, Subject, $rootScope, $window) {
        $scope.user = $window.localStorage.getItem('user');
        var userData = JSON.parse($scope.user);
        $scope.schoolId = userData.schoolId;
        $scope.formData = [];
        $scope.staffList = Staff.find  ({filter: {where: {schoolId: $scope.schoolId}}});
        $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
        $scope.subjectList = Subject.find({filter: {include: ['staff', 'class']}});
        $scope.addSubject = function () {
          $scope.checkSub = Subject.findOne({
              filter: {
                where: {
                  className: $scope.classSelected,
                  subjectName: $scope.formData.subjectName
                }
              }
            },
            function () {
              $scope.response = 'Subject For ' + $scope.className + '-' + $scope.sectionName + ' Already Exists.';
            },
            function () {
              Subject.create({
                  subjectName: $scope.formData.subjectName,
                  classId: $scope.formData.classSelected,
                  staffId: $scope.formData.staffSelected
                },
                function () {
                  $state.go($state.current, {}, {reload: true});
                },
                function (response) {
                  $scope.response = response.data.error.message;
                }
              );
            });

        }
        $scope.updateSubject = function (y) {
          console.log($scope.formData.newStaff);
          Subject.upsert({id: JSON.stringify(y.id).replace(/["']/g, ""), staffId: $scope.formData.newStaff},
            function () {
              $state.go($state.current, {}, {reload: true});
            },
            function (response) {
              console.log(response.data.error.message);
            });
        }
        $scope.deleteSubject = function (x) {
          Subject.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
          $state.go($state.current, {}, {reload: true});
        }
      }])

  .controller('TimetableController', ['$scope', 'Admin', '$state', 'School', 'Timetable', '$rootScope', '$window',
    function ($scope, Admin, $state, School, Timetable, $rootScope, $window) {
      $scope.user = $window.localStorage.getItem('user');
      var userData = JSON.parse($scope.user);
      $scope.schoolId = userData.schoolId;
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

      $scope.addRecipient = function (receiver) {
        if (receiver.title.length != 0) {
          $scope.receivers.push({title: "", startTime: "", endTime: "", duration: "", attendance: ""});
        }
        else {
          alert('Please fill the fields');
        }
      }
      $scope.deleteRecipient = function (receiver) {
        for (var i = 0; i < $scope.receivers.length; i++) {
          if ($scope.receivers[i] === receiver) {
            $scope.receivers.splice(i, 1);
            break;
          }
        }
      }
      $scope.saveTimetable = function () {
        $scope.chkTimetable = School.timetables({"id": $scope.schoolId}, function () {
            if ($scope.receivers[0].title.length != 0 && $scope.receivers[0].startTime.length != 0 && $scope.receivers[0].endTime.length != 0) {
              $scope.newTimetable = Timetable.upsert({id: $scope.chkTimetable.id, schedule: $scope.receivers},
                function () {
                  $state.go($state.current, {}, {reload: true});
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
    }])

  .controller('ScheduleController', ['$scope', 'Admin', '$state', 'School', 'Class', 'Subject', 'Schedule', 'Timetable', '$rootScope', '$window',
    function ($scope, Admin, $state, School, Class, Subject, Schedule, Timetable, $rootScope, $window) {
      $scope.user = $window.localStorage.getItem('user');
      var userData = JSON.parse($scope.user);
      $scope.schoolId = userData.schoolId;
      $scope.scheduleList = [];
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
              console.log($scope.viewTimetable.schedule.length);
              for (var i = 0; i < $scope.viewTimetable.schedule.length; i++) {

                $scope.scheduleList[i] = $scope.viewTimetable.schedule[i];
                $scope.scheduleList[i].startTime = new Date($scope.viewTimetable.schedule[i].startTime);
                $scope.scheduleList[i].endTime = new Date($scope.viewTimetable.schedule[i].endTime);

                if ($scope.scheduleList[i].attendance == false){
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
                }, function () {            $state.go($state.current, {}, {reload: true});
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
              },function(){
                $state.go($state.current, {}, {reload: true});
              });

            });
        }

      }
}])

  .controller('NoticeboardController', ['$scope', '$state', 'School', 'Noticeboard', '$rootScope', '$window',
    function ($scope, $state, School, Noticeboard, $rootScope, $window) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.schoolId = $scope.user.schoolId;
      $scope.addNotice = function () {
        $scope.formData.date1 = new Date($scope.formData.date1);
        $scope.formData.date2 = new Date($scope.formData.date2);
        Noticeboard.create({
            title: $scope.formData.title,
            description: $scope.formData.description,
            date1: $scope.formData.date1,
            date2: $scope.formData.date2,
            uploadFile: $scope.formData.uploadFile,
            schoolId: $scope.schoolId
          },
          function () {
            $state.go($state.current, {}, {reload: true});
          }
        );
      }
      $scope.noticeList = [];
      $scope.noticeList = Noticeboard.find({filter: {where: {schoolId: $scope.schoolId}}}, function () {
      });
      $scope.deleteNotice = function (x) {
        Noticeboard.delete({id: x.id});
        $state.go($state.current, {}, {reload: true});

      }
      $scope.editNotice = function (x) {
      }
    }])

  .controller('LibraryController', ['$scope', '$state', 'School', 'Library', '$rootScope', '$window',
    function ($scope, $state, School, Library, $rootScope, $window) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.schoolId = $scope.user.schoolId;
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
        Library.delete({id: x.id});
        $state.go($state.current, {}, {reload: true});

      }
      $scope.editLibrary = function (x) {
      }

    }])

  .controller('AssignmentController', ['$scope', '$state', 'Class', 'Assignment', '$rootScope', '$window',
    function ($scope, $state, Class, Assignment, $rootScope, $window) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.schoolId = $scope.user.schoolId;
      $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.addAssignment = function () {
        Assignment.create({
            title: $scope.formData.title,
            classId: $scope.formData.classSelected,
            description: $scope.formData.description,
            fromDate: $scope.formData.fromDate,
            toDate: $scope.formData.toDate,
            uploadFile: $scope.formData.uploadFile,
            schoolId: $scope.schoolId
          },
          function () {
            $state.go($state.current, {}, {reload: true});
          },
          function (response) {
            console.log(response.data.error.message);
          });
      }
      $scope.assignmentlist = [];
      $scope.assignmentlist = Assignment.find({filter: {where: {schoolId: $scope.schoolId}, include: 'class'}});
      $scope.deleteAssignment = function (x) {
        Assignment.delete({id: x.id});
        $state.go($state.current, {}, {reload: true});
      }

    }])

;





