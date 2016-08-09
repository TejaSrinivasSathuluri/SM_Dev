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

        $scope.addLibrary = function () {


$scope.clearResponse();
 
              var library = ngDialog.open({template: 'addBook',
                scope: $scope  
              });
              library.closePromise.then(
                function(data) { 
         
         if (data.value != '$document' && data.value != '$closeButton'){

                  
                  formData = data.value;

                  Library.findOne({filter:{where:{schoolId: $scope.schoolId, name: formData.name, author: formData.author}}},function(){

                    $scope.responseAddLibrary = "Book & Author Combination Already Exists";
                    setTimeout( function()
						{
                     $scope.error= true;
                      $scope.success = false;
                                              $scope.showBooks();
                        $scope.clearResponse();

						}, 1000 );

                  }, function () {
                    Library.create({
                      schoolId: $scope.schoolId, name: formData.name, author: formData.author,
                      description: formData.description, price: formData.price, available: formData.available
                    }, function () {
                      $scope.responseAddLibrary="Book Added Successfully.";
                      $scope.error= false;
                      $scope.success = true;
                      setTimeout( function(){ 
                        $scope.showBooks();
                        $scope.clearResponse();
                      }, 1000 );
                    },function(response){ console.log(response.data.error.message);});

                  });
         }
                  

                });


	}
  
  $scope.clearResponse = function(){
                      $scope.responseAddLibrary= null;
                       $scope.error= false;
                      $scope.success = false;
                      $scope.formData = null;
    
  }
  
      $scope.libraryList = [];
  
  $scope.showBooks  = function(){
      $scope.libraryList = Library.find({filter: {where: {schoolId: $scope.schoolId}}});

  }
  $scope.showBooks();
  

      $scope.deleteLibrary = function (x) {
         var dialog = ngDialog.open({template: 'deleteLibrary'});

        dialog.closePromise.then(function (data) {

          if (data.value && data.value != '$document' && data.value != '$closeButton') {
            Library.delete({"id": JSON.stringify(x.id).replace(/["']/g, "")},function(){

				  $scope.responseAddLibrary = "Book Deleted Successfully";
          $scope.error= false;
                      $scope.success = true;
				   setTimeout( function()
						{
                     
                                              $scope.showBooks();
                        $scope.clearResponse();

						}, 1000 );
			});



          }
          return true;
        });

      }
      $scope.editLibrary = function (x) {
		   
		    $scope.formData = x;
		   var library = ngDialog.open({template: 'editLibrary',scope: $scope });
        library.closePromise.then
        (
             function(data) 
             {   
                    console.log(data.value);
                    if (data.value != '$document' && data.value != '$closeButton')
                    {
                      
                          formData = data.value;
                          Library.upsert({id:x.id, name : formData.name,author : formData.author,description: formData.description,price: formData.price,available:formData.available},
                          function () 
                          {
                          $scope.responseAddLibrary = "Book Edited Successfully";
                          $scope.error= false;$scope.success = true;
                          setTimeout( function() {$scope.showBooks();$scope.clearResponse();},1000 );
                          },function(response){
                            
                          });
                      }
                      else{
                          $scope.responseAddLibrary = "Book Not Edited";
                          $scope.error= true;$scope.success = false;
                          setTimeout( function() {$scope.showBooks();$scope.clearResponse();},1000 );
                      }
              }     
          );
      }

        $scope.sortType     = 'className';
        $scope.sortReverse  = false;
        $scope.searchFish   = '';
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){    return Math.ceil($scope.libraryList.length/$scope.pageSize);}


    }])


  
  

;
