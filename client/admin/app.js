// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate','ui.router','lbServices','ngResource','ngDialog'])


    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        // route to show our basic form (/form)
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'dashboard.html',
                controller: 'formController'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'schooldirectory.html',
                controller: 'formController'
            })

            .state('subject', {
                url: '/subject',
                templateUrl: 'subject.html',
                controller: 'formController'
            })

            .state('class', {
                url: '/class',
                templateUrl: 'class.html',
                controller: 'formController',
            })
            .state('attendance', {
                url: '/attendance',
                templateUrl: 'attendance.html',
                controller: 'formController',
            })
             .state('timetable', {
                url: '/timetable',
                templateUrl: 'timetable.html',
                controller: 'formController',
            })
          .state('classschedule', {
                url: '/classschedule',
                templateUrl: 'classschedule.html',
                controller: 'formController',
            })
            .state('payment', {
                url: '/payment',
                templateUrl: 'payment.html',
                controller: 'formController'
            })
        $urlRouterProvider.otherwise('/dashboard');
    })

    .controller('formController', function($scope,$state,$window,ngDialog,Admin,School,Class,Student,Staff,Subject,Parent,Timetable,Schedule,FeeType) {

      // Admin Details
      $scope.formData = {};
      $scope.admin = Admin.getCurrent(function () {
        $scope.school = Admin.school({"id": $scope.admin['id']},
          function () {
            $scope.showClass();
            $scope.showStaff();
            $scope.showSubject();
            $scope.showTimetable();
          });
      });


      //-------------Search Function
      $scope.processSearch = function () {
        $scope.searchList = [];
        $scope.searchList =Student.find({filter: {where: {schoolId: $scope.school.id}, include: 'class'}}); ;

      }

      //-------------Class
      $scope.addClass = function () {
        $scope.classExists = Class.findOne({
            filter: {
              where: {
                schoolId: $scope.school.id,
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
              className: $scope.formData.className, sectionName: $scope.formData.sectionName,
              schoolId: $scope.school.id, staffId: $scope.formData.staffSelected
            });
            $state.go($state.current, {}, {reload: true});

          });


      }
      $scope.showClass = function () {
        $scope.classList = [];
        $scope.classList = Class.find({filter: {where: {schoolId: $scope.school.id}, include: 'staff'}});

      }
      $scope.editClass = function (x) {
        $('#staffSelected1').val(x.staff.id);
      }
      $scope.deleteClass = function (x) {
        //ngDialog.open({template :'deleteClass'})  ;
        var dialog = ngDialog.open({template: 'deleteClass'});

        dialog.closePromise.then(function (data) {

          if (data.value && data.value != '$document') {
            Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
            $scope.showClass();
          }
          else {

          }

          return true;
        });


      }
      $scope.updateClass = function (x) {
        Class.upsert({id: JSON.stringify(x.id).replace(/["']/g, ""), staffId: $scope.formData.staffSelected1},
          function () {
            $state.go($state.current, {}, {reload: true});
          },
          function (response) {
            $scope.response = console.log(response.data.error.message);
          });
      }



      //------------- Subjects
      $scope.addSubject = function () {
        $scope.checkSub = Subject.findOne(
          {
            filter: {where: {className: $scope.classSelected, subjectName: $scope.formData.subjectName}}
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
                $scope.response = response.data.error.details.message;
              }
            );


          });

      }
      $scope.updateSubject = function (y) {
        Subject.upsert({
          id: JSON.stringify(y.id).replace(/["']/g, ""),
          staffId: $scope.formData.staffSelected2
        }, function () {
          $state.go($state.current, {}, {reload: true});
        }, function (data) {
          console.log(data.statusText);
        });
      }
      $scope.deleteSubject = function (x) {

        var dialog = ngDialog.open({template: 'deleteSubject'});

        dialog.closePromise.then(function (data) {

          if (data.value && data.value != '$document') {
            Subject.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
            $scope.showSubject();
          }
          else {

          }

          return true;
        });


      }
      $scope.showSubject = function () {
        $scope.resultlist = [];
        $scope.resultlist = Subject.find({filter: {include: ['staff', 'class']}}
        );


      }


      $scope.addStudent = function () {
        $scope.studentExists = Student.findOne({
            filter: {
              where: {
                schoolId: $scope.school.id,
                classId: $scope.formData.studentClass,
                rollNo: $scope.formData.studentRollNo
              }
            }
          },
          function () {
            $scope.responsemessage = 'Student Already Exists For This Class With This Roll Number';
          },
          function () {

            $scope.newStudent = School.students.create({id: $scope.school.id}, {
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
              function () {

                if ($scope.formData.motherFirstName != null && $scope.formData.motherLastName != null && $scope.formData.motherPassword != null && $scope.formData.motherEmail != null) {
                  Student.parents.create({id: $scope.newStudent.id}, {
                    username: $scope.formData.motherFirstName,
                    lastName: $scope.formData.motherLastName,
                    email: $scope.formData.motherEmail,
                    contact: $scope.formData.motherPhone,
                    password: $scope.formData.motherPassword
                  });

                }
                if ($scope.formData.fatherFirstName != null && $scope.formData.fatherLastName != null && $scope.formData.fatherPassword != null && $scope.formData.fatherEmail != null) {
                  Student.parents.create({id: $scope.newStudent.id}, {
                    username: $scope.formData.fatherFirstName,
                    lastName: $scope.formData.fatherLastName,
                    email: $scope.formData.fatherEmail,
                    contact: $scope.formData.fatherPhone,
                    password: $scope.formData.fatherPassword
                  });
                }
                $state.go($state.current, {}, {reload: true});

              }
            );


          });
      }
      $scope.addStaff = function () {
        $scope.newStaff = School.staffs.create({id: $scope.school.id}, {
            username: $scope.formData.staffFirstName, lastName: $scope.formData.staffLastName,
            email: $scope.formData.staffEmail, password: $scope.formData.staffPassword
          },
          function () {
            console.log($scope.response.data);
          },
          function (response) {
            console.log(response.data.error.message);
          }
        )
        $scope.response = 'Staff ' + $scope.formData.staffFirstName + 'is Created';
      }
      $scope.showStaff = function () {
        $scope.staffList = Staff.find  ({filter: {where: {schoolId: $scope.school.id}}});
      }

      //   TimeTables---------------------
      $scope.receivers = [{title: " ", startTime: "", endTime: "1", duration: "", attendance: ""}];
      $scope.addRecipient = function (receiver) { $scope.receivers.push({title: "", startTime: "", endTime: "", duration: "", attendance: ""}); }

      $scope.deleteRecipient = function (receiver) {
        for (var i = 0; i < $scope.receivers.length; i++) {
          if ($scope.receivers[i] === receiver) {
            $scope.receivers.splice(i, 1);
            break;
          }
        }
      }
      $scope.saveTimetable = function () {
        $scope.newTimetable = School.timetables.create({id: $scope.school.id},{ schedule : $scope.receivers},function(){},function(){});
      }

      $scope.showTimetable = function() {
          $scope.viewTimetable = School.timetables({"id": $scope.school['id']});
        //console.log($scope.viewTimetable);
      }

    //  ----------------------------------------
    });
