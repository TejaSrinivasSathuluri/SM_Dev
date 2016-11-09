/**
 * Created by Personal on 07/11/2016.
 */

angular
  .module('app')

  .controller('GradeController', function($scope, $state,Class,School,Grade) {

    ///----------SHOW PARENT-----
    ///-------------------------
    $scope.showGrade = function() {
      $scope.gradeList = Grade.find({filter: {include: ['school']}});
    }
    $scope.showGrade();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


