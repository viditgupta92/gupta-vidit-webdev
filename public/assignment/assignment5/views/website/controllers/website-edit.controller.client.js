(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(renderWebsites);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(renderWebsite);
        }

        init();

        function renderWebsites(websites) {
            vm.websites = websites;
        }

        function renderWebsite(website) {
            vm.website = website;
        }

        function updateWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(vm.websiteId, newWebsite)
                .then(findAllWebsitesForUser);

        }

        function findAllWebsitesForUser(websites) {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(gotoWebsite);
        }

        function gotoWebsite(websites) {
            vm.websites = websites.data;
            $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(findAllWebsitesForUser);
        }
    }
})();