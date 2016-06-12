// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================

angular.module('formApp', ['ngAnimate','ui.router','lbServices','ngResource','ngDialog','ngStorage'])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dashboard',    {url: '/dashboard',    templateUrl: 'dashboard.html',       controller: 'consoleController'})
            .state('search',       {url: '/search',       templateUrl: 'directory.html',       controller: 'searchController'})
            .state('subject',      {url: '/subject',      templateUrl: 'subject.html',         controller: 'subjectController'})
            .state('class',        {url: '/class',        templateUrl: 'class.html',           controller: 'classController'})
            .state('attendance',   {url: '/attendance',   templateUrl: 'attendance.html',      controller: 'attendanceController'})
            .state('timetable',    {url: '/timetable',    templateUrl: 'timetable.html',       controller: 'timetableController'})
            .state('schedule',     {url: '/schedule',     templateUrl: 'schedule.html',        controller: 'scheduleController'})
            .state('notice',       {url: '/notice',       templateUrl: 'notice.html',          controller: 'noticeboardController'})
            .state('settings',     {url: '/settings',     templateUrl: 'settings.html',        controller: 'settingsController'})
            .state('assignment',   {url: '/assignment',   templateUrl: 'assignment.html',      controller: 'assignmentController'})
            .state('library',      {url: '/library',      templateUrl: 'library.html',         controller: 'libraryController'})
            $urlRouterProvider.otherwise('/dashboard');
    })

    .controller('consoleController',    function($scope,$window,$localStorage) {$scope.user = $localStorage.user;})
    .controller('searchController',     function($scope,$window,$state,$localStorage,ngDialog,School,Class,Student,Parent,Staff) {
      $scope.schoolId = $localStorage.user.schoolId;
      $scope.classList  = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.studentList = Student.find({filter: {where: {schoolId: $scope.schoolId}, include: 'class'}});
      $scope.searchList = $scope.studentList;
      $scope.processSearch = function(){
        if ($scope.formData.staffSearch != true) $scope.searchList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}});
        else $scope.searchList = $scope.studentList;
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

            $scope.newStudent = School.students.create({id: $scope.schoolId}, {
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

                if ($scope.formData.motherFirstName != null && $scope.formData.motherPassword != null && $scope.formData.motherEmail != null) {
                  Student.parents.create({id: $scope.newStudent.id}, {
                    username: $scope.formData.motherFirstName,
                    lastName: $scope.formData.motherLastName,
                    email: $scope.formData.motherEmail,
                    contact: $scope.formData.motherPhone,
                    password: $scope.formData.motherPassword
                  });

                }
                if ($scope.formData.fatherFirstName != null && $scope.formData.fatherPassword != null && $scope.formData.fatherEmail != null) {
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
      $scope.deleteStudent = function(x) {   var dialog = ngDialog.open({template: 'deleteStudent'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document') Student.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
          $state.go($state.current, {}, {reload: true});
          return true;
        });


      }
      $scope.addStaff = function () {
        $scope.newStaff = School.staffs.create({id: $scope.schooId}, {
            username: $scope.formData.staffFirstName, lastName: $scope.formData.staffLastName,
            email: $scope.formData.staffEmail, password: $scope.formData.staffPassword
          },
          function () {console.log($scope.response.data);},
          function (response) { console.log(response.data.error.message);}
        )
        $scope.response = 'Staff ' + $scope.formData.staffFirstName + 'is Created';
      }
    })
    .controller('classController',      function($scope,$window,$state,$localStorage,ngDialog,School,Class,Staff,Subject) {
        $scope.formData = [];
        $scope.schoolId = $localStorage.user.schoolId;
        $scope.staffList = Staff.find  ({filter: {where: {schoolId: $scope.schoolId}}});
        $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}, include: 'staff'}});
        $scope.searchList = Subject.find({filter: {where: {schoolId: $scope.schoolId}, include: 'class'}});
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
              School.classes.create({id: $scope.schoolId},
                {
                  className: $scope.formData.className,
                  sectionName: $scope.formData.sectionName,
                  staffId: $scope.formData.staffSelected
                });
              $state.go($state.current, {}, {reload: true});
            });
        }
        $scope.editClass = function (x) {
          $('#newStaff').val(x.staff.id);
        }
        $scope.deleteClass = function (x) {
          var dialog = ngDialog.open({template: 'deleteClass'});
          dialog.closePromise.then(function (data) {
            if (data.value && data.value != '$document') Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
            $state.go($state.current, {}, {reload: true});
            return true;
          });


        }
        $scope.updateClass = function (x) {
          Class.upsert({id: JSON.stringify(x.id).replace(/["']/g, ""), staffId: $scope.newStaff},
            function () {
              $state.go($state.current, {}, {reload: true});
            },
            function (response) {
              $scope.response = console.log(response.data.error.message);
            });
        }
       })
    .controller('timetableController',  function($scope,$window,$state,$localStorage,ngDialog,School,Timetable) {

       $scope.schoolId = $localStorage.user.schoolId;
       $scope.viewTimetable = School.timetables({"id": $scope.schoolId},function(){
         $scope.receivers = [];
         for(var i=0;i<$scope.viewTimetable.schedule.length;i++)
         {
           $scope.receivers.push({title: $scope.viewTimetable.schedule[i].title,startTime: $scope.viewTimetable.schedule[i].startTime,
                                  endTime: $scope.viewTimetable.schedule[i].endTime, duration: $scope.viewTimetable.schedule[i].duration,
                                  attendance: $scope.viewTimetable.schedule[i].attendance});
         }

       },
         function(){
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
          $scope.chkTimetable = School.timetables({"id": $scope.schoolId},
           function(){
             if ($scope.receivers[0].title.length !=0  && $scope.receivers[0].startTime.length !=0&& $scope.receivers[0].endTime.length !=0 ){
                 $scope.newTimetable = Timetable.upsert({id: $scope.chkTimetable.id,schedule: $scope.receivers},
                 function(){$state.go($state.current, {}, {reload: true});});
             }
             else {
               alert('Please fill the fields');
             }

           },
           function() {
             $scope.newTimetable = Timetable.create({schoolId: $scope.schoolId,schedule: $scope.receivers});
             $state.go($state.current, {}, {reload: true});
           });
       }

      })
    .controller('subjectController',    function($scope,$window,$state,$localStorage,ngDialog,Class,Staff,Subject) {
      $scope.schoolId = $localStorage.user.schoolId;
      $scope.staffList  = Staff.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.classList  = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.subjectList = Subject.find({filter: {include: ['staff', 'class']}});
      $scope.addSubject = function () {
        $scope.checkSub = Subject.findOne({filter: {where: {className: $scope.classSelected, subjectName: $scope.formData.subjectName}}},
          function () {$scope.response = 'Subject For ' + $scope.className + '-' + $scope.sectionName + ' Already Exists.';},
          function () {
            Subject.create({ subjectName: $scope.formData.subjectName,classId: $scope.formData.classSelected,staffId: $scope.formData.staffSelected},
              function () { $state.go($state.current, {}, {reload: true});},
              function (response) {$scope.response = response.data.error.message;}
            );
          });

      }
      $scope.updateSubject = function (y) {
        Subject.upsert({id: JSON.stringify(y.id).replace(/["']/g, ""), staffId: $scope.newStaff},
          function () {$state.go($state.current, {}, {reload: true});},
          function (data) {console.log(data.statusText);});
      }
      $scope.deleteSubject = function (x) {

        var dialog = ngDialog.open({template: 'deleteSubject'});
        dialog.closePromise.then(function (data) {

          if (data.value && data.value != '$document')
          {
            Subject.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
            $state.go($state.current, {}, {reload: true});
          }
          return true;
        });

      }

    })
    .controller('attendanceController', function($scope,$window,$state,$localStorage,ngDialog,Class,Subject) {
      $scope.schoolId = $localStorage.user.schoolId;


    })
    .controller('scheduleController',   function($scope,$window,$state,$localStorage,ngDialog,Class,School,Timetable,Subject,Schedule) {
      $scope.schoolId = $localStorage.user.schoolId;
      $scope.scheduleList=[];
      $scope.classList =  Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.loadSchedule = function(){
      $scope.subjectList = Subject.find({filter: {where: {classId: $scope.class}}});
      }
      $scope.viewTimetable = School.timetables({"id": $scope.schoolId},function() {
        for (var i=0; i < $scope.viewTimetable.schedule.length; i++) { $scope.scheduleList[i] = $scope.viewTimetable.schedule[i];}
      });
      $scope.saveSchedule = function(){
             Timetable.schedules.create({"id":$scope.viewTimetable.id},
        {classId:$scope.class,schedule:$scope.scheduleList},function (response){console.log(response.body);},function (response){console.log(response.data.error.message)});
      }

    })
    .controller('noticeboardController',function($scope,$localStorage,$state,ngDialog,Noticeboard,Class){
      $scope.schoolId = $localStorage.user.schoolId
      $scope.addNotice=function () {
    Noticeboard.create({
        title: $scope.formData.title,
        description: $scope.formData.description,
        date1: $scope.formData.date1,date2: $scope.formData.date2,
        uploadFile: $scope.formData.uploadFile,
        schoolId: $scope.schoolId
      },
      function () { $state.go($state.current, {}, {reload: true});}
    );
  }
      $scope.noticeList = [];
      $scope.noticeList = Noticeboard.find({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.deleteNotice = function (x) {
        var dialog = ngDialog.open({template: 'deleteNotice'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document') Noticeboard.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
          $state.go($state.current, {}, {reload: true});
          return true;
        });
      }
      $scope.editNotice =function (x){
        ngDialog.openConfirm({template: 'editNotice',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            console.log(x.id);
            Noticeboard.upsert({id:x.id, title : formData.title,description: formData.description,date1: formData.date1,date2:formData.date2,uploadFile:formData.uploadFile},
              function () {$state.go($state.current, {}, {reload: true});});
          },
          function(value) {
            //Cancel or do nothing
          }
        );
      }
      $scope.updateNotice = function (y) {

      }
    })

    .controller('assignmentController', function($scope,$localStorage,$state,ngDialog,Assignment,Class){
       $scope.schoolId = $localStorage.user.schoolId;
      $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.addAssignment=function () {
        Assignment.create({
            title:       $scope.formData.title,
            classId:     $scope.formData.classSelected,
            description: $scope.formData.description,
            fromDate:    $scope.formData.fromDate,
            toDate:      $scope.formData.toDate,
            uploadFile:  $scope.formData.uploadFile,
            schoolId:    $scope.schoolId
          },
          function () { $state.go($state.current, {}, {reload: true});},
          function (response) { console.log($scope.response);});
      }
      $scope.assignmentlist = [];
      $scope.assignmentlist = Assignment.find({filter: {where: {schoolId: $scope.schoolId},include:'class'}});
      console.log($scope.assignmentlist);
      $scope.deleteAssignment = function (x) {
        var dialog = ngDialog.open({template: 'deleteAssignment'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document') {
            Assignment.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
            $state.go($state.current, {}, {reload: true});
          }
          return true;
        });


      }
      $scope.editAssignment =function (x){
        ngDialog.openConfirm({template: 'editAssignment',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            console.log(x.id);
            Assignment.upsert({id:x.id, title : formData.title,classId: formData.classSelected,
			                   description: formData.description,toDate: formData.toDate,fromDate:formData.fromDate,
							   uploadFile:formData.uploadFile},
              function () {$state.go($state.current, {}, {reload: true});});
          }
        );
      }

    })
    .controller('libraryController',    function($scope,$localStorage,$state,ngDialog,School,Library) {
      $scope.schoolId = $localStorage.user.schoolId;
      $scope.addLibrary = function () {
        School.libraries.create({id: $scope.schoolId}, {
            name: $scope.formData.name, author: $scope.formData.author, description: $scope.formData.description,
            price: $scope.formData.price, available: $scope.formData.available
          },
          function () {
            $state.go($state.current, {}, {reload: true});
          },
          function (response) {
            console.log($scope.response);
          });
      }
      $scope.librarylist = [];
      $scope.librarylist = Library.find({filter:{where:{schoolId:$scope.schoolId}}});
      $scope.deleteLibrary = function (x) {

        var dialog = ngDialog.open({template: 'deleteLibrary'});

        dialog.closePromise.then(function (data) {

          if (data.value && data.value != '$document') {
            Library.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
            $state.go($state.current, {}, {reload: true});
            //$scope.showClass();
          }


          return true;
        });


      }
      $scope.editLibrary =function (x){
        ngDialog.openConfirm({template: 'editLibrary',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            console.log(x.id);
            Library.upsert({id:x.id, name : formData.name,author : formData.author,description: formData.description,price: formData.price,available:formData.available},
              function () {$state.go($state.current, {}, {reload: true});});
          },
          function(value) {
            //Cancel or do nothing
          }
        );
      }

    })
    .controller('settingsController',   function($scope,$localStorage,$state,ngDialog,Noticeboard,Class){
       $scope.schoolId = $localStorage.user.schoolId;
      $scope.getNumber = function() {
        $scope.num = 5;
        //return new Array(num);
      }

    })



;
