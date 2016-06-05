// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate','ui.router','lbServices','ngResource','ngDialog'])


    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        // route to show our basic form (/form)
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'dashboard.html',
                controller: 'formController'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'schooldirectory.html',
                controller: 'formController'
            })

            .state('subject', {
                url: '/subject',
                templateUrl: 'subject.html',
                controller: 'formController'
            })

            .state('class', {
                url: '/class',
                templateUrl: 'class.html',
                controller: 'formController',
            })
            .state('studenttimetable', {
                url: '/studenttimetable',
                templateUrl: 'studenttimetable.html',
                controller: 'formController',
            })
            .state('payment', {
                url: '/payment',
                templateUrl: 'payment.html',
                controller: 'formController'
            })
        $urlRouterProvider.otherwise('/dashboard');
    })

    .controller('formController', function($scope,$state,$window,ngDialog,Admin,School,Class,Student,Staff,Subject,Parent,FeeType) {

              // Admin Details
                      $scope.admin= Admin.getCurrent(function(){$scope.school= Admin.school({"id":$scope.admin['id']},
                          function () {

                      $scope.staffList   = Staff.find  ({filter: { where: { schoolId : $scope.school.id}}});
                      $scope.parentList  = Parent.find ({filter: { where: { schoolId : $scope.school.id}}});
                      $scope.subjectList = Subject.find({filter: { where: { schoolId : $scope.school.id}}});

                      $scope.showClass();
                      $scope.showSubject();
 });});

                  $scope.formData= {};


        //-------------Search Function
         $scope.processSearch = function() {
                $scope.searchList=[];
               //if staff search is enabled
           if ($scope.formData.staffSearch == true && $scope.formData.searchString != null && $scope.formData.ClassSelected != null && $scope.formData.ClassSelected.length != 0  )
            {
                $scope.searchList = Staff.find({filter: { where: { schoolId : $scope.school.id,username: {like:$scope.formData.searchString}}}});
            }
            else if ($scope.formData.staffSearch == true && $scope.formData.searchString != null)
           {
                $scope.searchList = Staff.find({filter: { where: { schoolId : $scope.school.id,username: {like:$scope.formData.searchString}}}});
           }
            else if ($scope.formData.staffSearch == true)
           {
                $scope.searchList = Staff.find  ({filter: { where: { schoolId : $scope.school.id}}});

           }
            //if staff search is disabled
            else {

                if ($scope.formData.searchString !=null && $scope.formData.ClassSelected != null && $scope.formData.ClassSelected.length != 0 && $scope.formData.rollNumber == true){
                    $scope.searchList = Student.find({filter: { where: { schoolId : $scope.school.id,classId : $scope.formData.ClassSelected,rollNo:$scope.formData.searchString},include:'class'}});
                }
                else if ($scope.formData.ClassSelected != null && $scope.formData.ClassSelected.length != 0){
                    $scope.searchList = Student.find({filter: { where: { schoolId : $scope.school.id,classId : $scope.formData.ClassSelected},include:'class'}});
                }
                else if ($scope.formData.searchString !=null && $scope.formData.ClassSelected != null && $scope.formData.ClassSelected.length != 0 ){
                    $scope.searchList = Student.find({filter: { where: { schoolId : $scope.school.id,classId : $scope.formData.ClassSelected,username: {like:$scope.formData.searchString}},include:'class'}});
                }
                else if ($scope.formData.searchString != null && $scope.formData.rollNumber == true ){
                    $scope.searchList = Student.find({filter: { where: { schoolId : $scope.school.id,rollNo:$scope.formData.searchString},include:'class'}});

                }
                else  {$scope.searchList = Student.find({filter: { where: { schoolId : $scope.school.id},include:'class'}});}
                 }
        }


        //-------------Add Class Function
         $scope.addClass = function() {
              $scope.classExists = Class.findOne({
                      filter: {
                          where: {
                              schoolId: $scope.school.id,
                              className: $scope.formData.className,
                              sectionName: $scope.formData.sectionName
                          }
                      }
                  },
                  function () {
                      $scope.response = 'Class Already Exists';
                  },
                  function () {
                          Class.create({
                              className: $scope.formData.className, sectionName: $scope.formData.sectionName,
                              schoolId: $scope.school.id, staffId: $scope.formData.staffSelected
                          });
                          $scope.response = 'Class ' + $scope.formData.className + '-' + $scope.formData.sectionName + 'Created';
                          $scope.showClass();

                  });


       }
        //-------------Show Class Function
        $scope.showClass = function() {
            $scope.classList=[];
            $scope.classList = Class.find({filter :{where : {schoolId:$scope.school.id},include:'staff' }});

        }
        //-------------Show Class Function
        $scope.editClass = function(x) {
           $('#staffSelected1').val(x.staff.id);
        }
        //------------Delete Class
        $scope.deleteClass = function(x) {
              //ngDialog.open({template :'deleteClass'})  ;
            var dialog = ngDialog.open({template: 'deleteClass'});

            dialog.closePromise.then(function(data) {

                if (data.value && data.value != '$document') {
                    Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
                    $scope.showClass();
                }
                else {

                }

                return true;
            });



        }
        //---------------Update Class
        $scope.updateClass = function(x)
        {
            Class.upsert({
                id : JSON.stringify(x.id).replace(/["']/g, ""),
                teacherId: $scope.formData.staffSelected1
            });
            $scope.response = 'Class updated';
            $scope.showClass();

        }




        //-------------Add Subject Function
        $scope.addSubject = function() {
            $scope.checkSub = Subject.findOne(
              {
                  filter:{where :{className:$scope.classSelected,subjectName : $scope.formData.subjectName}}
              },
              function() {
                $scope.response = 'Subject For ' + $scope.className + '-' +$scope.sectionName + ' Already Exists.';
               },
             function(){
               Subject.create({
                   subjectName: $scope.formData.subjectName,
                   classId: $scope.formData.classSelected,
                   staffId: $scope.formData.staffSelected},
                 function(){},function(response){console.log(response.data.error.details.message);}
               );
               $scope.response = 'Subject ' + $scope.formData.subjectName + ' Assigned To ' + $scope.teacherName + ' for class ' + $scope.className + ' in Section ' + $scope.sectionName ;


           });

 }
        $scope.updateSubject = function(y) {
                Subject.upsert({
                    id : JSON.stringify(y.id).replace(/["']/g, ""),
                    staffId: $scope.formData.staffSelected2
                },function(){
                    $scope.response = 'Subject updated';
                    $scope.showSubject();
                },function(data){
                    console.log(data.statusText);
                });
        }
        $scope.deleteSubject = function(x) {

            var dialog = ngDialog.open({template: 'deleteSubject'});

            dialog.closePromise.then(function(data) {

                if (data.value && data.value != '$document') {
                    Subject.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
                    $scope.showSubject();
                }
                else {

                }

                return true;
            });



        }
        $scope.showSubject = function() {
            $scope.resultlist=[];
            $scope.resultlist = Subject.find({filter: {include:['staff','class']}}
             );


      }



        $scope.addStudent =function()
         {
       $scope.studentExists = Student.findOne({filter:{where :{schoolId: $scope.school.id,classId:$scope.formData.studentClass,rollNo:$scope.formData.studentRollNo}}},
       function(){ $scope.responsemessage='Student Already Exists For This Class With This Roll Number';},
       function(){

          $scope.newStudent =  School.students.create({id : $scope.school.id},{
               username	        :$scope.formData.studentFirstName ,      lastName    	:$scope.formData.studentLastName,
               email     	    :$scope.formData.studentEmail ,          password	    :$scope.formData.studentPassword ,
               gender		    :$scope.formData.studentGender  ,        image		    :$scope.formData.studentImg   ,
               dateofBirth	    :$scope.formData.studentDateOfBirth  ,   rollNo		    :$scope.formData.studentRollNo  ,
               RFID		        :$scope.formData.studentRFID  ,          prevSchool	    :$scope.formData.studentPreviousSchool  ,
               dateofJoin	    :$scope.formData.studentDateOfJoin  ,    classId	   	:$scope.formData.studentClass  ,
               status		    :$scope.formData.studentStatus  ,        regId		    :$scope.formData.studentRegId  ,
               isDisable	    :$scope.formData.studentIsDisable  ,     prevSchoolTC	:$scope.formData.studentPreviousTC  ,
               currentAddress   :$scope.formData.studentCurrentAddress  ,currentCity  	:$scope.formData.studentCurrentCity  ,
               currentState  	:$scope.formData.studentCurrentState  ,  currentPincode :$scope.formData.studentCurrentPincode  ,
               bloodGroup	    :$scope.formData.studentBloodGroup  ,    religion	    :$scope.formData.studentReligion  ,
               caste		    :$scope.formData.studentCaste  ,         alternateContact:$scope.formData.studentAlternateContact  ,
               permanentAddress :$scope.formData.studentPermanentAddress,permanentCity	:$scope.formData.studentPermanentCity  ,
               permanentState	:$scope.formData.studentPermanentState , permanentPincode:$scope.formData.studentPermanentPincode  ,
               nationalId	    :$scope.formData.studentNationalId ,     motherTounge	:$scope.formData.studentMotherTounge  ,
               nationalIdType	:$scope.formData.studentNationalIdType ,
               subCaste	        :$scope.formData.studentSubCaste  ,      contact		:$scope.formData.studentContact
           },
              function(){

                  if ( $scope.formData.motherFirstName != null && $scope.formData.motherLastName != null && $scope.formData.motherPassword != null &&$scope.formData.motherEmail != null  ) {
                      Student.parents.create({id: $scope.newStudent.id}, {
                                  username: $scope.formData.motherFirstName,
                                  lastName: $scope.formData.motherLastName,
                                  email: $scope.formData.motherEmail,
                                  contact: $scope.formData.motherPhone,
                                  password: $scope.formData.motherPassword
                              });

                  }
                  if ( $scope.formData.fatherFirstName != null && $scope.formData.fatherLastName != null && $scope.formData.fatherPassword != null && $scope.formData.fatherEmail != null  ) {
                      Student.parents.create({id: $scope.newStudent.id},{
                                  username: $scope.formData.fatherFirstName,
                                  lastName: $scope.formData.fatherLastName,
                                  email: $scope.formData.fatherEmail,
                                  contact: $scope.formData.fatherPhone,
                                  password: $scope.formData.fatherPassword
                              });
                  }
                  $state.go($state.current, {}, {reload: true});

               }
          );


           });
   }

        $scope.addStaff =function()
        {
           $scope.newStaff = School.staffs.create({id :$scope.school.id},{
                username  :$scope.formData.staffFirstName , lastName    	:$scope.formData.staffLastName,
                email     :$scope.formData.staffEmail ,      password	    :$scope.formData.staffPassword},
               function(){
                   console.log($scope.response.data);
               },
               function(response){
                   console.log(response.data.error.message);
               }
           )
           $scope.response='Staff ' + $scope.formData.staffFirstName + 'is Created' ;
   }



        $scope.addFeeType = function()
        {
             FeeType.create({ feeTitle : $scope.formData.feeTitle, schoolId : $scope.school.id ,feeDescription : $scope.formData.feeDescription , feeCollection : $scope.formData.feeCollection });
             $scope.showFeeType();
        }
        $scope.deleteFeeType = function(x)
        {

            var dialog = ngDialog.open({template: 'deleteFeeType'});

            dialog.closePromise.then(function(data) {

                if (data.value && data.value != '$document') {
                    FeeType.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")});
                    $scope.showFeeType();
                }
                else {

                }

                return true;
            });}
        $scope.showFeeType = function()
        {
            $scope.resultlist = FeeType.find({filter: { where: { schoolId : $scope.school.id}}});
        }
        $scope.updateFeeType = function(x)
        {
            FeeType.upsert({
                id : JSON.stringify(x.id).replace(/["']/g, ""),
                feeTitle : $scope.formData.feeTitle, feeDescription : $scope.formData.feeDescription ,
                feeCollection : $scope.formData.feeCollection
            },function(){
                $scope.response = 'Fee Type Created';
                $state.go($state.current, $stateParams, {reload: true});
            },function(msg){
                $scope.response = msg.body.error.message;
            });

        }
        $scope.editFeeType = function(x){
            $scope.responsemessage = null;
            $('.feeTitle').val(x.feeTitle);
            $('.feeDescription').val(x.feeDescription);
            $('#feeCollection').val(x.feeCollection);
        }
    });
