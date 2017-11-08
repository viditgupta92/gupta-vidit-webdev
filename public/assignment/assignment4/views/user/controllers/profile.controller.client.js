(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.unregisterUser = unregisterUser;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                vm.user = user;
            });
        }

        init();

        vm.update = function (newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if (user == null) {
                        vm.error = "unable to update user";
                    }
                    else {
                        vm.message = "user successfully updated"
                    }
                });
        }

        function unregisterUser(user) {
            var choice = confirm("Are you sure?");
            if (choice) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = "Unable to remove user";
                    });
            }
        }

    }

})();