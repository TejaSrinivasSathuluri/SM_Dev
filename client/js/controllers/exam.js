angular.module('app')


  .controller('ExamController', 
  function ($scope, $state, School, Exam,Class,$rootScope, $window,ngDialog,$filter,Subject) 
  {

        //------------------------------------------------
        //            BASIC USER DATA
        //------------------------------------------------

        $scope.userData   = $window.localStorage.getItem('user');
        $scope.schoolData = $window.localStorage.getItem('school');
        
        $scope.user = JSON.parse($scope.userData);
        $scope.school = JSON.parse($scope.schoolData);
        
        $scope.schoolId = $scope.school.id;

        if ($scope.user.type == 'Admin')   { $scope.Admin = true;  }
        if ($scope.user.type == 'Student') { $scope.Student = true;}
        if ($scope.user.type == 'Parent')  { $scope.Parent = true; }
        if ($scope.user.type == 'Staff')   { $scope.Staff = true;  }


         //--------------------------------------------
         //          GET CLASS LIST
         //--------------------------------------------
         $scope.classList = Class.find({filter: {where: {schoolId: $scope.schoolId}}});

         //--------------------------------------------
         //          SHOW EXAM
         //--------------------------------------------
      
          $scope.examList =[];
          $scope.showExamList = function() { $scope.examList = Exam.find({filter: {where: {schoolId: $scope.schoolId},include:'class'}}); }
          $scope.showExamList();



         //----------------------------------------------
         //                 CLEAR RESPONSE
         //----------------------------------------------

         $scope.clearResponseExam = function(){ 
             $scope.responseExam = null;
             $scope.error = $scope.success = false;
             $scope.formData = null;
            }



       //----------------------------------------------
       //                 ADD EXAM
       //----------------------------------------------
       $scope.addExam = function () 
       {
     
          var toDate   = $filter('date')(new Date($scope.formData.toDate), 'yyyy-MM-dd');     
          var fromDate = $filter('date')(new Date($scope.formData.fromDate), 'yyyy-MM-dd');
          Exam.findOne
          (
            {
              filter:{
                  where:{
                        schoolId:$scope.schoolId,
                        examName:$scope.formData.examName,
                        classId:$scope.formData.classId
                  }
              }
            },
          function(response){
            $scope.responseExam = 'Exam Already Exists For This Class';
            $scope.error = true;
            $scope.success = false;
            setTimeout(function() {
                $scope.clearResponseExam();
            }, 1000);

          },function(){


      Exam.create({
                  fromDate   : fromDate,
                  toDate     : toDate,
                  examName   : $scope.formData.examName,
                  classId    : $scope.formData.classId,
                  schoolId   : $scope.schoolId,
                  subjectList: $scope.subjectList
                },
                function ()
                {
                  $scope.responseExam = "Exam Added Successfully";
                    $scope.error = false;
                    $scope.success =true ;
                  setTimeout( function()
                  {
                    $scope.showExamList();
                    $scope.clearResponseExam();
                  }, 1000 );

                },function(response){
                  console.log(response.data.error.message);
                });
      

             

          });

               }    
      
     
       //----------------------------------------------
       //                 DELETE EXAM
       //----------------------------------------------
       $scope.deleteExam = function (x) {

         var dialog = ngDialog.open({template: 'deleteExam'});
         dialog.closePromise.then(function (data) {
           if (data.value && data.value != '$document' && data.value != '$closeButton')
           {
             Exam.deleteById({id: x.id},
               function ()
               {
                 $scope.responseExam = "Exam Deleted Successfully";
                 setTimeout( function()
                 {
                   $scope.showExamList();
                   $scope.clearResponseExam();
                 }, 1000 );

               },function(response){
                 console.log(response.data.error.message);
               });
             return true;
           }
         });

        }  

        //----------------------------------------------
        //               SORT TABLE TECHNIQUE
        //----------------------------------------------

        $scope.sortType     = 'title';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.examList.length/$scope.pageSize);}


      })

;
