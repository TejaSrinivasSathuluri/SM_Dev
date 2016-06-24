// login.js
angular.module('formApp', ['ngAnimate','ui.router','lbServices','ngResource','ngStorage'])

    // ROUTES
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('form', {url: '/form', templateUrl: 'login/form.html', controller: 'formController'})
            // STUDENT
            .state('form.student', {url: '/student',templateUrl: 'login/student.html'})
            // PARENT
            .state('form.parent',  {url: '/parent',templateUrl: 'login/parent.html'})
            // ADMIN
            .state('form.admin',   {url: '/admin', templateUrl: 'login/admin.html'})
            // STAFF
            .state('form.staff',   {url: '/staff', templateUrl: 'login/staff.html'});

             // DEFAULT ROUTE
             $urlRouterProvider.otherwise('/form/student');
    })


     //LOGIN CONTROLLER
    .controller('formController', function($scope,$window,$localStorage,Parent,Student,Staff,Admin,StudentParent) {
        $scope.formData={};
        $scope.clearErr = function() {$scope.formData.errmsg='';}
        $scope.processForm = function(type) {

             $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
            if (type === 'P')
            {
                $scope.parent= Parent.login($scope.credentials,
                  function (response)
                 {
                    $localStorage.user = response.user; $localStorage.token = response.id;
						        $scope.studentList= StudentParent.find({filter: {where: {parentId: response.userId},include:'student'}});
                    $localStorage.studentList = $scope.studentList;
                    window.location='parent/index.html';
                 },
                  function (response) { $scope.formData.errmsg='Invalid Username or Password';});
            }
            else if (type === 'A')
            {
                $scope.admin = Admin.login($scope.credentials,
                    function (response) {
                        $localStorage.user = response.user;
                        $localStorage.token = response.id;
                        window.location='admin/index.html';
                       },
                    function (response) { $scope.formData.errmsg='Invalid Username or Password';});
            }
            else if (type === 'S')
            {
                    $scope.student = Student.login($scope.credentials,
            function (response) {
                        $localStorage.user = response.user;
                        $localStorage.token = response.id;
                        window.location='student/index.html';
                       },
                    function (response) { $scope.formData.errmsg='Invalid Username or Password';});}
            else if (type === 'T')
            {
                    $scope.staff = Staff.login($scope.credentials,
            function (response) {
                        $localStorage.user = response.user;
                        $localStorage.token = response.id;
                        window.location='staff/index.html';
                       },
                    function (response) { $scope.formData.errmsg='Invalid Username or Password';});}
        }

    });
