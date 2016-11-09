/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('StudentController', function($scope, $state,Class,School,Staff,Subject,Student) {

    ///----------SHOW SUBJECTS-----
    ///-------------------------
    $scope.showStudent = function() {
      $scope.studentList = Student.find({filter: {include: ['school','class']}});
    }
    $scope.showStudent();

    $scope.tab = 2;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };
  })


