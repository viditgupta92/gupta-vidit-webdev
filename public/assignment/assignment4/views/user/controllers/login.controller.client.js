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
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function (response) {
                var loginUser = response;
                if (loginUser) {
                    $location.url("/user/" + loginUser._id);
                } else {
                    vm.error = "User not found";
                }
            })
        }
    }
})();