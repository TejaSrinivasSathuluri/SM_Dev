angular
  .module('app')
 .controller('BulkController', function (Test,$scope,Admin,Class,Student,School,$window,$rootScope,$filter,$state) {
      
      
      //--------------------------------------------------------
      //                  BASIC USER DATA
      // --------------------------------------------------------

        $scope.userData   = $window.localStorage.getItem('user');
        $scope.schoolData = $window.localStorage.getItem('school');
        
        $scope.user = JSON.parse($scope.userData);
        $scope.school = JSON.parse($scope.schoolData);
        $scope.schoolId = $scope.school.id;
        $rootScope.image = $scope.school.image;
        var schoolCode = $scope.school.code;
 
        
        // console.clear();
        $scope.date = new Date();
        var url = 'http://studymonitor.net/appimages';
        $scope.generate = function(){
        Test.find(function(response){
              response.forEach(function(post){
                var p = post.toJSON();
                Test.deleteById({id:p.id});
                console.log('deleted Successfully');
              });
        });  

        $scope.classList = Class.find({filter:{where:{schoolId:$scope.schoolId}}});
        $scope.slist = School.students({id:$scope.schoolId},function(response){
          response.forEach(function(students){
            var student  = students.toJSON();
            Test.upsert({
              id : student.id,
              firstName : student.firstName,
              lastName : student.lastName,
              email : student.email,
              RFID : student.RFID,
              bloodGroup : student.bloodGroup,
              gender :student.gender, 
              dateofBirth: student.dateofBirth,
              rollNo : student.rollNo,
              classId : student.classId,
              contact : student.contact,
              regId :student.regId,
              password :'12345'
            },function(){
              console.log('Added Successfully');
            },function(response){
              console.log(response.data.error.details);
            })

          });

        });
        }


        var data;
        var count =0;
        $scope.uploadFile= function(){

            // *****Function Starts
              Papa.parse($scope.myFile, {
                  header: true,
                  dynamicTyping: true,
                  complete: function(results) 
                  {
                      $scope.list = results.data;
                      for(var i=0;i<$scope.list.length-1;i++)
                      {
                        $scope.list[i].classId= $scope.classId; 
                        $scope.list[i].dateofBirth = $filter('date')(new Date($scope.list[i].dateofJoin), 'yyyy-MM-dd');
                        $scope.list[i].dateofJoin = $filter('date')(new Date($scope.list[i].dateofBirth), 'yyyy-MM-dd');
                        $scope.image =  url + '/' + schoolCode + '/' +$scope.list[i].classId+ '/' + $scope.list[i].rollNo + '.png';

                          //  Student Check For Roll No
                          	  Student.findOne({filter:{ where :{
                                                                classId:$scope.list[i].classId,rollNo:$scope.list[i].rollNo
                                                                }
                                                      }},function(){},
                                                      function(){
                                                              Student.create({
                                                                                  schoolId        : $scope.schoolId,
                                                                                  firstName       : $scope.list[i].firstName,
                                                                                  lastName        : $scope.list[i].lastName,
                                                                                  email           : $scope.list[i].email,
                                                                                  password        : "123456",
                                                                                  gender          : $scope.list[i].gender,
                                                                                  dateofBirth     : $scope.list[i].dateofBirth,
                                                                                  rollNo          : $scope.list[i].rollNo,
                                                                                  RFID            : $scope.list[i].RFID,
                                                                                  previousSchool  : $scope.list[i].previousSchool,
                                                                                  dateofJoin      : $scope.list[i].dateofJoin,
                                                                                  classId         : $scope.list[i].classId,
                                                                                  status          : "A",
                                                                                  regId           : $scope.list[i].regId,
                                                                                  isDisable       : $scope.list[i].isDisable,
                                                                                  currentAddress  : $scope.list[i].currentAddress,
                                                                                  currentCity     : $scope.list[i].currentCity,
                                                                                  currentState    : $scope.list[i].currentState,
                                                                                  currentPincode  : $scope.list[i].currentPincode,
                                                                                  bloodGroup      : $scope.list[i].bloodGroup,
                                                                                  religion        : $scope.list[i].religion,
                                                                                  caste           : $scope.list[i].caste,
                                                                                  alternateContact: $scope.list[i].alternateContact,
                                                                                  permanentAddress: $scope.list[i].permanentAddress,
                                                                                  permanentCity   : $scope.list[i].permanentCity,
                                                                                  permanentState  : $scope.list[i].permanentState,
                                                                                  permanentPincode: $scope.list[i].permanentPincode,
                                                                                  nationalId      : $scope.list[i].nationalId,
                                                                                  motherTounge    : $scope.list[i].motherTounge,
                                                                                  nationalIdType  : $scope.list[i].nationalIdType,
                                                                                  subCaste        : $scope.list[i].subCaste,
                                                                                  contact         : $scope.list[i].contact,
                                                                                  type            : "Student",
                                                                                  created         : new Date(),
                                                                                  image           : $scope.image,
                                                                                  fatherName      : $scope.list[i].fatherName,
                                                                                  motherName      : $scope.list[i].motherName,
                                                                                  fatherContact   : $scope.list[i].fatherContact,
                                                                                  motherContact   : $scope.list[i].motherContact
                                                                                    },function(){
                                                                                      count++;
                                                                                     console.log('Student'+ count +'Created Successfully');
                                                                                    },function(response){
                                                                                      console.log(response.data.error.message);
                                                                                    });
                                                                                  
                                                                               

                            
                                                      });
                          //  Student Check For Roll No
                                                      


                      }
                  }
                      
                 });
            // *****Function Ends


        }
      
        
   })



;
