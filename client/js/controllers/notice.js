angular
  .module('app')

  .controller('NoticeboardController',
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


      //------------------------------------------------
      //            ADD NOTICE
      //------------------------------------------------

      $scope.addNotice = function () {


        ngDialog.openConfirm({template: 'addNotice',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            formData.date1 = $filter('date')(new Date(formData.date1), 'yyyy-MM-dd');
            formData.date2 = $filter('date')(new Date(formData.date2), 'yyyy-MM-dd');
            Noticeboard.create({title : formData.title,description: formData.description,date1: formData.date1,
              date2:formData.date2,schoolId:$scope.schoolId,
              uploadFile:formData.uploadFile},
              function ()
              {
                $scope.successCall('Notice Added Successfully')
                //$scope.responseNotice = "Notice Added Successfully";
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );

              },function(response){
                console.log(response.data.error.message);
              });

              },
              function (value)
              {

              }
        );

      }



      //------------------------------------------------
      //            SHOW NOTICE BOARD
      //------------------------------------------------

      $scope.noticeList = [];
      $scope.showNotice  = function(){
      $scope.noticeList = Noticeboard.find({filter: {where: {schoolId: $scope.schoolId}}});
      }
      $scope.showNotice();

      //------------------------------------------------
      //            DELETE NOTICE BOARD
      //------------------------------------------------

      $scope.deleteNotice = function (x) {
        var dialog = ngDialog.open({template: 'deleteNotice'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document' && data.value != '$closeButton')
            Noticeboard.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")},function(){
              $scope.successCall('Notice Deleted Successfully');
              //$scope.responseNotice = "Notice Deleted Successfully";
              setTimeout( function()
              {
                $state.go($state.current, {}, {reload: true});
                $scope.$apply();
              }, 1000 );

            });
          return true;
        });

      }

      //------------------------------------------------
      //            EDIT NOTICE BOARD
      //------------------------------------------------

      $scope.editNotice = function (x) {
		    $scope.title = x.title;
		    $scope.formData = {description:x.description};
		    $scope.date1 = $filter('date')(new Date(x.date1), 'yyyy-MM-dd');
		    $scope.date2 = $filter('date')(new Date(x.date2), 'yyyy-MM-dd');
		   ngDialog.openConfirm({template: 'editNotice',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            Noticeboard.upsert({id:x.id, title : formData.title,description: formData.description,date1: formData.date1,date2:formData.date2,uploadFile:formData.uploadFile},
              function () {
                $scope.successCall('Notice Saved Successfully');
                //$scope.responseNotice = "Notice Saved Successfully";
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
              });
          },
          function(value) {
            $scope.failureCall('Notice Was Not Edited');
            //$scope.responseNotice = "Notice Was Not Edited.Please Fill All Required Fields";
            setTimeout( function()
            {
              $state.go($state.current, {}, {reload: true});
              $scope.$apply();
            }, 1000 );

          }
        );
      }
      // ----------------------------------------------------
         //   SUCCESS CALL
         //-----------------------------------------------------
         $scope.successCall = function(message){
           $scope.responseNotice = message;
           $scope.error = false;
           $scope.success = true;
          setTimeout( function()
          {
           $scope.responseNotice = null;
           $scope.success = false;
            $scope.formData = {};
            $scope.showNotice();
          }, 1000 );

         }


         

         // ----------------------------------------------------
         //   failure CALL
         //-----------------------------------------------------
         $scope.failureCall = function(message){
           $scope.responseNotice = message;
           $scope.error = true;
           $scope.success = false;
          setTimeout( function()
          {
           $scope.responseNotice = null;
           $scope.error = false;
            $scope.formData = {};
            $scope.showNotice();
          }, 1000 );

         }

        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'title';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.noticeList.length/$scope.pageSize);}
    }])
    

  
  
  
  .filter('startFrom', function() { return function(input, start) { start = +start; return input.slice(start); }})

;
