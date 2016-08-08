angular.module('app').
controller('FeeController',
<<<<<<< HEAD
function($scope,$rootScope,$state,$window,$filter,ngDialog,FeeSetup,Class,Student) 
=======
function($scope,$rootScope,$state,$window,$filter,ngDialog,FeeSetup,Class,Student,FeePayment) 
>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea
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



<<<<<<< HEAD
              //**************************************FEE TYPE STARTS************************************
=======
              //**************************************FEE  STARTS************************************
>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea

              //-----------------------------------------------------
              //   CLEAR RESPONSE
              //-----------------------------------------------------

              $scope.clearResponseFeeType  = function() {  
                $scope.responseFee = null;
                $scope.error  =false;
                $scope.success = false;
              }


<<<<<<< HEAD
=======
              //-----------------------------------------------------
              //   CLASS LIST
              //-----------------------------------------------------

               $scope.classList = Class.find({filter:{where:{schoolId:$scope.schoolId}}});



>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea
              

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

<<<<<<< HEAD
            

                // -----------------------------------------------------
                //   ADD FEE TYPE
                //-----------------------------------------------------
                $scope.addFeeType = function()
                {

                  $scope.chkFee = FeeSetup.findOne({
=======

                // -----------------------------------------------------
                //   SET STUDENT LIST
                //-----------------------------------------------------
              $scope.setStudents = function(){
                
                  $scope.studentsList = Student.find({filter:{where:{ classId :$scope.formData.classId}}});
              }

              $scope.payFee  = function (x){
                     FeePayment.upsert({
                       id : x.id,
                       paid    : true,
                       amountPaid : x.feeSetup.amount 
                       
                     },function(){
                       $scope.show();
                     });  
              }
                


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

               
              $scope.show = function(){
               
                $scope.list = FeePayment.find({filter:{
                  where:{
                  studentId : $scope.formData.studentId
                    
                  },include :[
                    {
                      relation :'student'
                    },
                    {
                      relation : 'feeSetup'
                    }
                  ]
                }
                });
            
     }
   

              


                // -----------------------------------------------------
                //   ADD FEE TYPE
                //------------------------------------------------------

                $scope.addFeeType = function()
                {

                   


                   FeeSetup.findOne({
>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea
                    filter:
                    {
                      where:{
                              occurance : $scope.formData.occurance,
                              feeType  : $scope.formData.feeType,
<<<<<<< HEAD
=======
                              classId  : $scope.formData.classId,
>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea
                              schoolId : $scope.schoolId
                          }
                        }
                      },function(){
                              $scope.responseFee = 'Fee Type Already Exists';
                              $scope.successCallFeeType();

                    }, 
                    function () 
                    {
<<<<<<< HEAD
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

=======
                             $scope.showMonthsFlag = true;
>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea
                  });

                }

<<<<<<< HEAD
=======
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
                  $scope.showMonthsFlag = false;
                  
                }

                

>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea
                // -----------------------------------------------------
                //   DELETE FEE TYPE
                //-----------------------------------------------------
                $scope.deleteFee = function(x)
                {
<<<<<<< HEAD
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

=======
                      var dialog = ngDialog.open({template: 'deleteFee'});
                      dialog.closePromise.then(function (data) {
                        if (data.value && data.value != '$document' && data.value != '$closeButton' && data.value != '$escape')

                          FeeSetup.deleteById({id: x.id},function(){
                            $scope.responseFee = 'Fee Type Removed Successfully';
                            $scope.successCallFeeType();

                          });

                        return true;
                      });

                }
              
>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea


        

<<<<<<< HEAD
        // ----------------------------------------------------
        //   SHOW FEE TYPE
        //-----------------------------------------------------
        $scope.showFee= function(){
          $scope.feeList = FeeSetup.find({filter:{
            where:{schoolId:$scope.schoolId}
          }});

        }
        $scope.showFee();
=======
                // ----------------------------------------------------
                //   SHOW FEE TYPE
                //-----------------------------------------------------
                $scope.showFee= function(){
                  $scope.feeList = FeeSetup.find({filter:{
                    where:{schoolId:$scope.schoolId},include:'class'
                  }});

                }
                $scope.showFee();


>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea

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

<<<<<<< HEAD
  .filter('startFrom', function() { return function(input, start) { start = +start; return input.slice(start); }})
=======
>>>>>>> 944ccfdc9907b6ff0208a85b6a61268a00f548ea

;
