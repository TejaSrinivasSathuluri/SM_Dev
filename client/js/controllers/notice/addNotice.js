angular
  .module('app')

  .controller('AddNoticeboardController',
    ['$scope', '$state', 'School', 'Noticeboard', '$rootScope', '$window','ngDialog','$filter',
    function ($scope, $state, School, Noticeboard, $rootScope, $window,ngDialog,$filter) {

      //------------------------------------------------
      //            BASIC USER DATA
      //------------------------------------------------

      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

        //var baseApi = $location.$$protocol + "://"+ $location.$$host + ":" +$location.$$port + "/api/Containers/noticeboard/download/";
    
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
            $state.go('noticeboard');
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
      //            ADD NOTICE
      //------------------------------------------------

       $scope.addNotice = function () 
          {
                
                $scope.formData.date1 = $filter('date')(new Date($scope.formData.date1), 'yyyy-MM-dd');
                $scope.formData.date2 = $filter('date')(new Date($scope.formData.date2), 'yyyy-MM-dd');
                $scope.NoticeExists = Noticeboard.findOne({filter: {where: {schoolId: $scope.userData.schoolId, title: $scope.formData.title, date1: $scope.formData.date1}}},
                  function ()
                  {
                                  $scope.failureCall('Notice With That Title & From Date Combination Already Exists');
                  },
                  function () 
                  {
                    Noticeboard.create({  schoolId: $scope.userData.schoolId,
                                    title: $scope.formData.title,
                                    description:$scope.formData.description,
                                    date1:$scope.formData.date1,
                                    date2:$scope.formData.date2
                                  },
                                  function () 
                                   {
                                           $scope.successCall("Notice Created Succesfully");
                                  },
                                  function (response) 
                                  {
                                     console.log(response.data.error.message);
                                  }
                                  );
                  });
          }

}]);
