angular
  .module('app')
  .controller('ExpenseController',function($scope,$rootScope,$state,$window,$filter,ngDialog,ExpenseType,ExpensePayment,Class,Student,School) {
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        $scope.schoolId = $scope.userData.schoolId;
        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
          $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});



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
         //   SUCCESS CALL
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
         //   ADD EXPENSE PAYMENT TYPE
         //-----------------------------------------------------
         $scope.addExpensePayment = function()
         {
          ExpensePayment.findOne({filter:{where:{
            expenseType:$scope.formData.expenseType,
            date:$scope.formData.date,
            schoolId:$scope.schoolId
          }}},
          function(){
                    $scope.failureCall('Expense Already Exists');

              }, 
              function () {
                    $scope.date = $filter('date')(new Date($scope.formData.date), 'yyyy-MM-dd');
                    ExpensePayment.create(
                      {
                      expenseType:$scope.formData.expenseType,
                      date:$scope.date,
                      amount:$scope.formData.amount,
                      description:$scope.formData.description,
                      schoolId:$scope.schoolId
                    },
                    function()
                    {
                    $scope.successCall('Expense Saved Successfully');
                  });

          });

         }

        // -----------------------------------------------------
        //   DELETE EXPENSE PAYMENT TYPE
        //-----------------------------------------------------
         $scope.deleteExpensePayment = function(x)
         {

          var dialog = ngDialog.open({template: 'deleteExpensePayment'});
          dialog.closePromise.then(function (data) {
            if (data.value && data.value != '$document' && data.value != '$closeButton')

              ExpensePayment.deleteById({id: x.id},function(){
               
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
          $scope.editData.date = $filter('date')(new Date(x.date), 'yyyy-MM-dd');
          var d = new Date($scope.editData.date);
          var date2 = new Date(d);
          $scope.editData.date = new Date(date2.setDate(d.getDate()));
          $scope.editData.date = new Date($scope.editData.date);

            var dialog = ngDialog.open({template: 'editExpensePayment',
          scope : $scope});
                      dialog.closePromise.then(function (data) {
                        editData = data.value;
                        if (data.value && data.value != '$document' && data.value != '$escape' && data.value != '$closeButton')

              ExpensePayment.upsert({
                id :x.id,
                expenseType:editData.expenseType,
                date:editData.date,
                description:editData.description,
                amount:editData.amount},
                function(){
                            $scope.successCall('Expense Payment Saved Successfully');
                  
                });
                          

                        return true;
                      });


         }




        // ----------------------------------------------------
        //   SHOW EXPENSE TYPE
        //-----------------------------------------------------
        $scope.showExpense= function(){
          $scope.ExpensePaymentList = ExpensePayment.find({filter:{
            where:{schoolId:$scope.schoolId}
          }});

        }
        $scope.showExpense();

        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'date';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;

        $scope.numberOfPages=function(){return Math.ceil($scope.ExpensePaymentList.length/$scope.pageSize);}


        //**************************************EXPENSE Payment CORNER************************************
      })
;
