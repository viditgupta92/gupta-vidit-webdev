(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController($location,$rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user){
            UserService
                .login(user)
                .then(function (user) {
                    console.log(user);
                    $rootScope.currentUser = user.data;
                    $location.url("/user");
                }, function (err) {
                    vm.error = "User not found";
                });
        }

        function gotoUser(user) {
            if(user){
                console.log(user);
                $rootScope.currentUser = user.data;
                $location.url("/user");
            } else{
                console.log("error");
                vm.error = "User not found";
            }
        }
    }
})();