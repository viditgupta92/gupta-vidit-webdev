(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController",profileController);
    
    function profileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        // var userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;

        function init(){
            findUserById();
        }
        init();

        function findUserById() {
            UserService
                // .findUserById(userId)
                .findCurrentUser()
                .success(function(user){
                    if(user != '0'){
                        vm.user = user;
                    }
                })
                .error(function(){

                });
        }

        function updateUser(newUser){
            UserService
                .updateUser(newUser)
                .then(gotoUser);
        }

        function gotoUser() {
            $location.url("/user");
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
                        //.then(getWebsitesForUser);
                        .then(gotoLogin);
            }
        }

        function getWebsitesForUser() {
            WebsiteService
                .findWebsiteByUser($rootScope.currentUser._id)
                .then(deleteWebsitesForUser)
                .then(gotoLogin)
        }

        function deleteWebsitesForUser(websites) {
            for(var website in websites.data){
                WebsiteService
                    .deleteWebsite(website._id)
            }
        }

        function gotoLogin() {
            $location.url("/login");
        }

        function logout(user) {
            UserService
                .logout(user)
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }
    }

})();