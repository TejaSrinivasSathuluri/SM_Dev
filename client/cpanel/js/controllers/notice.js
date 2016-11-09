/**
 * Created by Personal on 07/11/2016.
 */
/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('NoticeController', function($scope, $state,Class,School,Parent,Noticeboard) {

    ///----------SHOW PARENT-----
    ///-------------------------
    $scope.showNotice = function() {
      $scope.noticeList = Noticeboard.find({filter: {include: ['school']}});
    }
    $scope.showNotice();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


