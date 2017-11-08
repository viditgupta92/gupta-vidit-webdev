(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm =this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init(){
            findPageByWebsiteId();
        }
        init();

        function findPageByWebsiteId() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(renderPage);
        }

        function renderPage(pages) {
            console.log(pages);
            vm.pages = pages.data;
        }
    }
})();