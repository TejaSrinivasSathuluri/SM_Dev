angular.module('app').controller('GenerateMarksController', function ($scope, $state, School,Subject,Student, Exam,Marks,Class,$rootScope, $window,ngDialog,$filter,MaxMark) {

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
            //                 CHECK  MARKS
            //----------------------------------------------
            checkMarks = function(student,i)
            {
                // $scope.saveMarksFlag = true;
                var a = 0;
                 Marks.findOne
                 ({filter:{
                        where:{
                            studentId : student.id,       
                            examId    : $scope.formData.examId,
                            subjectId : $scope.formData.subjectId
                        },include:'student'
                 }
                     

                 },function(response)
                 {
                    //  $scope.list[i] = response.toJSON();
                 },function()
                 {
                     Marks.create({
                            marksObtained    : a,
                            classId          : $scope.formData.classId,
                            subjectId        : $scope.formData.subjectId,
                            studentId        : student.id,       
                            examId           : $scope.formData.examId,
                        },function(response)
                        {
                            $scope.successCall('MARKS ARE SET')
                        //    displayMarks();
                        });
                     
                 });

            }
            //----------------------------------------------
            //              STUDENT LIST
            //----------------------------------------------
            $scope.generateMarks = function()
            {
             $scope.students = Student.find({filter:{ where:{  classId : $scope.formData.classId }}},
                function(response)
                { 
                    var i=0;
                    response.forEach(function(element) {
                           var p = element.toJSON();
                           checkMarks(p,i);
                           i++;
                    });
                });
            }

             

            


            
});
