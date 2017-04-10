(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location,$rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function register(newUser){
            UserService
                .findUserByUsername(newUser.username)
                .then(function (user) {
                    if(user){
                        vm.message="Username already taken";
                    }else{
                        UserService
                            .register(newUser)
                            .then(gotoUser);
                    }

                });
                // .catch(createUser(user))
        }

        function gotoUser(user) {
            console.log(user);
            $rootScope.currentUser = user.data;
            $location.url("/user/"+user.data._id);
        }
    }
})();