angular
  .module('app')
 .controller('MediaUploadController', function ($scope,School,$window,$rootScope,$filter,$state) {
      
      
    //   //--------------------------------------------------------
    //   //                  BASIC USER DATA
    //   // --------------------------------------------------------

       $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});


          //------------------------------------------------
          //              SUCCESS CALL
          //------------------------------------------------
          successCall = function(message)
          {
                $scope.responsemediaUpload = message;
                $scope.error = false;
                $scope.success=true;
                setTimeout( function()
                            {         
                              $scope.success=false;
                              $scope.responsemediaUpload= null;
                              // $window.location.reload();
                                                $state.go($state.current, {}, {reload: true});

                              
                            }, 1000 );
                          
          }

          //------------------------------------------------
          //              FAILURE CALL
          //------------------------------------------------
          failureCall = function(message)
          {
                $scope.responsemediaUpload = message;
                $scope.error = true;
                $scope.success=false;
                setTimeout( function()
                            {         
                              $scope.error=false;
                              $scope.responsemediaUpload = null;
                              $window.reload();
                            }, 1000 );
                          
          }
        //-----------------------------------
        // TABS CODE
        //------------------------------------

        $scope.tab = 1;
        $scope.setTab = function(newTab){  $scope.tab = newTab; };
        $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


      //----------------------------------------------------------------
      //                       Image Upload
      //-----------------------------------------------------------------
        $scope.imageUpload = function()
        {
            School.upsert({
              id : $scope.schoolId,
              images :$scope.image},
                function () {
                  successCall("Image Uploaded Successfully");
            });
        }


      //------------------------------------------------------------------
      //                      Video Upload
      //-------------------------------------------------------------------
       $scope.videoUpload = function()
        {
           School.upsert({
              id : $scope.schoolId,
              video :$scope.video},
                function () {
                  successCall("Video Uploaded Successfully");
            });
        }


        

        
}) ;