angular.module('app').
controller('AddFeeController',function($scope,$rootScope,$state,$window,$filter,ngDialog,FeeSetup,Class,Student,FeePayment) 
  {
             
             
            //------------------------------------------------
            //            BASIC USER DATA
            //------------------------------------------------


              $scope.userData   = $window.localStorage.getItem('user');
              $scope.user = JSON.parse($scope.userData);
              $scope.schoolId = $scope.user.schoolId;

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


              //-----------------------------------------------------
              //   CLEAR RESPONSE
              //-----------------------------------------------------

              $scope.clearResponseFeeType  = function() {  
                $scope.responseFee = null;
                $scope.error  =false;
                $scope.success = false;
              }


                //-----------------------------------------------------
                //   CLASS LIST
                //-----------------------------------------------------

                $scope.classList = Class.find({filter:{where:{schoolId:$scope.schoolId}}});


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
                      $state.go('fees');
                    }, 1000 );

                  }
                   // ----------------------------------------------------
                //   FAILURE CALL
                //-----------------------------------------------------
                  $scope.failureCallFeeType = function(){
                      $scope.error  = false;
                      $scope.success = true;
                    setTimeout( function()
                    {

                      $scope.showFee();
                      $scope.clearResponseFeeType();
                      $scope.formData = null;
                      $state.go('fees');
                    }, 1000 );

                  }


                // -----------------------------------------------------
                //   SET STUDENT LIST
                //-----------------------------------------------------
                  $scope.setStudents = function()
                  {
                      $scope.studentsList = Student.find({filter:{where:{ classId :$scope.formData.classId}}});
                  }

                // -----------------------------------------------------
                //   PAY STUDENT FEE
                //-----------------------------------------------------

                  $scope.payFee  = function (x){
                        FeePayment.upsert({
                          id : x.id,
                          paid    : true,
                          amountPaid : x.feeSetup.amount 
                          
                        },function(){
                          $scope.show();
                        });  
                  }
                

                // -----------------------------------------------------
                //   GENERATE STUDENT FEE
                //-----------------------------------------------------
  
                $scope.addInitialPayment = function(){
                  $scope.classFeeSetup = FeeSetup.find({filter:{where:{ classId : $scope.formData.classId }}},
                  function(response){
                      response.forEach(function(feeSetups) 
                        {
                            var p = feeSetups.toJSON();
                            $scope.chkFee=  FeePayment.findOne({filter:{where :{studentId : $scope.formData.studentId,feeSetupId : p.id}} }
                                                 ,function(){},function(){
                                                    
                                                    FeePayment.create({
                                                          schoolId :$scope.formData.schoolId,
                                                          classId : $scope.formData.classId,
                                                          paid    : false,
                                                          feeSetupId : p.id,
                                                          studentId : $scope.formData.studentId,
                                                          amountPaid : 0,
                                                    });
                                                 });


                      });

                      });
               
                }
               

                // -----------------------------------------------------
                //   SHOW STUDENT FEE
                //-----------------------------------------------------
                 $scope.show = function()
                 {
                    $scope.list = FeePayment.find({filter:{
                    where:{ studentId : $scope.formData.studentId },include :[{ relation :'student' },{ relation : 'feeSetup' } ] } });
                 }
                 
                 
                 if($scope.Student)
                 {
                      $scope.tab = 2;
                      $scope.list = FeePayment.find({filter:{where:{ studentId : $scope.user.id },include :[{ relation :'student' },{ relation : 'feeSetup' } ] } });
                 }
   

                // -----------------------------------------------------
                //   ADD FEE TYPE
                //------------------------------------------------------

                $scope.addFeeType = function()
                {
                    FeeSetup.findOne({
                      filter:
                      {
                        where:{
                                occurance : $scope.formData.occurance,
                                feeType  : $scope.formData.feeType,
                                classId  : $scope.formData.classId,
                                schoolId : $scope.schoolId
                            }
                          }
                        },function(){
                                $scope.responseFee = 'Fee Type Already Exists';
                                $scope.failureCallFeeType();

                      }, 
                      function () 
                      {
                              $scope.showMonthsFlag = true;
                              
                    });

                }

                // -----------------------------------------------------
                //   SAVE FEE TYPE
                //------------------------------------------------------

                $scope.saveFee = function(){
                  var keys = Object.keys($scope.month);
                  for (var i=0;i< keys.length;i++){

                    if ($scope.month[keys[i]] = true){
                      console.log(keys[i] + '-'  + $scope.month[keys[i]]);
                      FeeSetup.create({
                        occurance : $scope.formData.occurance,                        
                        feeType   : $scope.formData.feeType,
                        schoolId  : $scope.schoolId,
                        amount    : $scope.formData.amount,
                        classId   : $scope.formData.classId,
                        month     : keys[i]
                      });
                    }
                  }
                  $scope.responseFee = 'Fee Type Added Successfuly';
                  $scope.successCallFeeType();
                  $scope.showMonthsFlag = false;
                  
                  
                }
 

                // -----------------------------------------------------
                //   DELETE FEE TYPE
                //-----------------------------------------------------
                $scope.deleteFee = function(x)
                {
                      var dialog = ngDialog.open({template: 'deleteFee'});
                      dialog.closePromise.then(function (data) {
                        if (data.value && data.value != '$document' && data.value != '$closeButton' && data.value != '$escape')

                         FeeSetup.feePayments.destroyById({ 
                           id : x.id
                         },function(){
                          
                            FeeSetup.deleteById({id: x.id},function(){
                            $scope.responseFee = 'Fee Type Removed Successfully';
                            $scope.successCallFeeType();
                            });

                         })
                        return true;
                      });

                }
              
                // ----------------------------------------------------
                //   SHOW FEE TYPE
                //-----------------------------------------------------
                $scope.showFee= function(){   $scope.feeList = FeeSetup.find({filter:{  where:{schoolId:$scope.schoolId},include:'class'}}); }
                $scope.showFee();

       



      })


;
