(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.createPage = createPage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();

        function createPage(page) {
            if (page == undefined || page.name == undefined || page.description == undefined) {
                vm.error = "Please enter complete details"
            }
            else {
                PageService
                    .createPage(vm.websiteId, page)
                    .success(function (pages) {
                        vm.pages = pages;
                    });
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }
    }
})();