/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('AssignmentController', function($scope,School,Assignment) {

    ///----------SHOW ASSIGNMENTS-----
    ///-------------------------
    $scope.showAssignment = function() {
      $scope.assignmentsList = Assignment.find({filter: {include: ['school']}});
    }
    $scope.showAssignment();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


