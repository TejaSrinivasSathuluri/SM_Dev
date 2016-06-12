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

    .controller('consoleController',    function($scope,$window,$localStorage)
    {
      $scope.user = $localStorage.user;
      $localStorage.studentList = $scope.studentList;

    })
    .controller('searchController',     function($scope,$window,$state,$localStorage,ngDialog,School,Class,Student,Parent,Staff) {
      $scope.schoolId = $localStorage.user.schoolId;
      $scope.classList  = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.studentList = Student.find({filter: {where: {schoolId: $scope.schoolId}, include: 'class'}});
      $scope.searchList = $scope.studentList;
	 $scope.formData={};
      $scope.processSearch = function(){
        if ($scope.formData.staffSearch != true) $scope.searchList = Staff.find({filter: {where: {schoolId: $scope.schoolId}}});
        else $scope.searchList = $scope.studentList;
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

       }
       );


      })
    .controller('subjectController',    function($scope,$localStorage,Class,Subject) {
      $scope.schoolId = $localStorage.user.schoolId;
      $scope.classList  = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});
      $scope.subjectList = Subject.find({filter: {include: ['staff', 'class']}});

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
    })
    .controller('noticeboardController',function($scope,$localStorage,$state,ngDialog,Noticeboard,Class){
      $scope.schoolId = $localStorage.user.schoolId
      $scope.noticeList = [];
      $scope.noticeList = Noticeboard.find({filter: {where: {schoolId: $scope.schoolId}}});

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

      $scope.librarylist = [];
      $scope.librarylist = Library.find({filter:{where:{schoolId:$scope.schoolId}}});

    })



;
