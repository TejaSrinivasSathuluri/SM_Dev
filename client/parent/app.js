// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================

angular.module('formApp', ['ngAnimate','ui.router','lbServices','ngResource'])

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
    .controller('formController', function($scope,Parent) {

        // we will store all of our form data in this object
        $scope.formData = {};

        // function to process the form

        $scope.parent= Parent.getCurrent(
            function (response) {

                //alert($scope.parent.parentName);

            }, function (response) {
                console.log($scope.response);
            });


    });