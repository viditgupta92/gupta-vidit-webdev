(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.createWebsite = createWebsite;

        function findAllWebsitesForUser() {
            userId = vm.userId;
            WebsiteService
                .findAllWebsitesForUser(userId)
                .then(renderWebsites);
        }

        function renderWebsites(websites) {
            vm.websites = websites;
            $location.url("/user/"+vm.userId + "/website");
        }

        function createWebsite(website) {
            if(website == undefined || website.description == undefined || website.name == undefined)
            {
                vm.error = "Please enter complete details"
            }
            else {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(listWebsites)
            }
        }

        function listWebsites() {
            findAllWebsitesForUser();
        }
    }
})();