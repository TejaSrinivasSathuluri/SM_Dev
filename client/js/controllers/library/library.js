angular
  .module('app')


  .controller('LibraryController',
    ['$scope', '$state', 'School', 'Library', '$rootScope', '$window','ngDialog',
    function ($scope, $state, School, Library, $rootScope, $window,ngDialog) {
      $scope.user = $window.localStorage.getItem('user');
      $scope.userData = JSON.parse($scope.user);
      $scope.schoolId = $scope.userData.schoolId;
      if ($scope.userData.type == 'Admin') { $scope.Admin = true;}
      if ($scope.userData.type == 'Student') { $scope.Student = true;}
      if ($scope.userData.type == 'Parent') { $scope.Parent = true;}
      if ($scope.userData.type == 'Staff') { $scope.Staff = true;}
        $scope.school = School.findById({id:$scope.schoolId},function() {$rootScope.image = $scope.school.image;});


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
            $scope.showBooks();
          }, 1000 );

         }




         // ----------------------------------------------------
         //   failure CALL
         //-----------------------------------------------------
         $scope.failureCall = function(message){
           $scope.response = message;
           $scope.error = true;
           $scope.success = false;
          setTimeout( function()
          {
           $scope.response = null;
           $scope.error = false;
            $scope.formData = {};
            $scope.showBooks();
          }, 1000 );

         }


      $scope.clearResponse = function(){
                          $scope.responseAddLibrary= null;
                          $scope.error= false;
                          $scope.success = false;
                          $scope.formData = null;

      }
      // -------------------------------------------------------------------------------------
      // SHOW LIBRARY
      // --------------------------------------------------------------------------------------

      $scope.libraryList = [];

      $scope.showBooks  = function()
      {
        $scope.libraryList = Library.find({filter: {where: {schoolId: $scope.schoolId}}});
      }
      $scope.showBooks();
      // -------------------------------------------------------------------------------------
      // SHOW LIBRARY
      // --------------------------------------------------------------------------------------

      // -------------------------------------------------------------------------------------
      // DELETE LIBRARY
      // --------------------------------------------------------------------------------------

      $scope.deleteLibrary = function (x)
      {
         var dialog = ngDialog.open({template: 'deleteLibrary',closeByDocument: false,className: 'ngdialog-theme-default deletepopup'});
         dialog.closePromise.then(function (data) {
          if (data.value && data.value != '$document' && data.value != '$closeButton') {
            Library.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")},function()
            {
				   $scope.successCall('Book Deleted Successfully');
      			});
           }
          return true;
          });
      }
      // -------------------------------------------------------------------------------------
      // DELETE LIBRARY
      // --------------------------------------------------------------------------------------



      // -------------------------------------------------------------------------------------
      // EDIT LIBRARY
      // --------------------------------------------------------------------------------------

      $scope.editLibrary = function (x) {
		    $scope.formData = {};
		    $scope.formData.name= x.name;
		    $scope.formData.author= x.author;
		    $scope.formData.description= x.description;
		    $scope.formData.price= x.price;
		    $scope.formData.available= x.available;
		   var library = ngDialog.open({template: 'editLibrary',scope: $scope,closeByDocument: false,className: 'ngdialog-theme-default editpopup' });
        library.closePromise.then
        (
             function(data)
             {
                     if (data.value != '$document' && data.value != '$closeButton'  && data.value != '$escape' && data.value != 'Cancel'){

                                  formData = data.value;
                                  if (x.author == formData.author && x.name == formData.name)
                                  {

                                              Library.upsert({
                                                id:x.id, name: formData.name, author: formData.author,
                                                description: formData.description, price: formData.price, available: formData.available
                                              }, function () {
                                                      console.log('Updating Book Not Author And Name');
                                                      $scope.successCall('Book Updated Succesfully');
                                              },function(){
                                                      $scope.failureCall('Book Not Edited');
                                              });

                                  }
                                  else
                                  {
                                            Library.findOne({filter:{where:{name: formData.name, author: formData.author}}},
                                            function()
                                            {
                                                        //  console.log('Book and Author Combination Already Exists');
                                                         $scope.successCall('Book & Author Combination Already Exists');
                                            },
                                            function () {
                                                        // console.log('Adding A Book With Author And Name Changed');
                                                        Library.upsert({
                                                          id:x.id, name: formData.name, author: formData.author,
                                                          description: formData.description, price: formData.price, available: formData.available
                                                        }, function () {
                                                          // console.log('Updating Author Or Book Name');
                                                          $scope.successCall('Book Updated Succesfully');
                                                        },function(){});

                                            });



                                  }
                     }
                     else{

                          $scope.failureCall('Book Not Edited');
                     }

              });

      }
      // -------------------------------------------------------------------------------------
      // EDIT LIBRARY
      // --------------------------------------------------------------------------------------


      // -------------------------------------------------------------------------------------
      // SORTING
      // --------------------------------------------------------------------------------------

       $scope.sortType     = 'className';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 8;
        $scope.sort = [
          {
            sortReverse:false
          },
          {
            sortReverse:false
          },
          {
            sortReverse:false
          },
          {
            sortReverse:false
          },
          {
            sortReverse:false
          }
        ];

        $scope.toggleSort = function(index){
            $scope.sort[index].sortReverse = !$scope.sort[index].sortReverse;
        }
        $scope.numberOfPages=function(){    return Math.ceil($scope.libraryList.length/$scope.pageSize);}
      // -------------------------------------------------------------------------------------
      // SORTING
      // --------------------------------------------------------------------------------------


}]);
