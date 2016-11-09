/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('LibraryController', function($scope,School,Library) {

    ///----------SHOW EXAMS-----
    ///-------------------------
    $scope.showBooks = function() {
      $scope.bookList = Library.find({filter: {include: ['school']}});
    }
    $scope.showBooks();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


