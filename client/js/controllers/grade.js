angular
  .module('app')
  .controller('GradeController', function ($scope, $state, School, Grade,Class,$rootScope, $window,ngDialog,$filter) {

        //------------------------------------------------
        //            BASIC USER DATA
        //------------------------------------------------

        $scope.userData   = $window.localStorage.getItem('user');
        $scope.user = JSON.parse($scope.userData);
        
        
        $scope.schoolId = $scope.userData.schoolId;

        if ($scope.user.type == 'Admin')   { $scope.Admin   = true; }
        if ($scope.user.type == 'Student') { $scope.Student = true; }
        if ($scope.user.type == 'Parent')  { $scope.Parent  = true; }
        if ($scope.user.type == 'Staff')   { $scope.Staff   = true; }

        //------------------------------------------------
        //            SHOW GRADES LIST
        //------------------------------------------------
        $scope.gradesList = [];
        $scope.showGrades = function() {$scope.gradesList = Grade.find({filter:{where:{schoolId : $scope.schoolId}}});}
        $scope.showGrades();

        //------------------------------------------------
        //              FAILURE CALL
        //------------------------------------------------
        failureCall = function(message)
        {
                $scope.responseGrade = message;
                $scope.error = true;
                $scope.success=false;
                setTimeout( function()
                            {         
                              $scope.error=false;
                              $scope.responseGrade = null;
                              $scope.formData = null;
                              $scope.showGrades();
                            }, 1000 );
                          
        }


        //------------------------------------------------
        //              SUCCESS  CALL
        //------------------------------------------------
        successCall = function(message)
        {
                $scope.responseGrade = message;
                $scope.error = false;
                $scope.success=true;
                setTimeout( function()
                            {         
                              $scope.success=false;
                              $scope.responseGrade = null;
                              $scope.formData = null;
                              $scope.showGrades();
                            }, 1000 );
                          
        }





        //------------------------------------------------
        //              ADD GRADE
        //------------------------------------------------

          $scope.addGrade = function(){
                        // *********GRADE NAME VALIDATION************

              Grade.findOne({ filter:{ where:{ schoolId:$scope.schoolId,gradeName:$scope.formData.gradeName }}},function(){ failureCall('Grade Name Already Exists'); }
              ,function(){
                        // *********GRADE POINT VALIDATION************
                          Grade.findOne({ filter:{ where:{ schoolId:$scope.schoolId,gradePoint:$scope.formData.gradePoint }}},function(){ failureCall('Grade Point Already Exists');}
                          ,function(){
                                    
                                      // *********GRADE PERCENTAGE VALIDATION************
                                      Grade.findOne({ filter:{ where:{ schoolId:$scope.schoolId,percentageRangeFrom:$scope.formData.percentageRangeFrom }}},function(){ failureCall('Grade Percentage Start Limit Already Exists');}
                                      ,function(){
                                                
                                                  // *********GRADE PERCENTAGE VALIDATION************
                                                    Grade.findOne({ filter:{ where:{ schoolId:$scope.schoolId,percentageRangeTo:$scope.formData.percentageRangeTo }}},function(){failureCall('Grade Percentage End Limit Already Exists');}
                                                    ,function(){
                                                              
                                                                Grade.create({
                                                                          schoolId:$scope.schoolId,
                                                                          gradeName:$scope.formData.gradeName,
                                                                          gradePoint: $scope.formData.gradePoint,
                                                                          percentageRangeFrom:$scope.formData.percentageRangeFrom,
                                                                          percentageRangeTo :$scope.formData.percentageRangeTo
                                                                        },function()
                                                                        {
                                                                          successCall('Grade Added Successfully');
                                                                        }
                                                                        );
                                                                                                              
                                                      });      
                                    
                                        });      
                            });

              });

            
          }
       
       $scope.deleteGrade = function(x){
           var dialog = ngDialog.open({template: 'deleteGrade'});
         dialog.closePromise.then(function (data) {
           if (data.value && data.value != '$document' && data.value != '$closeButton' && data.value != '$escape')
           {
                        Grade.deleteById({id:x.id},function()  { failureCall('Grade Deleted Successfully');});        
             return true;
           }
         });
       }
        // ----------------------------------------------------
      //                         EDIT GRADE
      //-----------------------------------------------------
      $scope.editGrade = function (x) {
		    //$scope.examName = x.examName;
		   $scope.editData=x;
		    
		   ngDialog.openConfirm({template: 'editGrade',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(editData) {
            Grade.upsert({id         : x.id,
                       gradeName      :editData.gradeName,
                       gradePoint    :editData.gradePoint,
                       percentageRangeFrom:editData.percentageRangeFrom,
                      percentageRangeTo:editData.percentageRangeTo},
            function () {
              successCall(' Grade Updated Successfully');
                // $scope.responseExam = "Exam Record Updated Successfully";
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
              });
          },
          function(value) {
            failureCall(' grade Not Edited');
            // $scope.responseExam = "Exam Record Was Not Edited.Please Fill All Required Fields";
            setTimeout( function()
            {
              $state.go($state.current, {}, {reload: true});
              $scope.$apply();
            }, 1000 );

          }
          );
      } 

      
       
    


        //----------------------------------------------
        //               SORT TABLE TECHNIQUE
        //----------------------------------------------

        $scope.sortType     = 'title';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage  = 0;
        $scope.pageSize     = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.gradesList.length/$scope.pageSize);}
 
  })


;
