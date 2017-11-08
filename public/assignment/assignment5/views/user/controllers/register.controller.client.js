(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function register(user) {
            UserService
                .findUserByUsername(user.username)
                // .success(function (user) {
                //     vm.message="Username already taken";
                // })
                // .error(function(err) {
                //     UserService
                //         .createUser(user)
                //     $location.url("/user/"+user._id);
                // })
                .then(displayMessage)
                .catch(createUser(user))
        }

        function displayMessage(user) {
            vm.message = "Username already taken";
        }

        function createUser(user) {
            UserService
                .createUser(user)
                .then(gotoUser)
        }

        function gotoUser(user) {
            $location.url("/user/" + user._id);
        }
    }
})();