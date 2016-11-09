angular.module('app').controller('MarksController', function (MaxMark,$scope, $state, School,Subject,Student, Exam,Marks,Class,$rootScope, $window,ngDialog,$filter) {

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

              
            
            
            
          
            


             //--------------------------------------------
             //            STUDENT VIEW
             //--------------------------------------------
             Marks.find({filter:{where:{ studentId : $scope.user.id },include:'exam'}},
             function(response)
             {
               console.log(response);
             });
                 
             

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
             //                 CLEAR RESPONSE
             //----------------------------------------------

             $scope.clearResponseExam = function()
             { 
                $scope.responseMarks = null;
                // $scope.formData      = null;
                $scope.error         = false;
                $scope.success       = false;
                
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



             //----------------------------------------------
             //                 SUCCESS CALL 
             //----------------------------------------------

            //  successCall = function(message)
            //  { 
            //     $scope.responseMarks = message;
            //     $scope.error         = false;
            //     $scope.success       = true;
            //     setTimeout(function() {  
            //                  $scope.clearResponseExam();
            //         }, 1000);
            //  }


             //----------------------------------------------
             //                 SHOW MARKS
             //----------------------------------------------
                $scope.list =[];
              $scope.delete= function(){
                var count =0;
                $scope.test =Marks.find(function(response){
                    response.forEach(function(tests){
                    var p = tests.toJSON();
                    console.log(count);
                    Marks.destroyById({id: p.id},function()
                    {
                    },function(response){
                        console.log(response);
                    });
                    count++;  
                    });
                });
                  }
             //   $scope.delete();

            //----------------------------------------------
            //               VIEW MARKS
            //---------------------------------------------
            $scope.viewMarks = function()
            {
                MaxMark.findOne({filter : { where : { subjectId : $scope.formData.subjectId , examId : $scope.formData.examId}}},
                function(response)
                {
                    displayMarks();
                    $scope.formData.maxMarks = response.maxMarks;
                },
                function()
                {
                    $scope.failureCall('Maximum Marks Were Not Set.'); 
                });
            }
            //----------------------------------------------
            //              DISPLAY MARKS
            //---------------------------------------------
            displayMarks = function() 
            {
                Class.findOne({ filter :{ where : { id : $scope.formData.classId },
                include : 
                [
                   {
                        relation : 'students',scope:
                        {
                            include :
                            [
                                {
                                    relation : 'marks',scope:
                                    {
                                        where : 
                                                {
                                                    examId : $scope.formData.examId,
                                                    subjectId : $scope.formData.subjectId
                                                },
                                                include:
                                                [
                                                    {
                                                        relation :'exam',scope:
                                                        {
                                                            include:
                                                            [
                                                                {
                                                                    relation : 'maxMarks'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }},function(response)
                {
                 console.log(response);
                 $scope.list1 = response;
                },function(response)
                {
                 console.log(response.data.error.message);
                });              
            }
            //----------------------------------------------
            //               SAVE MARKS
            //---------------------------------------------

             $scope.saveMarks = function (x) 
             {
                if( x.marks[0].marksObtained > $scope.formData.maxMarks || x.marks[0].marksObtained < 0  )  {
                    $scope.failureCall('Invalid Marks');
                    displayMarks();
                    
                } 
                else{
                Marks.upsert({ id : x.marks[0].id,marksObtained : x.marks[0].marksObtained},function(){
                    $scope.successCall('Marks Updated Successfully');
                    displayMarks();
                    
                    
                });

                }
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

});
