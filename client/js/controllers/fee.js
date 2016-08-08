angular.module('app').
controller('FeeController',
function($scope,$rootScope,$state,$window,$filter,ngDialog,FeeSetup,Class,Student) 
  {
             
             
            //------------------------------------------------
            //            BASIC USER DATA
            //------------------------------------------------


              $scope.userData   = $window.localStorage.getItem('user');
              $scope.schoolData = $window.localStorage.getItem('school');
              
              $scope.user = JSON.parse($scope.userData);
              $scope.school = JSON.parse($scope.schoolData);
              
              $scope.schoolId = $scope.school.id;

              if ($scope.user.type == 'Admin')   { $scope.Admin = true;  }
              if ($scope.user.type == 'Student') { $scope.Student = true;}
              if ($scope.user.type == 'Parent')  { $scope.Parent = true; }
              if ($scope.user.type == 'Staff')   { $scope.Staff = true;  }


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

              $scope.clearResponseFeeType  = function() {  
                $scope.responseFee = null;
                $scope.error  =false;
                $scope.success = false;
              }


              

                // ----------------------------------------------------
                //   SUCCESS CALL
                //-----------------------------------------------------
                $scope.successCallFeeType = function(){
                    $scope.error  = false;
                    $scope.success = true;
                  setTimeout( function()
                  {

                    $scope.showFee();
                    $scope.clearResponseFeeType();
                    $scope.formData = null;
                  }, 1000 );

                }

            

                // -----------------------------------------------------
                //   ADD FEE TYPE
                //-----------------------------------------------------
                $scope.addFeeType = function()
                {

                  $scope.chkFee = FeeSetup.findOne({
                    filter:
                    {
                      where:{
                              occurance : $scope.formData.occurance,
                              feeType  : $scope.formData.feeType,
                              schoolId : $scope.schoolId
                          }
                        }
                      },function(){
                              $scope.responseFee = 'Fee Type Already Exists';
                              $scope.successCallFeeType();

                    }, 
                    function () 
                    {
                              FeeSetup.create(
                                {
                                 occurance : $scope.formData.occurance,
                                 feeType   : $scope.formData.feeType,
                                 schoolId  : $scope.schoolId
                                },
                                function(){
                                $scope.responseFee = 'Fee Type Added Successfully';
                                $scope.successCallFeeType();
                              },function(response){
                                console.log(response.data.error.message);
                              });

                  });

                }

                // -----------------------------------------------------
                //   DELETE FEE TYPE
                //-----------------------------------------------------
                $scope.deleteFee = function(x)
                {
                  var dialog = ngDialog.open({template: 'deleteFeeType'});
                  dialog.closePromise.then(function (data) {
                    if (data.value && data.value != '$document' && data.value != '$closeButton')

                      FeeSetup.deleteById({id: x.id},function(){
                        $scope.responseFee = 'Fee Type Removed Successfully';
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
        $scope.showFee= function(){
          $scope.feeList = FeeSetup.find({filter:{
            where:{schoolId:$scope.schoolId}
          }});

        }
        $scope.showFee();

        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'category';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;

        $scope.numberOfPages=function(){return Math.ceil($scope.feeList.length/$scope.pageSize);}


        //**************************************FEE TYPE CORNER************************************




       
      })

  .filter('startFrom', function() { return function(input, start) { start = +start; return input.slice(start); }})

;
