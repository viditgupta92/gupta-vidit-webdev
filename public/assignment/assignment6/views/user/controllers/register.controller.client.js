(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($scope, $location,$rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function register(newUser){
            if($scope.accountRegister.$valid){
                if(newUser.password != newUser.verypassword){
                    vm.message="Password and Confirm Password does not match";
                }else {
                    UserService
                        .findUserByUsername(newUser.username)
                        .then(function (user) {
                            if (user) {
                                vm.message = "Username already taken";
                            } else {
                                UserService
                                    .register(newUser)
                                    .then(gotoUser);
                            }

                        });
                }
            }else{
                $scope.accountRegister.submitted = true;
                vm.error = "Form incomplete";
            }

                // .catch(createUser(user))
        }

        function gotoUser(user) {
            console.log(user);
            $rootScope.currentUser = user.data;
            $location.url("/user/"+user.data._id);
        }
    }
})();