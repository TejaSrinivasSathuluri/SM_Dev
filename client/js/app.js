// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngDialog'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    $stateProvider
     .state('console', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        authenticate: true
      })
      .state('directory', {
        url: '/directory',
        templateUrl: 'views/directory.html',
        controller: 'DirectoryController',
        authenticate: true
      })
     .state('class', {
        url: '/class',
        templateUrl: 'views/class.html',
        controller: 'ClassController',
        authenticate: true
      })
     .state('subject', {
        url: '/subject',
        templateUrl: 'views/subject.html',
        controller: 'SubjectController',
        authenticate: true
      })
      .state('attendance', {
        url: '/attendance',
        templateUrl: 'views/attendance.html',
        controller: 'AttendanceController',
        authenticate: true
      })
     .state('timetable', {
        url: '/timetable',
        templateUrl: 'views/timetable.html',
        controller: 'TimetableController',
        authenticate: true
      })
      .state('schedule', {
        url: '/schedule',
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleController',
        authenticate: true
      })
      .state('noticeboard', {
        url: '/noticeboard',
        templateUrl: 'views/noticeboard.html',
        controller: 'NoticeboardController',
        authenticate: true
      })
      .state('library', {
        url: '/library',
        templateUrl: 'views/library.html',
        controller: 'LibraryController',
        authenticate: true
      })
      .state('assignment', {
        url: '/assignment',
        templateUrl: 'views/assignment.html',
        controller: 'AssignmentController',
        authenticate: true
      })

      //--------------Auth Services
      .state('index', {
        url: '/index',
        templateUrl: 'index.html',
        controller: 'LandingPageController'
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController',
      })
      .state('login.admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'AuthLoginController',
      })
      .state('login.staff', {
        url: '/staff',
        templateUrl: 'views/staff.html',
        controller: 'AuthLoginController',
      })
      .state('login.parent', {
        url: '/parent',
        templateUrl: 'views/parent.html',
        controller: 'AuthLoginController',
      })
      .state('login.student', {
        url: '/student',
        templateUrl: 'views/student.html',
        controller: 'AuthLoginController',
      })
      .state('logout', {
        url: '/login',
        controller: 'AuthLogoutController'
      })
     $urlRouterProvider.otherwise('/index/login');
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
