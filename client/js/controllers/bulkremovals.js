angular
  .module('app')
 .controller('BulkDeleteController', function ($scope,Admin,Class,Student,School,$window,$rootScope,$filter,$state) {
      
      
      //--------------------------------------------------------
      //                  BASIC USER DATA
      // --------------------------------------------------------

        $scope.userData   = $window.localStorage.getItem('user');
        $scope.schoolData = $window.localStorage.getItem('school');
        
        $scope.user = JSON.parse($scope.userData);
        $scope.school = JSON.parse($scope.schoolData);
        $scope.schoolId = $scope.school.id;
        $rootScope.image = $scope.school.image;
        var schoolCode = $scope.school.code;
        
        
        
        console.clear();
        $scope.date = new Date();
        var url = 'http://studymonitor.net/appimages';
        
        $scope.classList = Class.find({filter:{where:{schoolId:$scope.schoolId}}});

    $scope.deleteAll = function(){
      Class.students.destroyById({
        id : $scope.classId
      },function(response){
        console.log(response);
        $scope.response = 'Students Deleted Successfully'
        $scope.error = true;
        setTimeout(function() {
          $scope.error = false;
        }, 1000);
      });

    }
        
        
   })



;
