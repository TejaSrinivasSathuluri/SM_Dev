// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

    // configuring our routes
    // =============================================================================
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        // route to show our basic form (/form)
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'dashboard.html',
                controller: 'formController'
            })

            // nested states
            // each of these sections will have their own view
            // url will be nested (/form/profile)
        //    .state('form.student', {
        //        url: '/student',
        //        templateUrl: 'student.html'
        //    })
        //
        //    // url will be /form/interests
        //    .state('form.parent', {
        //        url: '/parent',
        //        templateUrl: 'parent.html'
        //    })
        //
        //    // url will be /form/payment
        //    .state('form.admin', {
        //        url: '/admin',
        //        templateUrl: 'admin.html'
        //    })
        //
        //// url will be /form/payment
        //.state('form.staff', {
        //    url: '/staff',
        //    templateUrl: 'staff.html'
        //});
        // catch all route
        // send users to the form page
        $urlRouterProvider.otherwise('/dashboard');
    })

    // our controller for the form
    // =============================================================================
    .controller('formController', function($scope,$http) {

        // we will store all of our form data in this object
        $scope.formData = {};

        // function to process the form
        $scope.processForm = function(urlparm) {
                    $http({
                        method : "POST",
                        url : urlparm,
                        data : {"email":$scope.formData.email,"password":$scope.formData.password}
                    }).then(function mySucces(response) {
                        $scope.myWelcome = response.data;
                        window.location='index.html';

                    }, function myError(response) {
                        $scope.myWelcome = response.statusText;
                        alert($scope.myWelcome);
                    });

        };

    });