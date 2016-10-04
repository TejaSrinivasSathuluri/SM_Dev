angular
  .module('app')
 .controller('ClassController', 
      function ($scope, Admin, $state, School, Class, Student, Staff, $rootScope, $window,ngDialog) 
      {

        //--------------------------------------------------------
        //                  BASIC USER DATA
        // --------------------------------------------------------
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);

        if ($scope.userData.type == 'Admin')   { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent')  { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff')   { $scope.Staff = true;}


        $scope.formData = [];
        $scope.classList =[];
          if ($scope.Student)
          {
            console.log('Student');
            Class.findOne({ filter:{ where :{ id : $scope.userData.classId},include:'staff'}},function(response){ $scope.classData = response});
          }


          School.findOne({
            filter:{
              where :{
                  id : $scope.userData.schoolId
              },
              include:
              [
                    {
                        relation: 'classes',scope: 
                                            { 
                                              include: 'staff' 
                                            }
                    },
                    {
                        relation: 'staffs'
                    }
              ]
            }
          },function(response)
          {
              $rootScope.image = response.image;
              $scope.staffList = response.staffs;
              $scope.classList = response.classes;
          });



		      //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
		       $scope.clearResponse = function ()
           {
			           $scope.response = null;
			           $scope.responseAddClass = null;
                 $scope.formData=null;
		       }

           
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
          }, 1000 );

         }


         

         // ----------------------------------------------------
         //   FAILURE CALL
         //-----------------------------------------------------
         $scope.failureCall = function(message){
           $scope.response = message;
           $scope.error = true;
           $scope.success = false;
          setTimeout( function()
          {
           $scope.response = null;
           $scope.error = false;
            $scope.formData = {};
          }, 1000 );

         }



 
          


          //--------------------------------------------------------
          //                  UPDATE CLASS
          // --------------------------------------------------------
          $scope.updateClass = function (x) {
            Class.upsert({id: x.id, staffId: x.staff.id}, function () {
      				$scope.successCall( "Class " + x.className + "-" + x.sectionName +" Updated Successfully");
            });
          }


          //--------------------------------------------------------
          //                  DELETE CLASS
          // --------------------------------------------------------
          $scope.deleteClass = function (x) {
            var dialog = ngDialog.open({template: 'deleteClass'});
            dialog.closePromise.then(function (data) {
              if (data.value && data.value != '$document' && data.value != '$closeButton')
              {
                Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
                $scope.successCall('Class Deleted Successfully');
                return true;
              }
            });
          }




        
      // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'className';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.numberOfPages=function(){    return Math.ceil($scope.classList.length/$scope.pageSize);}

});
