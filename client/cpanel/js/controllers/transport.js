/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('BusServiceController', function($scope,BusService,School) {

    ///----------SHOW BUS SERVICES-----
    ///-------------------------
    $scope.showBusService = function() {
      $scope.serviceList = BusService.find({filter: {include: ['school']}});
    }
    $scope.showBusService();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


