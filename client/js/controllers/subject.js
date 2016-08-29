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
          $scope.array={subjectName:"",classId:"",staffId:""};
          $scope.uploadFile= function(){
              Papa.parse($scope.myFile, {
                  header: true,
                  dynamicTyping: true,
                  complete: function(results) {
                      data = results.data;

                      for(var k=0;k<data.length;k++){
                          $scope.array.subjectName = data[k].Subject;
                          var className = data[k].Class;
                          var sectionName = data[k].Section;
                          var firstName = data[k].Teacher;

                          $scope.classList = Class.findOne({filter:{where:{className:className,sectionName:sectionName}}},function(response){
                          });
                          console.log($scope.classList[0]);

                              //Staff.findOne({filter:{where:{schoolId:$scope.schoolId,firstName:firstName}}},function(response){
                              //    $scope.array.staffId = response.id;
                              //
                              //});


                      }
                  }
              });
          }





          $scope.formData = [];
        if($scope.Admin) {

	    	  //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
		   $scope.clearResponse = function (){
			   $scope.formData = null;
			   $scope.response = null;
			   $scope.responseAddSubject = null;
		   }

          $scope.staffList = Staff.find  ({filter: {where: {schoolId: $scope.schoolId}}}, function () {
          }, function (response) {
            if (response.status = 401) $state.go('logout', {}, {reload: true});
          });
          $scope.classList = Class.find  ({filter: {where: {schoolId: $scope.schoolId}}}, function () {
          }, function (response) {
            if (response.status = 401) $state.go('logout', {}, {reload: true});
          });
          $scope.subjectList =[];
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


          $scope.addSubject = function () {
            ngDialog.openConfirm({template: 'addSubject',
              scope: $scope //Pass the scope object if you need to access in the template
            }).then(
              function(formData) {
                Subject.findOne({
                    filter: {
                      where: {
                          schoolId:$scope.schoolId,classId: formData.classSelected,subjectName: formData.subjectName
                      }
                    }
                  },
                function () {
                    $scope.responseAddSubject = 'Subject ' + formData.subjectName + ' Already Exists For The Class.' ;
                    $scope.failureCallSubject();
                  },
                function () {
                              Subject.create({
                                  subjectName: formData.subjectName,
                                  classId: formData.classSelected,
                                  staffId: formData.staffSelected,
                                  schoolId:$scope.schoolId
                                },
                                function () {
                                  $scope.successCallSubject("Subject "+ formData.subjectName + " created Successfully");
                                  $scope.showSubject();
                                },
                                function () {
                                      

                                }
                                );
                 });

              },
              function (value) { }
            );
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
          $scope.subjectList = Subject.find({filter: {where:{classId:$scope.userData.classId},include: ['staff', 'class']}});
          Class.findOne({
            filter:{
              where:{
                id : $scope.userData.classId 
              },
              include:'staff'
            }
          },function(response){
            $scope.firstName = response.staff.firstName;
            $scope.lastName = response.staff.lastName;

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
        $scope.numberOfPages=function(){    return Math.ceil($scope.filtered.length/$scope.pageSize);}



      }])
