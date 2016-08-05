angular
  .module('app')
  
  

  .controller('ExpenseController',function($scope,$rootScope,$state,$window,$filter,ngDialog,ExpenseType,ExpensePayment,FeeType,FeeSetup,Class,Student,School) {
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

        $scope.tab = 0;
        $scope.setTab = function(newTab){  $scope.tab = newTab; };
        $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };



         //**************************************EXPENSETYPE CORNER************************************
         //-----------------------------------------------------
        //   CLEAR RESPONSE
        //-----------------------------------------------------
        $scope.clearResponseExpenseType  = function() {
          $scope.responseAddExpenseType = null;
        }

         // -----------------------------------------------------
         //   ADD EXPENSE TYPE
         //-----------------------------------------------------
         $scope.addExpenseType = function()
         {
          $scope.chkExpense = ExpenseType.findOne({filter:{where:{name:$scope.formData.name,schoolId:$scope.schoolId}}},function(){
            $scope.responseAddExpenseType = 'Expense Type Already Exists';
            $scope.successCallExpenseType();
          }, function () {
            ExpenseType.create({name:$scope.formData.name,description:$scope.formData.description,schoolId:$scope.schoolId},function(){
              $scope.responseAddExpenseType = 'Expense Type Added Successfully';
              $scope.successCallExpenseType();
            });

          });

         }

         // -----------------------------------------------------
         //   DELETE EXPENSE TYPE
         //-----------------------------------------------------
         $scope.deleteExpenseType = function(x)
         {

          var dialog = ngDialog.open({template: 'deleteExpenseType'});
          dialog.closePromise.then(function (data) {
            if (data.value && data.value != '$document' && data.value != '$closeButton')

              ExpenseType.deleteById({id: x.id},function(){
                $scope.responseAddExpenseType = 'Expense Type Removed Successfully';
                $scope.successCallExpenseType();

              });

            return true;
          });

         }
         // ----------------------------------------------------
         //                         EDIT EXPENSE TYPE
         //-----------------------------------------------------
         $scope.editExpenseType = function(x)
         {
          $scope.editData = x;
          ngDialog.openConfirm({template: 'editExpenseType',
            scope: $scope
          }).then(
            function(editData) {

              ExpenseType.upsert({id: x.id,name:editData.name},
                function(){
                  $scope.responseAddExpenseType = 'ExpenseType Updated Successfully';
                  $scope.successCallExpenseType();
                });
            },
            function() {
              $scope.responseAddExpenseType = "Expense Details Were Not Edited.Please Check Required Fields";
              $scope.successCallExpenseType();
            }
          );

         }


         // ----------------------------------------------------
         //   SUCCESS CALL
         //-----------------------------------------------------
         $scope.successCallExpenseType = function(){
          setTimeout( function()
          {
            $scope.showExpense();
            $scope.clearResponseExpenseType();
            $scope.formData = {};
          }, 1000 );

         }

         // ----------------------------------------------------
         //   SHOW Expense TYPE
         //-----------------------------------------------------
         $scope.showExpense= function(){
          $scope.ExpenseTypeList = ExpenseType.find({filter:{where:{schoolId:$scope.schoolId}}});
         }
         $scope.showExpense();

         // --------------------------------------------------------
         //                 SORT TABLE TECHNIQUE
         //--------------------------------------------------------

         $scope.sortType     = 'name';
         $scope.sortReverse  = false;
         $scope.searchFish   = '';
         $scope.currentPage = 0;
         $scope.pageSize = 10;

         $scope.numberOfPages=function(){return Math.ceil($scope.ExpenseTypeList.length/$scope.pageSize);}


         //**************************************EXPENSETYPE CORNER************************************



         //**************************************EXPENSE PAYMENT CORNER************************************
         //-----------------------------------------------------
         //   CLEAR RESPONSE
         //-----------------------------------------------------


         $scope.clearResponseExpensePayment  = function() {
          $scope.responseAddExpensePayment = null;


         }

         // -----------------------------------------------------
         //   ADD EXPENSE PAYMENT TYPE
         //-----------------------------------------------------
         $scope.addExpensePayment = function()
         {
          $scope.chkExpense = ExpensePayment.findOne({filter:{where:{expenseTypeId:$scope.formData.expenseTypeId,date:$scope.formData.date,amount:$scope.formData.amount,schoolId:$scope.schoolId}}},function(){
            $scope.responseAddExpensePayment = 'Expense Payment Already Exists';
            $scope.successCallExpensePayment();

          }, function () {
            $scope.formData.date = $filter('date')(new Date($scope.formData.date), 'yyyy-MM-dd');
            ExpensePayment.create({expenseTypeId:$scope.formData.expenseSelected,date:$scope.formData.date,amount:$scope.formData.amount,description:$scope.formData.description,schoolId:$scope.schoolId},function(){
              $scope.responseAddExpensePayment = 'Expense Payment  Successfully';
              $scope.successCallExpensePayment();

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
                $scope.responseAddExpensePayment = 'Expense Payment Removed Successfully';
                $scope.successCallExpensePayment();

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


          ngDialog.openConfirm({template: 'editExpensePayment',
            scope: $scope
          }).then(
            function(editData) {

              ExpensePayment.upsert({id: x.id,expenseTypeId:editData.expenseTypeId,date:editData.date,amount:editData.amount},
                function(){
                  $scope.responseAddExpensePayment = 'ExpensePayment Updated Successfully';
                  $scope.successCallExpensePayment();
                });
            },
            function() {
              $scope.responseAddExpensePayment = "Expense Payment Details Were Not Edited.Please Check Required Fields";
              $scope.successCallExpensePayment();
            }
          );

         }



         // ----------------------------------------------------
         //   SUCCESS CALL
         //-----------------------------------------------------
         $scope.successCallExpensePayment = function(){
          setTimeout( function()
          {
            $scope.showExpensePayment();
            $scope.clearResponseExpensePayment();
            $scope.formData = {};
          }, 1000 );

         }

        // ----------------------------------------------------
        //   SHOW Expense PAYMENT TYPE
        //-----------------------------------------------------
        $scope.showExpensePayment= function(){
          $scope.ExpensePaymentList = ExpensePayment.find({filter:{
            where:{expenseTypeId:$scope.expenseSelected,schoolId:$scope.schoolId},include:'expenseType'
          }});

        }
        $scope.showExpensePayment();

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
