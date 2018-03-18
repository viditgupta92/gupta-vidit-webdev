(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController($scope, $location,$rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user){
            if($scope.accountLogin.$valid){
                UserService
                    .login(user)
                    .then(function (user) {
                        console.log(user);
                        $rootScope.currentUser = user.data;
                        $location.url("/user/" + user.data._id);
                    }, function (err) {
                        vm.error = "User not found";
                    });
            }else{
                $scope.accountLogin.submitted = true;
                vm.error = "Form incomplete";
            }
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