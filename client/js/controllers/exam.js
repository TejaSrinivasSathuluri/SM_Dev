angular.module('app')


  .controller('ExamController', 
  function ($scope, $state, School, Exam,Class,$rootScope, $window,ngDialog,$filter,Subject) 
  {

       //------------------------------------------------
        //            BASIC USER DATA
        //------------------------------------------------

        $scope.user = $window.localStorage.getItem('user');
        $scope.userData = JSON.parse($scope.user);
        $scope.schoolId = $scope.userData.schoolId;
        if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
        if ($scope.userData.type == 'Student') { $scope.Student = true;}
        if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
        if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});
         //--------------------------------------------
         //          GET CLASS LIST
         //--------------------------------------------
         $scope.classList = Class.find({filter: {where: {schoolId: $scope.schoolId}}});

         //--------------------------------------------
         //          SHOW NOTICE
         //--------------------------------------------
      
          $scope.examList =[];
          $scope.showExamList = function()
          {
          $scope.examList = Exam.find({filter: {where: {schoolId: $scope.schoolId},include:'class'}});

         }
         $scope.showExamList();



         //----------------------------------------------
         //                 CLEAR RESPONSE
         //----------------------------------------------

         $scope.clearResponseExam = function(){ $scope.responseExam = null;}


        //------------------------------------------------
        //              SUCCESS CALL
        //------------------------------------------------
        successCall = function(message)
        {
                $scope.responseExam = message;
                $scope.error = false;
                $scope.success=true;
                setTimeout( function()
                            {         
                              $scope.success=false;
                              $scope.responseExam = null;
                              $scope.formData = null;
                              $scope.showExamList();
                            }, 1000 );
                          
        }
        //------------------------------------------------
        //              FAILURE CALL
        //------------------------------------------------
        failureCall = function(message)
        {
                $scope.responseExam = message;
                $scope.error = true;
                $scope.success=false;
                setTimeout( function()
                            {         
                              $scope.error=false;
                              $scope.responseExam = null;
                              // $scope.formData = null;
                              $scope.showExamList();
                            }, 2000 );
                          
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

          },function(){


      Exam.create({
                  fromDate   : $scope.formData.fromDate,
                  toDate     : $scope.formData.toDate,
                  examName   : $scope.formData.examName,
                  classId    : $scope.formData.classId,
                  schoolId   : $scope.schoolId,
                  subjectList: $scope.subjectList
                },function()
                                                                        {
                                                                          successCall(' Exam Record Added Successfully');
                                                                        },
                                                                       
                function ()
                {
                  $scope.responseExam = "Exam Added Successfully";
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
             Exam.deleteById({id: x.id},function()
                                                                        {
                                                                          failureCall(' Exam Record Deleted Successfully');
                                                                        },
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
         //----------------------.; --------------------------
      //            EDIT Exam List
      //------------------------------------------------

      $scope.editExam = function (x) {
		    //$scope.examName = x.examName;
		   $scope.formData=x;
		    $scope.fromDate = $filter('date')(new Date(x.fromDate), 'yyyy-MM-dd');
          $scope.toDate = $filter('date')(new Date(x.toDate), 'yyyy-MM-dd');
		   ngDialog.openConfirm({template: 'editExam',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(formData) {
            Exam.upsert({id:x.id,classId:formData.classId, examName:formData.examName,fromDate: formData.fromDate,toDate:formData.toDate},
            function () {
              successCall(' Exam Record Updated Successfully');
                $scope.responseExam = "Exam Record Updated Successfully";
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
              });
          },
          function(value) {
            failureCall(' Exam Record Was Not Edited.Please Fill All Required Fields');
            $scope.responseExam = "Exam Record Was Not Edited.Please Fill All Required Fields";
            setTimeout( function()
            {
              $state.go($state.current, {}, {reload: true});
              $scope.$apply();
            }, 1000 );

          }
        );
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
