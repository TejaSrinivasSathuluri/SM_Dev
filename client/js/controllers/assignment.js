angular
  .module('app')
.controller('AssignmentController', function (
      $scope,$rootScope, $state, Class, Assignment,$window,ngDialog,$filter,School) {

      //--------------------------------------------------------
      //                 GET USER DATA && INITIALIZATION
      //--------------------------------------------------------
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});

      if ($scope.Admin) {


        //--------------------------------------------------------
        //                 GET CLASS LIST
        //--------------------------------------------------------
        $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}});

       


        //--------------------------------------------------------
        //                 ADD ASSIGNMENT
        //--------------------------------------------------------

        $scope.addAssignment = function () {


          ngDialog.openConfirm({template: 'addAssignment',
            scope: $scope 
          }).then(
            function(formData) {
              formData.fromDate = $filter('date')(new Date(formData.fromDate), 'yyyy-MM-dd');
              formData.toDate   = $filter('date')(new Date(formData.toDate), 'yyyy-MM-dd');
              Assignment.create({
                  schoolId    : $scope.schoolId,
                  title       : formData.title,
                  classId     : formData.classSelected,
                  description : formData.description,
                  fromDate    : formData.fromDate,
                  toDate      : formData.toDate
                  // downloadFile: $scope.downloadFile
                }, function ()
              {
                $scope.responseAddAssignment = "Assignment  Record Added Successfully";
                setTimeout( function()
                {
                    $scope.showAssignments(); 
                   
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

        
        //--------------------------------------------------------
        //                 SHOW ASSIGNMENT LIST
        //--------------------------------------------------------
       
        $scope.assignmentlist = [];
        $scope.showAssignments  = function()
        {
          $scope.assignmentlist = Assignment.find({filter: {where: {schoolId: $scope.schoolId}, include: 'class'}});
        }
        $scope.showAssignments(); 

        //--------------------------------------------------------
        //                 DELETE ASSIGNMENT LIST
        //--------------------------------------------------------
        $scope.deleteAssignment = function (x) {
          var dialog = ngDialog.open({template: 'deleteAssignment'});
          dialog.closePromise.then(function (data) {
            if (data.value && data.value != '$document' && data.value != '$closeButton') 

               Assignment.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")},function(){
              $scope.responseAddAssignment = "Assignment Record Deleted Successfully";
              setTimeout( function()
              {
                
                $scope.showAssignments();
              }, 1000 );

            });
          return true;
        });
        

        }

        // --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'title';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;

        $scope.numberOfPages=function(){return Math.ceil($scope.assignmentlist.length/$scope.pageSize);}

        
         //--------------------------------------------------------
        //                 EDIT ASSIGNMENT LIST
        //--------------------------------------------------------
        $scope.editAssignment = function (x) {
          $scope.formData = x;
          $scope.formData.classId = x.classId;
          $scope.title = x.title;
          // $scope.formData.classId = x.classId;
          $scope.fromDate = $filter('date')(new Date(x.fromDate), 'yyyy-MM-dd');
          $scope.toDate = $filter('date')(new Date(x.toDate), 'yyyy-MM-dd');
          

          ngDialog.openConfirm({
            template: 'editAssignment',
            scope: $scope //Pass the scope object if you need to access in the template
          }).then(
            function (formData) {
              Assignment.upsert({
                  id: x.id, title: formData.title, classId: formData.classSelected,
                  description: formData.description, toDate: formData.toDate, fromDate: formData.fromDate,
                  uploadFile: formData.uploadFile
                },
                function () {
                $scope.responseAddAssignment = "Assignment Record Updated Successfully";
                setTimeout( function()
                {
                    $scope.showAssignments(); 
                   
                }, 1000 );
              });
          },
          function(value) {
            $scope.responseAddAssignment = "Assignment Record Was Not Edited.Please Fill All Required Fields";
            setTimeout( function()
            {
                    $scope.showAssignments(); 
              
            }, 1000 );

          }
          );
        }
      }
       else if ($scope.Student){
      //   //--------------------------------------------------------
      //   //                 SHOW ASSIGNMENT LIST
      //   //--------------------------------------------------------
        $scope.assignmentlist = [];
        $scope.assignmentlist = Assignment.find({filter: {where: {schoolId: $scope.schoolId,classId:$scope.userData.classId}, include: 'class'}});
      }
      

    })
