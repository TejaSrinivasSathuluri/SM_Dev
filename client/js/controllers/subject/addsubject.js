angular.module('app')
.controller('AddSubjectController',function ($scope, Admin, $state, School, Class, Student, Staff, Subject, $rootScope, $window) 
{
       
        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
       
        $scope.schoolId = $scope.userData.schoolId;
       
        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
         
          $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});
          
          $scope.formData = [];
      

	    	  //--------------------------------------------------------
          //                  CLEAR RESPONSE
          // --------------------------------------------------------
            $scope.clearResponse = function (){
              $scope.formData = null;
              $scope.response = null;
              $scope.responseAddSubject = null;
            }

            
            School.findOne({
              filter:{
                where :{
                  id : $scope.userData.schoolId
                },
                include:[
                  'staffs','classes'
                ]
              }
            },function(response)
            {
              $scope.staffList = response.staffs;
              $scope.classList = response.classes;
            });
         
          
         //---------------------------------------------------------
         //      SUCESS CALL
         //---------------------------------------------------------
         successCall = function(message) {
            $scope.responseAddSubject = message;
            $scope.error = false;
            $scope.success = true;
            setTimeout(function() {
            $scope.success = false;
            $state.go('subject');
            }, 1000);
          }
          //--------------------------------------------------------
          //    FAILURE CALL
          //--------------------------------------------------------
          failureCall = function(message) {
            $scope.responseAddSubject = message;
            $scope.error = true;
            $scope.success = false;
            setTimeout(function() 
            {
            $scope.error = false;
            }, 1000);  
        }


        

          $scope.addSubject = function () 
          {
                Subject.findOne({filter: {where: { schoolId:$scope.schoolId,classId: $scope.formData.classSelected,subjectName: $scope.formData.subjectName}}},
                  function ()
                  {
                                       failureCall('Subject Already Exists');
                  },
                  function () 
                  {
                    Subject.create({schoolId: $scope.schoolId,classId: $scope.formData.classSelected,subjectName: $scope.formData.subjectName,staffId: $scope.formData.staffSelected},
                      function () 
                      {
                                       successCall("Subject Created Successfully");
                      },
                      function (response) { console.log(response.data.error.message);});

                  });


           }
      });
