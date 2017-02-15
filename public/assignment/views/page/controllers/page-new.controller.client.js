(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findAllPagesForWebsite(vm.websiteId);
        }

        init();

        function createPage(page) {
            PageService.createPage(vm.userId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page")
        }
    }
})();