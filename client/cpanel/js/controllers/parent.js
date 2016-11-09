/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('ParentController', function($scope, $state,Class,School,Parent) {

    ///----------SHOW PARENT-----
    ///-------------------------
    $scope.showParent = function() {
      $scope.parentList = Parent.find({filter: {include: ['school']}});
    }
    $scope.showParent();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


