// Copyright Cylus Creators. 2016. All Rights Reserved.
// Node module: Study Monitor-Routing JS File

angular
  .module('app', [ 'ui.router','lbServices','ngDialog','mgo-angular-wizard','ngScrollbar','ui.rCalendar','calendarDemoApp'])
  .config(function($stateProvider,$urlRouterProvider,$locationProvider) {
    $stateProvider

    // Functional Routes
    .state('dashboard',             { url: '/dashboard',         templateUrl: 'views/dashboard.html',          controller: 'LandingPageController',       authenticate: true})
    .state('pdashboard',            { url: 'parent/dashboard',   templateUrl: 'views/parent/dashboard.html',   controller: 'ParentLandingPageController', authenticate: true})
   
    .state('directory',             { url: '/directory',         templateUrl: 'views/directory.html',          controller: 'DirectoryController',         authenticate: true})
   
    .state('class',                 { url: '/class',             templateUrl: 'views/class/class.html',              controller: 'ClassController',       authenticate: true})
    .state('addclass',              { url: '/addclass',          templateUrl: 'views/class/addclass.html',           controller: 'AddClassController',    authenticate: true})
    
    
    
    .state('subject',               { url: '/subject',           templateUrl: 'views/subject/subject.html',            controller: 'SubjectController',     authenticate: true})
    .state('addsubject',            { url: '/addsubject',        templateUrl: 'views/subject/addsubject.html',         controller: 'AddSubjectController',  authenticate: true})
    
    
    
    
    .state('attendance',            { url: '/attendance',        templateUrl: 'views/attendance.html',         controller: 'AttendanceController',  authenticate: true})
    .state('timetable',             { url: '/timetable',         templateUrl: 'views/timetable.html',          controller: 'TimetableController',   authenticate: true})
    .state('transport',             { url: '/transport',         templateUrl: 'views/transport.html',          controller: 'TransportController',   authenticate: true})
    .state('schedule',              { url: '/schedule',          templateUrl: 'views/schedule.html',           controller: 'ScheduleController',    authenticate: true})
    .state('noticeboard',           { url: '/noticeboard',       templateUrl: 'views/noticeboard.html',        controller: 'NoticeboardController', authenticate: true})
    .state('library',               { url: '/library',           templateUrl: 'views/library.html',            controller: 'LibraryController',     authenticate: true})
    .state('assignment',            { url: '/assignment',        templateUrl: 'views/assignment.html',         controller: 'AssignmentController',  authenticate: true})
    .state('holiday',               { url: '/schoolcalendar',    templateUrl: 'views/holiday.html',            controller: 'HolidayController',     authenticate: true})
    .state('profile',               { url: '/profile',           templateUrl: 'views/profile.html',            controller: 'ProfileController',     authenticate: true})
    .state('expensemanagement',     { url: '/expensemanagement', templateUrl: 'views/expensemanagement.html',  controller: 'ExpenseController',     authenticate: true})
    .state('fees',                  { url: '/feepayments',       templateUrl: 'views/fee.html',                controller: 'FeeController',         authenticate: true})
    .state('exams',                 { url: '/exams',             templateUrl: 'views/exams.html',              controller: 'ExamController',        authenticate: true})
    .state('grades',                { url: '/grades',            templateUrl: 'views/grades.html',             controller: 'GradeController',       authenticate: true})
    .state('marks',                 { url: '/marks',             templateUrl: 'views/marks.html',              controller: 'MarksController',       authenticate: true})
    .state('bulk',                  { url: '/bulkuploads',       templateUrl: 'views/bulk.html',               controller: 'BulkController',        authenticate: true})
    .state('bulkremove',            { url: '/bulkremovals',      templateUrl: 'views/bulkremovals.html',       controller: 'BulkDeleteController',  authenticate: true})
    .state('mediauploads',          { url: '/mediauploads',      templateUrl: 'views/mediauploads.html',       controller: 'MediaUploadController',  authenticate: true})
    // Functional Routes




      //--------------Auth Services
      .state('index',         { url: '/index',  templateUrl: 'views/index.html' , controller: 'IndexController'})
      .state('/',             {                                                    controller: 'IndexController'})
      .state('email',         { url: '/email',  templateUrl: 'views/email.html',   controller: 'EmailController'      })
      .state('login',         { url: '/login',  templateUrl: 'views/login.html',   controller: 'AuthLoginController'  })
      .state('logout',        { url: '/login',                                     controller: 'AuthLogoutController'})
      //--------------Auth Services




      .state('signup',        { url: '/signup', templateUrl: 'views/signup.html',  controller: 'SignUpController' })

     $urlRouterProvider.otherwise('login');
    //  $locationProvider.html5Mode({ enabled: true, requireBase: false});
     
  })



// Authentication Part For Page Reload and Redirect
  .run(function($rootScope, $state,$window,$timeout) 
  {
    $rootScope.$on('$stateChangeStart', function(event, next) 
    {
      // redirect to login page if not logged in

      if (!$window.localStorage.getItem('user')) 
      {
            if (next.authenticate && !$rootScope.currentUser) {
              event.preventDefault(); //prevent current page from loading
              $rootScope.currentUser = null;
              $rootScope.schoolName = null;
              $window.localStorage.clear();
              $state.go('login');
            }
      }
      else
      {

            
              $rootScope.currentUser = $window.localStorage.getItem('user');
              $rootScope.user = JSON.parse($rootScope.currentUser); 

                if($window.localStorage.getItem('parent'))
                {
                    $rootScope.studentsData = $window.localStorage.getItem('students');
                    $rootScope.students = JSON.parse($rootScope.studentsData);
                    $rootScope.Parent = true;
                } 

            if ($rootScope.user.type == 'Student')
            {
                  $rootScope.Student = true;
                  $timeout(function () 
                  { 
                    if ($state.current.name == 'expensemanagement') $state.go('logout');
                    
                  }, 100);
            }
            else if ($rootScope.user.type == 'Admin')
            {
              $rootScope.Admin = true;
            }            
            else if ($rootScope.user.type == 'Staff')
            {
              $rootScope.Staff = true;
            }
      }
    });
  });
// Authentication Part For Page Reload and Redirect
  
