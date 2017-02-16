(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        }

        init();

        function createWebsite(website) {
            if(website == undefined || website.description == undefined || website.name == undefined)
            {
                vm.error = "Please enter complete details"
            }
            else {
                WebsiteService.createWebsite(vm.userId, website);
                $location.url("/user/"+vm.userId+"/website");
            }

        }
    }
})();