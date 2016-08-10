// Copyright Study Monitor. 2016. All Rights Reserved.
// Node module: Study Monitor

angular
  .module('app')
  .factory('DeleteFeeType', ['FeeType',function(FeeType) {
    function login(email) {
      return FeeType
        .deleteById({ id :email})
        .$promise
        .then(function(response) {
          console.log(response);
        });
    }
        }]);