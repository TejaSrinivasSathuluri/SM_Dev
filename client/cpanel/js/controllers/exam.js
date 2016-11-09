/**
 * Created by Personal on 07/11/2016.
 */
angular
  .module('app')

  .controller('ExamController', function($scope,School,Exam) {

    ///----------SHOW EXAMS-----
    ///-------------------------
    $scope.showExam = function() {
      $scope.examList = Exam.find({filter: {include: ['school']}});
    }
    $scope.showExam();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


  })


