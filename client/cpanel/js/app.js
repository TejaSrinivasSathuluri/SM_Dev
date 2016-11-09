// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })

        .state('home', {
          url: '/home',
          templateUrl: 'views/welcome.html',
          controller: 'WelcomeController',
          authenticate: true
        })
        .state('home.admin', {
          url: '/admin',
          templateUrl: 'views/admin.html',
          controller: 'AdminController'
        })
        .state('home.school', {
          url: '/school',
          templateUrl: 'views/school.html',
          controller: 'SchoolController'
        })
      .state('home.class', {
        url: '/class',
        templateUrl: 'views/class.html',
        controller: 'ClassController'
      })
      .state('home.subject', {
        url: '/subject',
        templateUrl: 'views/subject.html',
        controller: 'SubjectController'
      })
      .state('home.student', {
        url: '/student',
        templateUrl: 'views/student.html',
        controller: 'StudentController'
      })
      .state('home.staff', {
        url: '/staff',
        templateUrl: 'views/staff.html',
        controller: 'StaffController'
      })
      .state('home.parent', {
        url: '/parent',
        templateUrl: 'views/parent.html',
        controller: 'ParentController'
      })
      .state('home.notice', {
        url: '/notice',
        templateUrl: 'views/notice.html',
        controller: 'NoticeController'
      })
      .state('home.grade',{
        url: '/grade',
        templateUrl: 'views/grade.html',
        controller: 'GradeController'
      })
      .state('home.busservices',{
        url: '/busservices',
        templateUrl: 'views/busservice.html',
        controller: 'BusServiceController'
      })
      .state('home.assignment',{
        url: '/assignment',
        templateUrl: 'views/assignment.html',
        controller: 'AssignmentController'
      })

      .state('home.bus',{
        url: '/bus',
        templateUrl: 'views/bus.html',
        controller: 'BusController'
      })
      .state('home.exam',{
        url: '/exam',
        templateUrl: 'views/exam.html',
        controller: 'ExamController'
      })
      .state('home.expense',{
        url: '/expense',
        templateUrl: 'views/expense.html',
        controller: 'ExpenseController'
      })
      .state('home.book',{
        url: '/book',
        templateUrl: 'views/book.html',
        controller: 'LibraryController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      });
    $urlRouterProvider.otherwise('login');
  }])
  .run(['$rootScope', '$state','$window',function($rootScope, $state,$window) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
      $rootScope.currentUser = $window.localStorage.getItem('user');
    });
  }]);
