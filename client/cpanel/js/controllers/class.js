
angular
  .module('app')

  .controller('ClassController', function($scope, $state,Class,School,Staff) {

    //--------------------------------------------------------
    //                  ADD CLASS
    // --------------------------------------------------------

    $scope.addClass = function ()
    {

      Class.findOne({ filter :{ where : {
          className : $scope.class.className,
          sectionName : $scope.class.sectionName,
          schoolId : $scope.class.schoolId,
        }}},
        function(response){
          alert('Class Already Exists In This School');
        },function(response){

          createClass();
        });
    }

    createClass = function()
    {
      Class.create({  schoolId: $scope.class.schoolId,
          className: $scope.class.className,
          sectionName:$scope.class.sectionName,
          staffId:$scope.class.staffId
        },
        function ()
        {
          $scope.showClass();
          $scope.clearClass();
        },
        function (response)
        {
          console.log(response.data.error.message);
        }
      );
    }


    //-------------------------------------------------
    // clear Response of ng-model
    //-------------------------------------------------
    $scope.clearClass = function() {
      $scope.class = "";
    }

    School.find(function(response){

      $scope.SchoolList = response;
    });


    $scope.setStaff = function()
    {
      $scope.staffList = School.staffs({ id : $scope.class.schoolId});
    }

    ///----------SHOW CLASS-----
    ///-------------------------
    $scope.showClass = function() {
      $scope.classList = Class.find({filter: {include: ['school', 'staff']}});
    }
    $scope.showClass();

    $scope.tab = 0;
    $scope.setTab = function(newTab){  $scope.tab = newTab; };
    $scope.isSet = function(tabNum){   return $scope.tab === tabNum; };


    //--------------------------------------------------------------
    // DELETE SECTION
    //--------------------------------------------------------------
    $scope.delete = function (x) {
      Class.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")},function(){

        $scope.showClass();
      });
    };

  })


