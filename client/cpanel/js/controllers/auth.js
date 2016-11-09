
angular
  .module('app')
    .controller('AuthLoginController',function(User,$scope, $state) {
            $scope.user = {
                email: 'admin@studymonitor.com',
                password: 'a!b@c#d$e%'

            };

            $scope.login = function() {


                User.login({email: $scope.user.email, password:$scope.user.password},
                    function(response)
                    {
                        $state.go('home.school');
                    },
                    function(response)
                    {
                        alert('Invalid Login');
                    });
            }
        })



  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    AuthService.logout()
      .then(function() 
      {
        $state.go('login.html');
      });
  }])
