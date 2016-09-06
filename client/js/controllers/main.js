angular
  .module('app')
   
  
  .filter('startFrom', function() 
    { 
       return function(input, start) 
          { 
              if (input == undefined) 
              {
                 console.log('Empty List');
                 input.slice(start) =[];
                 
              } 
              else
              {
                  start = +start; 
                  return input.slice(start); 
                  
              }
           }
    }
    )
// .controller('ChattingController',function($scope,ChatUser,Message){


// })
;
