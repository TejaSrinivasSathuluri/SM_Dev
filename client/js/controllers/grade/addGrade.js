angular
  .module('app')
  .controller('AddGradeController', function ($scope, $state, School, Grade,Class,$rootScope, $window,ngDialog,$filter) {

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
            $state.go('grades');
          }, 1000 );

         }

         // ----------------------------------------------------
         //   FAILURE CALL
         //-----------------------------------------------------
         $scope.failureCall = function(message){
           $scope.response = message;
           $scope.error = true;
           $scope.success = false;
         }






        //------------------------------------------------
        //              ADD GRADE
        //------------------------------------------------

          $scope.addGrade = function(){
                        // *********GRADE NAME VALIDATION************

              Grade.findOne({ filter:{ where:{ schoolId: $scope.userData.schoolId,gradeName:$scope.formData.gradeName }}},function(){ $scope.failureCall('Grade Name Already Exists'); }
              ,function(){
                        // *********GRADE POINT VALIDATION************
                          Grade.findOne({ filter:{ where:{ schoolId: $scope.userData.schoolId,gradePoint:$scope.formData.gradePoint }}},function(){  $scope.failureCall('Grade Point Already Exists');}
                          ,function(){
                                    
                                      // *********GRADE PERCENTAGE VALIDATION************
                                      Grade.findOne({ filter:{ where:{ schoolId: $scope.userData.schoolId,percentageRangeFrom:$scope.formData.percentageRangeFrom }}},function(){  $scope.failureCall('Grade Percentage Start Limit Already Exists');}
                                      ,function(){
                                                
                                                  // *********GRADE PERCENTAGE VALIDATION************
                                                    Grade.findOne({ filter:{ where:{ schoolId: $scope.userData.schoolId,percentageRangeTo:$scope.formData.percentageRangeTo }}},function(){ $scope.failureCall('Grade Percentage End Limit Already Exists');}
                                                    ,function(){
                                                              
                                                                Grade.create({
                                                                          schoolId: $scope.userData.schoolId,
                                                                          gradeName:$scope.formData.gradeName,
                                                                          gradePoint: $scope.formData.gradePoint,
                                                                          percentageRangeFrom:$scope.formData.percentageRangeFrom,
                                                                          percentageRangeTo :$scope.formData.percentageRangeTo
                                                                        },function()
                                                                        {
                                                                           $scope.successCall('Grade Added Successfully');
                                                                        }
                                                                        );
                                                                                                              
                                                      });      
                                    
                                        });      
                            });

              });

            
          }
});
