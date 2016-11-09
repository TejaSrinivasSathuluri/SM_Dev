/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('BusController', function($scope,School,Bus) {

    ///----------SHOW BUSSES-----
    ///-------------------------
    $scope.showBus = function() {
      $scope.busList = Bus.find({filter: {include: ['school']}});
    }
    $scope.showBus();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


