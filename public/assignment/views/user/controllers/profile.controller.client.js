(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController",profileController);
    
    function profileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.deleteUser = deleteUser;

        vm.update = function(newUser){
            UserService
                .updateUser(userId, newUser)
                .success(function(user) {
                if(user == null){
                    vm.error= "unable to update user";
                }
                else{
                    vm.message = "user successfully updated"
                }
            });
        }

        function deleteUser() {
            UserService.deleteUser(userId);
            $location.url("#/login");
        }

        function init(){
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user;
            });
        }
        init();
    }

})();