// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngDialog',
    'mgo-angular-wizard',
    'ngScrollbar',
    'ui.rCalendar',
    'calendarDemoApp'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    $stateProvider
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
    .state('holiday',               { url: '/schoolcalendar',    templateUrl: 'views/holiday.html',            controller: 'HolidayController',  authenticate: true})
    .state('profile',               { url: '/profile',           templateUrl: 'views/profile.html',            controller: 'ProfileController',  authenticate: true})
    .state('expensemanagement',     { url: '/expensemanagement', templateUrl: 'views/expensemanagement.html',  controller: 'ExpenseController',  authenticate: true})
    .state('exams',                 { url: '/exams',             templateUrl: 'views/exams.html',              controller: 'ExamController',  authenticate: true})
    .state('marks',                 { url: '/marks',             templateUrl: 'views/marks.html',              controller: 'MarksController',  authenticate: true})

      //--------------Auth Services
      .state('index',        { url: '/index',      controller: 'LandingPageController'})
    //.state('forbidden', { url: '/forbidden', templateUrl: 'views/forbidden.html'})
      .state('email',         { url: '/email',  templateUrl: 'views/email.html',   controller: 'EmailController'     })
      .state('login',         { url: '/login',  templateUrl: 'views/login.html',   controller: 'AuthLoginController' })
      .state('login.admin',   { url: '/admin',  templateUrl: 'views/admin.html',   controller: 'AuthLoginController' })
      .state('login.staff',   { url: '/staff',  templateUrl: 'views/staff.html',   controller: 'AuthLoginController' })
      .state('login.parent',  { url: '/parent', templateUrl: 'views/parent.html',  controller: 'AuthLoginController' })
      .state('login.student', { url: '/student',templateUrl: 'views/student.html', controller: 'AuthLoginController' })
      //.state('signup',        { url: '/signup', templateUrl: 'views/signup.html',  controller: 'SignUpController  ' })
      .state('logout',        { url: '/login',                                     controller: 'AuthLogoutController'})

     $urlRouterProvider.otherwise('login/admin');
  }])


  .run(['$rootScope', '$state','$window',function($rootScope, $state,$window) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in

      if (!$window.localStorage.getItem('user')) {
        if (next.authenticate && !$rootScope.currentUser) {
          event.preventDefault(); //prevent current page from loading
          $rootScope.currentUser = null;
          $rootScope.schoolName = null;
          $window.localStorage.clear();
          $state.go('login');
        }
      }
      $rootScope.currentUser = $window.localStorage.getItem('user');
    });
  }]);
