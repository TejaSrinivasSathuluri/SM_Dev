/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('StaffController', function($scope,$state,School,Class,Staff) {

    ///----------SHOW STAFF-----
    ///-------------------------
    $scope.showStaff = function() {
      $scope.staffList = Staff.find({filter: {include: ['school']}});
    }
    $scope.showStaff();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


