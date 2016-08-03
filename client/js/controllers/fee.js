angular.module('app').controller('FeeController',function($scope,$rootScope,$state,$window,$filter,ngDialog,ExpenseType,ExpensePayment,FeeType,FeeSetup,Class,Student,School) {
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



             //**************************************FEE TYPE STARTS************************************

             //-----------------------------------------------------
             //   CLEAR RESPONSE
             //-----------------------------------------------------

             $scope.clearResponseFeeType  = function() {  $scope.responseFee = null;}


            

              // ----------------------------------------------------
              //   SUCCESS CALL
              //-----------------------------------------------------
              $scope.successCallFeeType = function(){
                setTimeout( function()
                {
                  $scope.showFeeType();
                  $scope.clearResponseFeeType();
                  $scope.formData = {};
                }, 1000 );

              }

            

            // -----------------------------------------------------
            //   ADD FEE TYPE
            //-----------------------------------------------------
            // $scope.addFeeType = function()
            // {

            //   $scope.chkFee = FeeType.findOne({filter:{where:{category:$scope.formData.category,fee:$scope.formData.fee,schoolId:$scope.schoolId}}},function(){
            //     $scope.responseAddFeeType = 'Fee Type Already Exists';
            //     $scope.successCallFeeType();

            //   }, function () {
            //     FeeType.create({category:$scope.formData.category,fee:$scope.formData.fee,schoolId:$scope.schoolId},function(){
            //       $scope.responseAddFeeType = 'Fee Type  Successfully';
            //       $scope.successCallFeeType();
            //     },function(response){
            //       console.log(response.data.error.message);
            //     });

            //   });

            // }

        // -----------------------------------------------------
        //   DELETE FEE TYPE
        //-----------------------------------------------------
        $scope.deleteFeeType = function(x)
        {

          var dialog = ngDialog.open({template: 'deleteFeeType'});
          dialog.closePromise.then(function (data) {
            if (data.value && data.value != '$document' && data.value != '$closeButton')

              FeeType.deleteById({id: x.id},function(){
                $scope.responseAddFeeType = 'Fee Type Removed Successfully';
                $scope.successCallFeeType();

              });

            return true;
          });

        }
        // ----------------------------------------------------
        //                         EDIT FEE TYPE
        //-----------------------------------------------------
        $scope.editFeeType = function(x)
        {
          $scope.editData = x;
          ngDialog.openConfirm({template: 'editFeeType',
            scope: $scope
          }).then(
            function(editData) {

              FeeType.upsert({id: x.id,category:editData.category,fee:editData.fee},
                function(){
                  $scope.responseAddFeeType = 'Fee Type Updated Successfully';
                  $scope.successCallFeeType();
                });
            },
            function() {
              $scope.responseAddFeeType = "Fee Type Details Were Not Edited.Please Check Required Fields";
              $scope.successCallFeeType();
            }
          );

        }



        

        // ----------------------------------------------------
        //   SHOW FEE TYPE
        //-----------------------------------------------------
        $scope.showFeeType= function(){
          $scope.FeeTypeList = FeeType.find({filter:{
            where:{schoolId:$scope.schoolId}
          }});

        }
        $scope.showFeeType();

        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'category';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;

        $scope.numberOfPages=function(){return Math.ceil($scope.FeeTypeList.length/$scope.pageSize);}


        //**************************************FEE TYPE CORNER************************************



        //**************************************FEE SETUP CORNER************************************
        //-----------------------------------------------------
        //   CLEAR RESPONSE
        //-----------------------------------------------------




        $scope.clearResponseFeeSetup  = function() {
          $scope.responseAddFeeSetup = null;
        }

        $scope.setFee = function (){

          $scope.FeeTypeListFiltered = FeeType.find({filter:{
            where:{schoolId:$scope.schoolId,category:$scope.formData.category}
          }});
          //Get Class List
          $scope.classList = Class.find({filter:{where:{schoolId:$scope.schoolId}}});


        }

        $scope.setFeeedit = function (){

          $scope.FeeTypeListFilteredEdit = FeeType.find({filter:{
            where:{schoolId:$scope.schoolId,category:$scope.editData.category}
          }});
          //Get Class List
          $scope.classList = Class.find({filter:{where:{schoolId:$scope.schoolId}}});


        }



        // -----------------------------------------------------
        //   ADD FEE SETUP
        //-----------------------------------------------------

        $scope.addFeeSetup = function()
        {
          FeeType.findOne({filter:{where:{category:$scope.formData.category,fee:$scope.feeSelected}}}, function (response)
          {

            $scope.chkFeeSetup = FeeSetup.findOne({filter:{where:{feeTypeId:response.id,amount:$scope.formData.amount,classId:$scope.formData.classId,schoolId:$scope.schoolId}}},
              function()
              {
                $scope.responseAddFeeSetup = 'Fee Setup Already Exists';
                $scope.successCallFeeSetup();
              },
              function ()
              {
                FeeType.findOne({filter:{where:{category:$scope.formData.category,fee:$scope.feeSelected}}}, function (response)
                {

                  FeeSetup.create({feeTypeId: response.id,amount: $scope.formData.amount,classId: $scope.formData.classSelected,
                    schoolId: $scope.schoolId
                  }, function () {
                    $scope.responseAddFeeSetup = 'Fee SetUp Created  Successfully';
                    $scope.successCallFeeSetup();
                  });

                });

              });
          });


        }

        // -----------------------------------------------------
        //   DELETE FEE SETUP
        //-----------------------------------------------------

        $scope.deleteFeeSetup = function(x)
        {
          var dialog = ngDialog.open({template: 'deleteFeeSetup'});
          dialog.closePromise.then(function (data) {
            if (data.value && data.value != '$document' && data.value != '$closeButton')

              FeeSetup.deleteById({id: x.id},function(){
                $scope.responseAddFeeSetup = 'Fee Setup Removed Successfully';
                $scope.successCallFeeSetup();

              });

            return true;
          });

        }
        //// ----------------------------------------------------
        ////                         EDIT FEE Setup
        ////-----------------------------------------------------
        $scope.editFeeSetup = function(x)
        {

          FeeType.findOne({filter:{where:{id: x.feeTypeId}}},function(response){
            $scope.editData =x;
            $scope.editData.category = response.category;
            $scope.editData.fee = response.fee;
            ngDialog.openConfirm({template: 'editFeeSetup',
              scope: $scope
            }).then(
              function(editData) {

                FeeSetup.upsert({id: x.id,amount:editData.amount},
                  function(){
                    $scope.responseAddFeeSetup = 'Fee Setup Updated Successfully';
                    $scope.successCallFeeSetup();
                  });
              },
              function() {
                $scope.responseAddFeeSetup = "Fee Setup Details Were Not Edited.Please Check Required Fields";
                $scope.successCallFeeSetup();
              }
            );
          },function(){
            $scope.responseAddFeeSetup = 'Fee Type Not Exists';
          });


        }



        // ----------------------------------------------------
        //   SUCCESS CALL
        //-----------------------------------------------------
        $scope.successCallFeeSetup = function(){
          setTimeout( function()
          {
            $scope.showFeeSetup();
            $scope.clearResponseFeeSetup();
            $scope.formData = {};
          }, 1000 );

        }

        // ----------------------------------------------------
        //   SHOW FEE SETUP
        //-----------------------------------------------------
        $scope.showFeeSetup= function(){
          $scope.FeeSetupList = FeeSetup.find({filter:{
            where:{schoolId:$scope.schoolId},include:['feeType','class']
          }});

        }
        $scope.showFeeSetup();

        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'category';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;

        $scope.numberOfPages=function(){return Math.ceil($scope.FeeSetupList.length/$scope.pageSize);}


        //**************************************FEE SETUP CORNER************************************


        ////**************************************STUDENT DISCOUNT CORNER************************************
        //-----------------------------------------------------
        //   CLEAR RESPONSE
        //-----------------------------------------------------
        $scope.clearResponseStudentDiscount = function() {
          $scope.responseAddStudentDiscount = null;
        }

        //Get Class List
        $scope.classList = Class.find({filter:{where:{schoolId:$scope.schoolId}}});
        $scope.FeeListFiltered =[];

        $scope.showFeeList = function (){
          $scope.FeeListFiltered =[];

          $scope.FeeListFiltered = FeeSetup.find({filter:{
            where:{schoolId:$scope.schoolId,classId:$scope.formData.classId},include:['feeType','class']
          }});
          console.log($scope.FeeListFiltered);

        }


        $scope.setStudent = function (){
          $scope.studentListFiltered = Student.find({filter:{
            where:{schoolId:$scope.schoolId,classId:$scope.formData.classSelected}
          }});
        }

        $scope.setAmount = function (){
          FeeType.findOne({filter:{where:{category:$scope.formData.category,fee:$scope.feeSelected}}}, function (response){

            FeeSetup.findOne({filter:{where:{feeTypeId:response.id}}}, function (response) {
              $scope.formData.amount = response.amount;
            });



          });


        }
        $scope.setTotal = function (){$scope.formData.total = $scope.formData.amount-$scope.formData.discount;}









        // ----------------------------------------------------
        //   SUCCESS CALL
        //-----------------------------------------------------
        $scope.successCallStudentDiscount = function(){
          setTimeout( function()
          {
            $scope.showStudentDiscount();
            $scope.clearResponseStudentDiscount();
            $scope.formData = {};
          }, 1000 );

        }


        //////**************************************STUDENT FEE CORNER************************************



      })




  .filter('startFrom', function() { return function(input, start) { start = +start; return input.slice(start); }})

;
