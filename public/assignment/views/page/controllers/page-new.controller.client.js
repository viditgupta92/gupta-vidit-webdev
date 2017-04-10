(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($scope, $routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.createPage = createPage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(renderPages);
        }

        init();

        function renderPages(pages) {
            vm.pages = pages.data;
        }

        function createPage(page) {
            if($scope.pageNew.$valid) {
                if (page == undefined || page.name == undefined || page.description == undefined) {
                    vm.error = "Please enter complete details"
                }
                else {
                    PageService
                        .createPage(vm.websiteId, page)
                        .then(listPages);
                }
            }else{
                $scope.pageNew.submitted = true;
                vm.error = "Form incomplete";
            }
        }

        function listPages() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(gotoPages);
        }

        function gotoPages(pages) {
            vm.pages = pages.data;
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page")
        }
    }
})();