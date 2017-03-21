(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            // PageService
            //     .findPageByWebsiteId(vm.websiteId)
            //     .success(function (pages) {
            //         vm.pages = pages;
            //     });
            PageService
                .findPageById(vm.pageId)
                .then(renderPage);
        }
        init();

        function renderPage(page) {
            vm.page = page.data;
        }

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId,page)
                .then(findAllPagesForWebsite);
        }

        function findAllPagesForWebsite() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(gotoPage);
        }

        function gotoPage() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(findAllPagesForWebsite);
        }
    }
})();