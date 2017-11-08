(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(gotoUser);
            // promise.success(function (response) {
            //     var loginUser = response;
            //     if(loginUser){
            //         $location.url("/user/" + loginUser._id);
            //     } else{
            //         vm.error = "User not found";
            //     }
            // })
        }

        function gotoUser(user) {
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }
})();