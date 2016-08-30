angular.module('app')
.controller('TransportController', function (
      $scope,$rootScope,$state,$window,$filter,ngDialog,Bus,BusService,BusSubscription,Class,Student,Parent,School) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
      $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});






      //-----------------------------------
      // TABS CODE
      //------------------------------------

      $scope.tab = 1;
      if($scope.Student) $scope.tab = 2;
      $scope.setTab = function(newTab){  $scope.tab = newTab;};
      $scope.isSet = function(tabNum){  return $scope.tab === tabNum; };


      //**************************************BUS CORNER************************************
      //  INIT FUNCTIONS


      //-----------------------------------------------------
      //   CLEAR RESPONSE
      //-----------------------------------------------------
      $scope.clearResponse  = function() {  $scope.responseAddBus = null; }

      //------------------------------------------------
        //              FAILURE CALL
        //------------------------------------------------
        failureCall = function(message)
        {
                $scope.responseAddBus = message;
                $scope.error = true;
                $scope.success=false;
                setTimeout( function()
                            {         
                              $scope.error=false;
                              $scope.responseAddBus = null;
                              // $scope.formData = null;
                              $scope.showBus();
                            }, 2000 );
                          
        }


        //------------------------------------------------
        //              SUCCESS CALL
        //------------------------------------------------
        successCall = function(message)
        {
                $scope.responseAddBus = message;
                $scope.error = false;
                $scope.success=true;
                setTimeout( function()
                            {         
                              $scope.success=false;
                              $scope.responseAddBus = null;
                              $scope.formData = null;
                              $scope.showBus();
                            }, 1000 );
                          
        }
      // ----------------------------------------------------
      //   SUCCESS CALL
      //-----------------------------------------------------
      
      $scope.successCallBus = function(){
        setTimeout( function()
        {
          $scope.showBus();
          $scope.clearResponse();
          $scope.formData = {};
        }, 1000 );

      }



      // ----------------------------------------------------
      //   SHOW VEHICLE TYPE
      //-----------------------------------------------------
      $scope.showBus= function(){
        $scope.busList = Bus.find({filter:{where:{schoolId:$scope.schoolId}}});
      }
      $scope.showBus();


      // -----------------------------------------------------
      //   ADD BUS
      //-----------------------------------------------------
      $scope.addBus = function()
      {
         Bus.findOne
          (
            {
              filter:{
                  where:{
                        schoolId:$scope.schoolId,
                          busNo      :$scope.formData.busNo
                       
                  }
              }
            },
          function(){
           successCall('Bus Number Already exist'); 
          },function(){
              Bus.create(
                     {
                         busNo      :$scope.formData.busNo,
                         busType    :$scope.formData.busType,
                         busCapacity:$scope.formData.busCapacity,
                         schoolId   :$scope.schoolId
                     },
                     function()
                     {
                        successCall('Bus Added Successfully');                       
                        $scope.responseAddBus = 'Bus Added Successfully';
                        $scope.successCallBus();
                     },
                     function(response)
                     {
                         if (response.status == 422)
                         {
                             $scope.responseAddBus = response.data.error.details.messages.busNo[0];
                         }
                     }
          );

      });
      }
      
      
      // ----------------------------------------------------
      //                         EDIT BUS
      //-----------------------------------------------------
      
       $scope.editBus = function (x) {
		    //$scope.examName = x.examName;
		   $scope.editData=x;
		    
		   ngDialog.openConfirm({template: 'editBus',
          scope: $scope //Pass the scope object if you need to access in the template
        }).then(
          function(editData) {
            Bus.findOne
          (
            {
              filter:{
                  where:{
                        busNo      :editData.busNo
                       
                   
                       
                  }
              }
            },
          function(){
           successCall('Bus Number Already exist'); 
          },function(){
            Bus.upsert({id         : x.id,
                       busNo      :editData.busNo,
                       busType    :editData.busType,
                       busCapacity:editData.busCapacity},
            function () {
              successCall(' Bus Updated Successfully');
                // $scope.responseExam = "Exam Record Updated Successfully";
                setTimeout( function()
                {
                  $state.go($state.current, {}, {reload: true});
                  $scope.$apply();
                }, 1000 );
              });
          },
          function(value) {
            failureCall(' Bus Not Edited');
            // $scope.responseExam = "Exam Record Was Not Edited.Please Fill All Required Fields";
            setTimeout( function()
            {
              $state.go($state.current, {}, {reload: true});
              $scope.$apply();
            }, 1000 );

          }
          );
          });
      }

      // -----------------------------------------------------
      //   DELETE BUS
      //-----------------------------------------------------
      $scope.deleteBus = function(x)
      {

        var dialog = ngDialog.open({template: 'deleteBus'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document' && data.value != '$closeButton')

            Bus.deleteById({id: x.id},function(){
              failureCall('Bus Removed Successfully');
              $scope.responseAddBus = 'Bus Removed Successfully';
              $scope.successCallBus();
            });

          return true;
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
    $scope.numberOfPages=function(){    return Math.ceil($scope.busList.length/$scope.pageSize);}

      //**************************************BUS CORNER************************************



      //**************************************SERVICE CORNER************************************
      //-----------------------------------------------------
      //   CLEAR RESPONSE
      //-----------------------------------------------------
      $scope.clearResponseBusService  = function() { $scope.responseAddBusService = null; }

      // -----------------------------------------------------
      //   ADD SERVICE
      //-----------------------------------------------------
      $scope.addService = function()
      {
        $scope.formData.serviceName = $scope.formData.serviceStartPoint + $scope.formData.serviceDropPoint;
        $scope.chkVehicle = BusService.findOne({filter:{where:
        {
            schoolId          :$scope.schoolId,
            busId             :$scope.formData.busId,
            serviceNo         :$scope.formData.serviceNo           ,
            serviceName       :$scope.formData.serviceName

        }}},function(){
          $scope.responseAddBusService = 'Service Already Exists';
        }, function ()
        {
            $scope.receivers = [{location: $scope.formData.serviceStartPoint, duration: 0,fee:"",pickUpTime:$scope.formData.serviceStartTime1}];
        });

      }
      $scope.addRecipient = function (receiver) {
      if (receiver.location.length == 0)  alert('Please Fill All The Fields');
      else {
        $scope.receivers.push({location: "", duration: "",fee:"",pickUpTime:""});
      }
    }
      $scope.deleteRecipient = function (receiver) {
      for (var i = 1; i < $scope.receivers.length; i++) {
        if ($scope.receivers[i] === receiver) {

          $scope.receivers.splice(i, 1);
          break;
        }
      }
    }


    $scope.setTime =  function(i){
      if(i>=1) $scope.receivers[i].pickUpTime   = new Date($scope.formData.serviceStartTime1.getTime() + $scope.receivers[i].duration*60000);
      else $scope.receivers[i].duration  =0;
    }
      $scope.saveRoutes = function ()
        {
            if ($scope.receivers[$scope.receivers.length - 1].location == 0){
                alert('Please Fill All The Fields');
            }
            else{
                var totalDuration = $scope.receivers[$scope.receivers.length - 1].duration;
                $scope.formData.serviceStartTime1 = new Date($scope.formData.serviceStartTime1.getTime() + 330*60000);
                $scope.formData.serviceStartTime2 = new Date($scope.formData.serviceStartTime2.getTime() + 330*60000);
                $scope.formData.serviceDropTime1 = new Date($scope.formData.serviceStartTime1.getTime() + totalDuration*60000);
                $scope.formData.serviceDropTime2 = new Date($scope.formData.serviceStartTime2.getTime() + totalDuration*60000);

                BusService.create({
                        schoolId          :$scope.schoolId                     ,
                        busId             :$scope.formData.busId               ,
                        serviceNo         :$scope.formData.serviceNo           ,
                        serviceName       :$scope.formData.serviceName         ,
                        serviceStartPoint :$scope.formData.serviceStartPoint   ,
                        serviceDropPoint  :$scope.formData.serviceDropPoint    ,
                        serviceStartTime1 :$scope.formData.serviceStartTime1   ,
                        serviceStartTime2 :$scope.formData.serviceStartTime2   ,
                        serviceDropTime1  :$scope.formData.serviceDropTime1    ,
                        serviceDropTime2  :$scope.formData.serviceDropTime2    ,
                        serviceRoutes     : $scope.receivers
                    },function(){
                        $scope.receivers =[];
                        $scope.response = "Bus Service Created Successfully";
                        $scope.successCallBusService();
                    },function(response){
                        console.log(response);
                    }
                );

            }

        }




        // -----------------------------------------------------
        //   DELETE SERVICE
        //-----------------------------------------------------
      $scope.deleteBusService = function(x)
      {

        var dialog = ngDialog.open({template: 'deleteBus'});
        dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document' && data.value != '$closeButton')

            BusService.deleteById({id: x.id},function(){
              $scope.responseAddBusService = 'Bus Service Removed Successfully';
              $scope.successCallBusService();

            });

          return true;
        });

      }


      // ----------------------------------------------------
      //   SUCCESS CALL
      //-----------------------------------------------------
      $scope.successCallBusService = function(){
        setTimeout( function()
        {
          $scope.showBusService();
          $scope.clearResponseBusService();
          $scope.formData = {};
        }, 1000 );

      }





      // ----------------------------------------------------
      //   SHOW STUDENTS AND CLASSES
      //-----------------------------------------------------
        $scope.classList = Class.find({filter:{where:{schoolId:$scope.schoolId}}});
        $scope.setStudentList = function()
        {
            $scope.studentList = Student.find({filter:{where:{classId:$scope.formData.classId}}});
        }



      // ----------------------------------------------------
      //   SHOW SERVICE
      //-----------------------------------------------------
      $scope.showBusService= function(){
        $scope.serviceList = BusService.find({filter:{where:{schoolId:$scope.schoolId},include:'bus'}});
      }
      $scope.showBusService();

      

      $scope.showRoutes = function(x){
          $scope.popoverIsVisible = true;
          $scope.startLocation =  [];
          $scope.startLocationDrop =  [];
          $scope.startTimeDrop =  [];
          $scope.endLocation = [];
          $scope.startTime = [];
          $scope.endTime =[];
          $scope.routeDetails =[];
        var length = x.serviceRoutes.length;

          for(var i=0;i< x.serviceRoutes.length;i++)
          {
            $scope.startLocation[i] = x.serviceRoutes[i].location;
            $scope.startLocationDrop[i] = x.serviceRoutes[length -1].location;
            var duration = x.serviceRoutes[length - 1].duration;
            $scope.startTimeDrop[i] = new Date(new Date(x.serviceStartTime2).getTime() + (duration+330)*60000);
            $scope.startTime[i] = x.serviceRoutes[i].pickUpTime;
            $scope.routeDetails[i] = {
              startLocation :$scope.startLocation[i],
              startTime : $scope.startTime[i],
              startLocationDrop :$scope.startLocationDrop[i],
              startTimeDrop :$scope.startTimeDrop[i]
          };
            length = length - 1;
          }

      }
      $scope.hideRoutes = function(){
          $scope.popoverIsVisible = false;
      }




      //**************************************BUSSERVICE CORNER***********************************


      //**************************************SUBSCRIPTION CORNER***********************************

      $scope.routesList =[];
      $scope.setRoutes = function(){
          BusService.findById({id:$scope.formData.busServiceId},function(response){
              $scope.routesList = response.serviceRoutes;
          })
      }
      $scope.removeSubscription = function(x){
           BusSubscription.deleteById({id:x.id},function(response){
           });
                            $scope.responseSubscription = 'UnSubscribed Successfully';
                $scope.successCallSubscription();
      }

      
      $scope.addSubscription = function(){
          BusSubscription.create(
              {
              busServiceId    : $scope.formData.busServiceId,
              studentId       : $scope.formData.studentId,
              pickupLocation  : $scope.formData.pickupLocation,
              schoolId        : $scope.schoolId
              },
              function()
              {
                 $scope.responseSubscription = 'Subscription Successfull';
                $scope.successCallSubscription();
              },
              function(response)
              {
                  if (response.data.error.details.messages.studentId[0]){
                  $scope.responseSubscription =response.data.error.details.messages.studentId[0];
              }
              }
          );

      }


    //   SUCCESS CALL
    //-----------------------------------------------------
    $scope.successCallSubscription = function(){
      setTimeout( function()
      {
        $scope.showSubscription();
        $scope.responseSubscription = null;
      }, 1000 );

    }
$scope.showSubscription = function(){
 $scope.busSubscriptionList = 
BusSubscription.find({filter:{where:{schoolId:$scope.schoolId},include:[{relation:'busService'},{relation:'student',scope:{include:{relation:'class'}}}]}});
}
        $scope.showSubscription();




      //**************************************SUBSCRIPTION CORNER***********************************


 })
  ;
  