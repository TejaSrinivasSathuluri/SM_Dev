angular.module('app').controller('MaxMarksController', function ($scope, $state, School,Subject,Student, Exam,Marks,Class,$rootScope, $window,ngDialog,$filter,MaxMark) {

            //------------------------------------------------
            //            BASIC USER DATA
            //------------------------------------------------

            $scope.userData   = $window.localStorage.getItem('user');
            $scope.user = JSON.parse($scope.userData);
            $scope.schoolId = $scope.user.schoolId;

            if ($scope.user.type == 'Admin')   { $scope.Admin   = true; }
            if ($scope.user.type == 'Student') { $scope.Student = true; }
            if ($scope.user.type == 'Parent')  { $scope.Parent  = true; }
            if ($scope.user.type == 'Staff')   { $scope.Staff   = true; }

             
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
                    $state.go('marks');
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
             

             //--------------------------------------------
             //          GET CLASS LIST & SUBJECT LIST
             //--------------------------------------------
             $scope.classList = Class.find({filter: {where: {schoolId: $scope.schoolId}}});

             $scope.setSubjectList = function()
             { 
                 if ($scope.formData.classId != null){
                            $scope.examList    = Exam.find({filter: {where: {classId: $scope.formData.classId}}});
                            $scope.subjectList = Subject.find({filter: {where: {classId: $scope.formData.classId,examFlag:true}}});
                }
                else
                {
                            $scope.examList    = [];
                            $scope.subjectList = [];
                 }
             }
             //----------------------------------------------
             //                 SET MAX MARKS
             //----------------------------------------------
               $scope.setMaxMarks = function () 
                {
                
                        $scope.maxMarksExists = MaxMark.findOne({filter: {where: { examId: $scope.formData.examId, subjectId: $scope.formData.subjectId}}},
                        function ()
                        {
                                        $scope.failureCall('Record Already exist');
                        },
                        function () 
                        {
                            MaxMark.create({  
                                            examId: $scope.formData.examId,
                                            subjectId:$scope.formData.subjectId,
                                            maxMarks :$scope.formData.maxMarks
                                            
                                        },
                                        function () 
                                        {
                                                $scope.successCall("Record Added Successfully");
                                        },
                                        function (response) 
                                        {
                                            console.log(response.data.error.message);
                                        }
                                        );
                        });
                }



             

            


            

      }
      );
