angular
  .module('app')
   
  
  .filter('startFrom', function() { return function(input, start) { start = +start; return input.slice(start); }})
.controller('ChattingController',function($scope,ChatUser,Message){

$scope.addMessage = function(){
  console.log($scope.message);
}




})
;
