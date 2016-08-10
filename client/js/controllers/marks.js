angular.module('app').controller('MarksController', function ($scope, $state, School,Subject,Student, Exam,Marks,Class,$rootScope, $window,ngDialog,$filter) {

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

             //--------------------------------------------
             //            CLEAR CONSOLE
             //--------------------------------------------
             // console.log = function() {}
            
             //--------------------------------------------
             //          GET CLASS LIST & SUBJECT LIST
             //--------------------------------------------
             $scope.classList = Class.find({filter: {where: {schoolId: $scope.schoolId}}});

             $scope.setSubjectList = function()
             {
                $scope.examList    = Exam.find({filter: {where: {classId: $scope.formData.classId}}});
                $scope.subjectList = Subject.find({filter: {where: {classId: $scope.formData.classId,examFlag:true}}});
             }
        

             //----------------------------------------------
             //                 CLEAR RESPONSE
             //----------------------------------------------

             $scope.clearResponseExam = function()
             { 
                $scope.responseMarks = null;
                $scope.formData      = null;
                $scope.error         = false;
                $scope.success       = false;
                
             }

             //----------------------------------------------
             //                 SUCCESS CALL 
             //----------------------------------------------

             successCall = function(message)
             { 
                $scope.responseMarks = message;
                $scope.error         = false;
                $scope.success       = true;
                setTimeout(function() {  $scope.clearResponseExam();}, 1000);
             }


             //----------------------------------------------
             //                 SHOW MARKS
             //----------------------------------------------
             $scope.list =[];
             $scope.showMarks = function() {
                
                $scope.students = Student.find({filter:{ where:{  classId : $scope.formData.classId },}},
                function(response)
                { 
                    var i=0;
                    response.forEach(function(element) {
                           var p = element.toJSON();
                           $scope.checkMarks(p,i);
                           i++;
                    });
                
                });
             }


             //----------------------------------------------
             //                 SET MAX MARKS
             //----------------------------------------------
             $scope.setMaxMarks = function(){
                 if (!$scope.formData.examId || !$scope.formData.subjectId ){
                        
                 } 
                 else {

                 Marks.find({ filter:{
                     where:{
                         examId    : $scope.formData.examId,
                         subjectId : $scope.formData.subjectId
                     }
                 }},function (response) {
                      response.forEach(function (marks) {
                                    var m = marks.toJSON();
                                    Marks.upsert({ id: m.id,maxMarks :$scope.formData.maxMarks },function(){
                                    $scope.responseMarks = 'Max Marks Not Saved';
                                    $scope.error = true;
                                    $scope.success = false;
                                    });
                      });
                          $scope.responseMarks = 'Max Marks Saved Successfully';
                $scope.error = false;
                $scope.success = true;
                setTimeout(function() {
                    $scope.clearResponseExam();
            //  $scope.list =[];
                    
                }, 1000);
                 });
                 }

             }



             $scope.checkMarks = function(student,i)
             {
                 $scope.saveMarksFlag = true;
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
                     $scope.list[i] = response.toJSON();
                 },function()
                 {
                     Marks.create({
                            marksObtained    : 0,
                            classId          : $scope.formData.classId,
                            subjectId        : $scope.formData.subjectId,
                            studentId        : student.id,       
                            examId           : $scope.formData.examId,
                            maxMarks          : 100
                        },function(response){
                    //  $scope.list[i] = response.toJSON();
                    $scope.showMarks(); 

                        });
                     
                 });

             }

             $scope.saveMarks = function () 
             {
                
                for(var i=0;i<$scope.list.length;i++){
                     
                   Marks.upsert({ id: $scope.list[i].id,marksObtained :$scope.list[i].marksObtained},function(){},function(){
                          $scope.responseMarks = 'Marks Not Saved';
                          $scope.error = true;
                          $scope.success = false;
                   });
                        

                }
                successCall('Marks Saved Successfully');
                
            }
                


            //----------------------------------------------
            //               SORT TABLE TECHNIQUE
            //----------------------------------------------

            $scope.sortType     = 'title';
            $scope.sortReverse  = false;
            $scope.searchFish   = '';
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.numberOfPages=function(){    return Math.ceil($scope.list.length/$scope.pageSize);}

      }
      );