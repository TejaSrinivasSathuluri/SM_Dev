angular
  .module('app')
  .controller('GradeController', function ($scope, $state, School, Grade,Class,$rootScope, $window,ngDialog,$filter) {

        //------------------------------------------------
        //            BASIC USER DATA
        //------------------------------------------------

        $scope.userData   = $window.localStorage.getItem('user');
        $scope.schoolData = $window.localStorage.getItem('school');
        
        $scope.user = JSON.parse($scope.userData);
        $scope.school = JSON.parse($scope.schoolData);
        
        $scope.schoolId = $scope.school.id;

        if ($scope.user.type == 'Admin')   { $scope.Admin   = true; }
        if ($scope.user.type == 'Student') { $scope.Student = true; }
        if ($scope.user.type == 'Parent')  { $scope.Parent  = true; }
        if ($scope.user.type == 'Staff')   { $scope.Staff   = true; }

    $scope.clearResponseGrade = function(){
      $scope.responseGrade = null;
      $scope.error = false;
      $scope.success = false;
      $scope.formData =null;
    }

     $scope.gradesList = [];
     $scope.showGrades = function(){
     $scope.gradesList = Grade.find({filter:{where:{schoolId : $scope.schoolId}}});}
     $scope.showGrades();

     $scope.addGrade = function(){
       Grade.create({
         schoolId:$scope.schoolId,
         gradeName:$scope.formData.gradeName,
         gradePoint: $scope.formData.gradePoint,
         percentageRangeFrom:$scope.formData.percentageRangeFrom,
         percentageRangeTo :$scope.formData.percentageRangeTo
       },function()
       {
         $scope.responseGrade = 'Grade Added Successfully';
         $scope.success = true;
         $scope.error = false;
         setTimeout(function() { $scope.showGrades(); $scope.clearResponseGrade(); }, 1000);
       },function(response){
           if (response.data.error.details.messages.gradeName[0])     $scope.responseGrade =response.data.error.details.messages.gradeName[0];
           else if (response.data.error.details.messages.gradePoint[0])     $scope.responseGrade =response.data.error.details.messages.gradePoint[0];
           else if (response.data.error.details.messages.percentageRangeFrom[0])     $scope.responseGrade =response.data.error.details.messages.percentageRangeFrom[0];
           else if (response.data.error.details.messages.percentageRangeTo[0])     $scope.responseGrade =response.data.error.details.messages.percentageRangeTo[0];
           $scope.error = true;$scope.success=false;
       });
     }
       
       $scope.deleteGrade = function(x){
           var dialog = ngDialog.open({template: 'deleteGrade'});
         dialog.closePromise.then(function (data) {
           if (data.value && data.value != '$document' && data.value != '$closeButton' && data.value != '$escape')
           {
             
                        Grade.deleteById({id:x.id},function()
                        {
                        $scope.responseGrade = 'Grade Deleted Successfully';
                        $scope.success = true;
                        $scope.error = false;
                        setTimeout(function() {
                        $scope.showGrades();
                        $scope.clearResponseGrade(); 
                        },1000);

                        });
                    
             return true;
           }
         });
       }
  


        //----------------------------------------------
        //               SORT TABLE TECHNIQUE
        //----------------------------------------------

        $scope.sortType     = 'title';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage  = 0;
        $scope.pageSize     = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.gradeList.length/$scope.pageSize);}
 
  })

  .filter('startFrom', function() { return function(input, start) { start = +start; return input.slice(start); }})

;
