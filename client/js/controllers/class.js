angular
  .module('app')
 .controller('ClassController',    ['$scope', 'Admin', '$state', 'School', 'Class', 'Student', 'Staff', '$rootScope', '$window','ngDialog',
      function ($scope, Admin, $state, School, Class, Student, Staff, $rootScope, $window,ngDialog) {

        //--------------------------------------------------------
        //                  BASIC USER DATA
        // --------------------------------------------------------
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.schoolId = $scope.userData.schoolId;
        $scope.formData = [];
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});
        $scope.classList =[];
        School.findOne({
          filter:{
            where :{
                 id : $scope.schoolId
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
             $scope.staffList = response.staffs;
             $scope.classList = response.classes;
        })
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
           // $scope.showExpense();
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
            //$scope.showExpense();
          }, 1000 );

         }







          //--------------------------------------------------------
          //                  ADD CLASS
          // --------------------------------------------------------

          $scope.addClass = function () {

            ngDialog.openConfirm({template: 'addClass',
              scope: $scope //Pass the scope object if you need to access in the template
            }).then(
              function(formData) {

                $scope.classExists = Class.findOne({filter: {where: { schoolId: $scope.schoolId, className: formData.className, sectionName: formData.sectionName}}},
                  function ()
                  {
                    $scope.error = true;
                    $scope.success = false;

                    $scope.failureCall('Class Already Exists');
                  },
                  function () {
                    Class.create({schoolId: $scope.schoolId,className: formData.className,sectionName:formData.sectionName,staffId:formData.staffSelected},
                      function () {
                        $scope.error = false;
                        $scope.success = true;

                        $scope.successCall("Class "+ formData.className + "-" + formData.sectionName + " Created Successfully");
                        console.log($scope.responseAddClass);

                        setTimeout( function()
                        {
                          $state.go($state.current, {}, {reload: true});
                          $scope.$apply();
                        }, 1000 );
                      },
                      function (response) { console.log(response.data.error.message);});

                  });


              },
              function (value) { }
            );
          }


          //--------------------------------------------------------
          //                  UPDATE CLASS
          // --------------------------------------------------------
          $scope.updateClass = function (x) {
            Class.upsert({id: x.id, staffId: x.staff.id}, function () {
      				$scope.successCall( "Class " + x.className + "-" + x.sectionName +" Updated Successfully");
              setTimeout( function()
              {
                $state.go($state.current, {}, {reload: true});
                $scope.$apply();
              }, 1000 );
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
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
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
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.classList.length/$scope.pageSize);}

	  }
    ])
;
