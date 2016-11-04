angular
  .module('app')
  .controller('ExpenseController',function($scope,$rootScope,$state,$window,$filter,ngDialog,ExpensePayment,Class,Student,School) {
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
            $scope.showExpense();
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
            $scope.showExpense();
          }, 1000 );

         }


        // -----------------------------------------------------
        //   DELETE EXPENSE PAYMENT TYPE
        //-----------------------------------------------------
         $scope.deleteExpensePayment = function(x)
         {
          var dialog = ngDialog.open({template: 'deleteExpensePayment'});
          dialog.closePromise.then(function (data) 
          {
            if (data.value && data.value != '$document' && data.value != '$closeButton' && data.value != '$escape')
                ExpensePayment.deleteById({id: x.id},function()
                {
                    $scope.successCall('Expense Payment Removed Successfully');
                });

            return true;
          });

         }



         // ----------------------------------------------------
         //                         EDIT EXPENSE PAYMENT
         //-----------------------------------------------------
         $scope.editExpensePayment = function(x)
         {
          $scope.editData = x;
           

            var dialog = ngDialog.open({template: 'views/expense/editExpense.html',scope : $scope,
                                          controller: ['$scope', 'otherService', function($scope, otherService) 
                                          {
        



        
                                          }]
                                        });
            dialog.closePromise.then(function (data) 
            {
                        editData = data.value;
                        if (data.value && data.value != '$document' && data.value != '$escape' && data.value != '$closeButton')
                        {
                                              

                        }
                            
                        
                        else 
                        {       
                                $scope.successCall('Expense Payment Not Edited');
                        }      

              return true;
            });
         }


         $scope.back = function()
        {
          $state.go($state.current);
        }



        // ----------------------------------------------------
        //   SHOW EXPENSE TYPE
        //-----------------------------------------------------
            $scope.expensePaymentList=[];
        
        $scope.showExpense= function()
        {
            School.findOne( {filter :{ where :{ id : $scope.userData.schoolId },include:'expensePayments'}},
            function(response)
            {
              $scope.expensePaymentList = response.expensePayments;
            });

        }
        $scope.showExpense();

        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'date';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 8;

        $scope.numberOfPages=function(){return Math.ceil($scope.expensePaymentList.length/$scope.pageSize);}


        //**************************************EXPENSE Payment CORNER************************************
      })


.controller('EditExpenseController',function($scope,$rootScope,$state,$window,$filter,ExpensePayment) {
     
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        

         // ----------------------------------------------------
         //                         EDIT EXPENSE PAYMENT
         //-----------------------------------------------------
         $scope.saveExpensePayment = function()
         {
           
            ExpensePayment.replaceById(
            {
              id :$scope.editData.id
            },
            {
              schoolId : $scope.userData.schoolId,
              expenseType:$scope.editData.expenseType,
              date:$scope.editData.date,
              description:$scope.editData.description,
              amount:$scope.editData.amount
            },
              function()
              {
                $scope.successCall('Expense Payment Saved Successfully');
              });
            
        }
        $scope.back = function()
        {
          $state.go($state.current);
        }
                           
      });

