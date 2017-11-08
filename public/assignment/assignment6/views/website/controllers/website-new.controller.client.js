(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($scope, $routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(findAllWebsitesForUser);
        }

        init();

        function findAllWebsitesForUser(websites) {
            vm.websites = websites;
        }

        function createWebsite(website) {
            if($scope.websiteNew.$valid) {
                if (website == undefined || website.description == undefined || website.name == undefined) {
                    vm.error = "Please enter complete details"
                }
                else {
                    WebsiteService
                        .createWebsite(vm.userId, website)
                        .then(listWebsites)
                }
            }else{
                $scope.websiteNew.submitted = true;
                vm.error = "Form incomplete";
            }
        }

        function listWebsites() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(gotoWebsites);
        }

        function gotoWebsites(websites) {
            vm.websites = websites;
            $location.url("/user/"+vm.userId+"/website");
        }
    }
})();