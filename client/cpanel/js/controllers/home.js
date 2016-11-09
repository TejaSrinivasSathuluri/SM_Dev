// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')


.controller('AdminController',function($scope,$rootScope,$window,School,Admin) {

  $scope.SchoolList = School.find();

  $scope.addAdmin = function() {

    Admin.create({
      firstName:$scope.admin.firstName,
      email:$scope.admin.email,
      password:$scope.admin.password,
      schoolId:$scope.admin.schoolId

    },function(){


      $scope.successCallAdmin('Admin Added Successfully');
      setTimeout( function()
      {

        $scope.showSchool();


      }, 1000 );

    },function(response){
      console.log(response.data.error.message);
    });

  }


  //-------------------------------------------------
  // clear Response of ng-model
  //-------------------------------------------------
  $scope.clearAdmin = function() {
    $scope.admin = "";

  }

  // ----------------------------------------------------
  //   SUCCESS CALL
  //-----------------------------------------------------
  $scope.successCallAdmin = function(message){
    $scope.responseAddAdmin = message;
    $scope.error = false;
    $scope.success = true;
    $scope.clearAdmin();
    setTimeout( function()
    {

      $scope.responseAddAdmin = null;
      $scope.success = false;
      $scope.showSchool();

    }, 1000 );

  }

  //-----------------------------------------------------------
  //     SHOW SCHOOL
  //-----------------------------------------------------------
  $scope.adminList = Admin.find({filter:{include:['school']}});

  $scope.tab = 0;
  $scope.setTab = function(newTab){  $scope.tab = newTab; };
  $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };




})
  .controller('SchoolController', function($scope,$state,School) {


    $scope.addSchool = function() {

      School.create({
        schoolName:$scope.school.schoolName,
        code:$scope.school.code,
        address:$scope.school.address,
        city:$scope.school.city,
        state:$scope.school.state,
        schoolEmail:$scope.school.schoolEmail,
        schoolPassword:$scope.school.schoolPassword,
        startDate:$scope.school.startDate,
        endDate:$scope.school.endDate,
        attendance:$scope.school.attendance

      },function(){


        $scope.successCallSchool('School Added Successfully');
        setTimeout( function()
        {

          //$scope.showSchool();


        }, 1000 );

      },function(response){
        console.log(response.data.error.message);
      });

    }


    //-------------------------------------------------
    // clear Response of ng-model
    //-------------------------------------------------
    $scope.clearSchool = function() {
      $scope.school = "";

    }

    // ----------------------------------------------------
    //   SUCCESS CALL
    //-----------------------------------------------------
    $scope.successCallSchool = function(message){
      $scope.responseAddSchool = message;
      $scope.error = false;
      $scope.success = true;
      $scope.clearSchool();
      setTimeout( function()
      {

        $scope.responseAddSchool = null;
        $scope.success = false;
        //$scope.showSchool();

      }, 1000 );

    }

    //-----------------------------------------------------------
    //     SHOW SCHOOL
    //-----------------------------------------------------------
    $scope.schoolList = School.find();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };

  })
.controller('WelcomeController', function($scope, $state) {

});

