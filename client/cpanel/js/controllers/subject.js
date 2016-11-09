/**
 * Created by Personal on 07/11/2016.
 */

angular
  .module('app')

  .controller('SubjectController', function($scope, $state,Class,School,Staff,Subject) {

    ///----------SHOW SUBJECTS-----
    ///-------------------------
    $scope.showSubject = function() {
      $scope.subjectList = Subject.find({filter: {include: ['school','class','staff']}});
    }
    $scope.showSubject();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


