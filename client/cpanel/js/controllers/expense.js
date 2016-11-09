/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('ExpenseController', function($scope,School,ExpensePayment) {

    ///----------SHOW EXAMS-----
    ///-------------------------
    $scope.showExpensePayment = function() {
      $scope.expenseList = ExpensePayment.find({filter: {include: ['school']}});
    }
    $scope.showExpensePayment();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


