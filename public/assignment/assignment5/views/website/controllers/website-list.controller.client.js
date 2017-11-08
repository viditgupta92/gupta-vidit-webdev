(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm =this;
        vm.userId = $routeParams.uid;

        function init(){
            findAllWebsitesForUser();
        }
        init();

        function findAllWebsitesForUser() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(renderWebsites);
        }

        function renderWebsites(websites) {
            vm.websites = websites;
            console.log(vm.websites);
        }

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }
    }
})();