(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init(){
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            vm.widgets = widgets.data.sort(compare);
        }

        function compare(a,b) {
            if (a.index < b.index)
                return -1;
            if (a.index > b.index)
                return 1;
            return 0;
        }

        function getWidgetTemplateUrl(widgetType) {
            var type;
            switch(widgetType){
                case 'h': type = 'HEADER';
                    break;
                case 'ht': type = 'HTML';
                    break;
                case 'i': type = 'IMAGE';
                    break;
                case 'y': type = 'YOUTUBE';
                    break;
                case 'tx': type = 'TEXT';
                    break;
                default:
                    console.log('No such option');
            }
            var url = 'views/widget/templates/widget-'+type+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
        
    }
})();