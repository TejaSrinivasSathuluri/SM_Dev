// Copyright Cylus Creators. 2016. All Rights Reserved.
// Node module: Study Monitor-Routing JS File

angular
  .module('app', [ 'ui.router','lbServices','ngDialog','mgo-angular-wizard','ngScrollbar','ui.rCalendar','calendarDemoApp'])
  .config(function($stateProvider,$urlRouterProvider,$locationProvider) {
    $stateProvider

    // Functional Routes
    .state('dashboard',             { url: '/dashboard',         templateUrl: 'views/dashboard.html',          controller: 'LandingPageController', authenticate: true})
    .state('directory',             { url: '/directory',         templateUrl: 'views/directory.html',          controller: 'DirectoryController',   authenticate: true})
    .state('class',                 { url: '/class',             templateUrl: 'views/class.html',              controller: 'ClassController',       authenticate: true})
    .state('subject',               { url: '/subject',           templateUrl: 'views/subject.html',            controller: 'SubjectController',     authenticate: true})
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
    // Functional Routes




      //--------------Auth Services
      .state('index',         { url: '/index',                                     controller: 'IndexController'})
      .state('/',         {                                      controller: 'IndexController'})
      .state('email',         { url: '/email',  templateUrl: 'views/email.html',   controller: 'EmailController'      })
      .state('login',         { url: '/login',  templateUrl: 'views/login.html',   controller: 'AuthLoginController'  })
      .state('logout',        { url: '/login',                                     controller: 'AuthLogoutController'})
      //--------------Auth Services




      .state('signup',        { url: '/signup', templateUrl: 'views/signup.html',  controller: 'SignUpController' })

     $urlRouterProvider.otherwise('/');
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
            console.log('User Logged In');
            var user = JSON.parse($rootScope.currentUser);
            if (user.type == 'Student'){
            $timeout(function () 
            { 
              if ($state.current.name == 'expensemanagement') $state.go('logout');
               
            }, 100); 
            }
      }
    });
  });
// Authentication Part For Page Reload and Redirect
  
