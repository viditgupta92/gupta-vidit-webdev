(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm =this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        // vm.updateWidget = updateWidget;
        vm.createUpdateForWidget =createUpdateForWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(renderWidget);
        }
        init();

        function renderWidget(widget) {
            console.log(widget.data);
            vm.widget = widget.data;
        }

        function getEditorTemplateUrl() {
            var type;
            if(vm.widgetId === "h"||vm.widgetId ==="ht"||vm.widgetId ==="i"||vm.widgetId ==="y"||vm.widgetId==="tx") {
                switch (vm.widgetId) {
                    case 'h':
                        type = 'HEADER';
                        break;
                    case 'ht':
                        type = 'HTML';
                        break;
                    case 'i':
                        type = 'IMAGE';
                        break;
                    case 'y':
                        type = 'YOUTUBE';
                        break;
                    case 'tx':
                        type = 'TEXT';
                        break;
                    default:
                        console.log('No such option');
                }
            }
            else{
                switch (vm.widget.type) {
                    case 'h':
                        type = 'HEADER';
                        break;
                    case 'ht':
                        type = 'HTML';
                        break;
                    case 'i':
                        type = 'IMAGE';
                        break;
                    case 'y':
                        type = 'YOUTUBE';
                        break;
                    case 'tx':
                        type = 'TEXT';
                        break;
                    default:
                        console.log('No such option');
                }
            }
            console.log(type);
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function createUpdateForWidget(widgetId) {
            if(widgetId === "h"||widgetId ==="ht"||widgetId ==="i"||widgetId ==="y"||widgetId==="tx"){
                vm.widget.type = widgetId;
                WidgetService
                    .createWidget(vm.pageId,vm.widget)
                    .then(gotoWidget);
            }
            else{
                WidgetService
                    .updateWidget(vm.widget,widgetId,vm.widget.widgetType)
                    .then(displayWidgets);
            }
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(gotoWidgets);
        }

        function displayWidgets() {
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .then(gotoWidgets)
        }

        function gotoWidget(widget) {
            vm.widget = widget;
            displayWidgets();
        }

        function gotoWidgets(widgets) {
            vm.widgets = widgets.data.widgets;
            $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();