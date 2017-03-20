(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController",profileController);
    
    function profileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function init(){
            findUserById();
        }
        init();

        function findUserById() {
            UserService
                .findUserById(userId)
                .then(renderUser);
        }

        function renderUser(user) {
            vm.user = user;
            console.log(vm.user);
        }

        function updateUser(newUser){
            UserService
                .updateUser(userId, newUser)
                .then(gotoUser);
        }

        function gotoUser() {
            $location.url("/user/" + userId)
        }

        function unregisterUser(user) {
            var choice = confirm("Are you sure?");
            if(choice){
                    UserService
                        .deleteUser(user._id)
                        // .success(function () {
                        //     $location.url("/login");
                        // })
                        // .error(function () {
                        //     vm.error = "Unable to remove user";
                        // })
                        .then(gotoLogin);
            }
        }

        function gotoLogin() {
            $location.url("/login");
        }

    }

})();