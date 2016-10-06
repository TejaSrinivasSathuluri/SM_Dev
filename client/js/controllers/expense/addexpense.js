angular
  .module('app')
  .controller('AddExpenseController',function($scope,$rootScope,$state,$window,$filter,ngDialog,ExpensePayment,Class,Student,School) {
    
    
    
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);



        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        
        $scope.school = School.findById({id:$scope.userData.schoolId},function() {$rootScope.image = $scope.school.image;});



        //-----------------------------------
        // TABS CODE
        //------------------------------------

        $scope.tab = 1;
        $scope.setTab = function(newTab){  $scope.tab = newTab; };
        $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };





         // ----------------------------------------------------
         //   SUCCESS CALL
         //-----------------------------------------------------
         $scope.successCall = function(message){
           $scope.response = message;
           $scope.error = false;
           $scope.success = true;
          setTimeout( function()
          {
           $scope.response = null;
           $scope.success = false;
            $scope.formData = {};
             $state.go('expensemanagement');
          }, 1000 );
         

         }


         

         // ----------------------------------------------------
         //   FAILURE CALL
         //-----------------------------------------------------
         $scope.failureCall = function(message){
           $scope.response = message;
           $scope.error = true;
           $scope.success = false;
          setTimeout( function()
          {
           $scope.response = null;
           $scope.error = false;
            $scope.formData = {};
          }, 1000 );

         }




         // -----------------------------------------------------
         //   ADD EXPENSE PAYMENT TYPE
         //-----------------------------------------------------
         $scope.addExpensePayment = function()
         {
          ExpensePayment.findOne({filter:{where:{
            expenseType:$scope.formData.expenseType,
            description:$scope.formData.description,
            schoolId:$scope.userData.schoolId
          }}},
          function(){
                    $scope.failureCall('Expense Already Exists');

              }, 
              function () {
                    ExpensePayment.create(
                      {
                      expenseType:$scope.formData.expenseType,
                      date:$scope.formData.date,
                      amount:$scope.formData.amount,
                      description:$scope.formData.description,
                      schoolId:$scope.userData.schoolId
                    },
                    function()
                    {
                    $scope.successCall('Expense Saved Successfully');
                  });

          });

         }

        //**************************************EXPENSE Payment CORNER************************************
      })
;
