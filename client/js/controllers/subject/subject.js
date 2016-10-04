angular.module('app')
.controller('SubjectController',
    ['$scope', 'Admin', '$state', 'School', 'Class', 'Student', 'Staff', 'Subject', '$rootScope', '$window','ngDialog',
      function ($scope, Admin, $state, School, Class, Student, Staff, Subject, $rootScope, $window,ngDialog) {
       
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
       
        $scope.schoolId = $scope.userData.schoolId;
       
        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
         
          $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});
          var data;

          $scope.formData = [];
        if($scope.Admin || $scope.Staff) {

	    	  //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
		   $scope.clearResponse = function (){
			   $scope.formData = null;
			   $scope.response = null;
			   $scope.responseAddSubject = null;
		   }

          $scope.subjectList =[];
          School.findOne({
            filter:{
              where :{
                id : $scope.userData.schoolId
              },
              include:['classes','staffs']
            }
          },function(response)
          {
            $scope.staffList = response.staffs;
            $scope.classList = response.classes;
          });

          $scope.showSubject = function()
          {
            $scope.subjectList = Subject.find({filter: {where:{schoolId: $scope.schoolId},include: ['staff', 'class']}});
          }

          
          $scope.showSubject();
          $scope.successCallSubject = function(message) {
            $scope.responseAddSubject = message;
            $scope.error = false;
            $scope.success = true;
            setTimeout(function() {
            $scope.success = false;
            $scope.showSubject();
            }, 1000);
          }
          $scope.failureCallSubject = function() {
            $scope.error = true;
            $scope.success = false;
            setTimeout(function() 
            {
            $scope.error = false;
            $scope.showSubject();
            }, 1000);  
        }


         


          $scope.updateSubject = function (a) {
						Subject.upsert({id: a.id, staffId: a.staff.id},
						  function () {
                $scope.successCallSubject("Subject Edited Successfully");
						  },
						  function (response) {
							console.log(response.data.error.message);
						  });
          }


          $scope.deleteSubject = function (x) {

            var dialog = ngDialog.open({template: 'deleteSubject'});
            dialog.closePromise.then(function (data) {

              if (data.value && data.value != '$document' && data.value != '$closeButton') {
                Subject.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")},function(){
                  $scope.successCallSubject("Subject deleted Successfully");
                });
              }
              return true;
            });

          }

          $scope.addExamEligibility = function(a){
          
              Subject.prototype$updateAttributes(
                {
                  id : a.id,
                  examFlag : a.examFlag
                }
              );
          }
        }
        else if ($scope.Student){


            $scope.subjectList =[];
         
         Student.findOne({filter:{
           where :{
             id : $scope.userData.id
           },include :[
             {
               relation : 'class',scope:{
                 include :[
                   {
                     relation : 'subjects',
                     scope :{
                       include : [
                         {
                           relation : 'staff'
                         }
                       ]
                     }
                   },
                   {
                     relation : 'staff'
                   }
                 ]
               }
             }
           ]
         }},function(response)
         {
              $scope.classData = response.class; 
              $scope.subjectList = response.class.subjects;
         });
         
        }
	    	// --------------------------------------------------------
        //                 SORT TABLE TECHNIQUE
        //--------------------------------------------------------

        $scope.sortType     = 'subjectName';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 8;
        $scope.numberOfPages=function(){    return Math.ceil($scope.filtered.length/$scope.pageSize);}



      }])
