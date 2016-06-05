// login.js
angular.module('formApp', ['ngAnimate','ui.router','lbServices','ngResource'])

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
    .controller('formController', function($scope,Parent,Student,Staff,Admin) {
        $scope.formData={};

        $scope.clearErr = function() {
            $scope.formData.errmsg='';
        }
        $scope.processForm = function(type) {
            if (type === 'P')
            {
            $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
            $scope.parent= Parent.login($scope.credentials,
                function (response) { window.location='parent/index.html';},
                function (response) { $scope.formData.errmsg='Invalid Login';});
            }
            else if (type === 'A')
            {
                $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
                $scope.admin = Admin.login($scope.credentials,
                    function (response) { window.location='admin/index.html';},
                    function (response) { $scope.formData.errmsg='Invalid Login';});
            }
            else if (type === 'S')
            {
                $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
                $scope.student = Student.login($scope.credentials,
                    function (response) { window.location='student/index.html';},
                    function (response) { $scope.formData.errmsg='Invalid Login';});
            }
            else if (type === 'T')
            {
                $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
                $scope.staff = Staff.login($scope.credentials,
                    function (response) { window.location='staff/index.html';},
                    function (response) { $scope.formData.errmsg='Invalid Login';});
            }
        }
        $scope.resetPassword = function(type) {
            if (type === 'P')
            {
            $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
            $scope.parent= Parent.login($scope.credentials,
                function (response) { window.location='parent/index.html';},
                function (response) { $scope.formData.errmsg='Invalid Login';});
            }
            else if (type === 'A')
            {
                $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
                $scope.admin = Admin.login($scope.credentials,
                    function (response) { window.location='admin/index.html';},
                    function (response) { $scope.formData.errmsg='Invalid Login';});
            }
            else if (type === 'S')
            {
                $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
                $scope.student = Student.login($scope.credentials,
                    function (response) { window.location='student/index.html';},
                    function (response) { $scope.formData.errmsg='Invalid Login';});
            }
            else if (type === 'T')
            {
                $scope.credentials={"email":$scope.formData.email,"password":$scope.formData.password};
                $scope.staff = Staff.login($scope.credentials,
                    function (response) { window.location='staff/index.html';},
                    function (response) { $scope.formData.errmsg='Invalid Login';});
            }
        }


    });