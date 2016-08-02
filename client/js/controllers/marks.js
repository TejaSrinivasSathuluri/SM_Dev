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
            //                 SHOW MARKS
            //----------------------------------------------
            $scope.list =[];
            $scope.showMarks = function() {
                $scope.list =Student.find({filter:{where:{classId:$scope.formData.classId},
                include:
                    [
                        {
                            relation : 'class',scope :{
                                include:[
                                    {
                                     relation : 'exams' ,
                                     scope :{
                                               include:[
                                                   {
                                                        relation :'marks',
                                                         scope:{
                                                                 where :{ subjectId : "579b6aca46bc41981fd5118b"

                                                                 }
                                                              }
                                                   }
                                               ]
                                            }  
                                    }
                                ]

                            }
                        }
                    ]
                }});

           $scope.exams = Exam.find({filter:{where:{classId : $scope.formData.classId }}});
                    console.log($scope.list);
            }

            $scope.saveMarks = function () 
            {
                
                for(var i=0;i<$scope.list.length;i++){
                    for(var j=0;j<$scope.list[i].class.exams.length;j++)
                    {
                        Marks.create({
                            marksObtained    : $scope.list[i].class.exams[j].marksObtained,
                            classId          : $scope.formData.classId,
                            subjectId        : $scope.formData.subjectId,
                            examId           : $scope.list[i].class.exams[j].id                            
                        });
                        

                    }
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

      }
      );
