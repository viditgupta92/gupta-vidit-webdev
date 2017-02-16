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
        vm.updateWidget = updateWidget;
        vm.createUpdateForWidget =createUpdateForWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widgets = WidgetService.findAllWidgets(vm.pageId);
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(widget, vm.widgetId, widget.widgetType);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function createUpdateForWidget(widgetId) {
            if(widgetId === "h"||widgetId ==="ht"||widgetId ==="i"||widgetId ==="y"){
                WidgetService.createWidget(vm.pageId,vm.widget);
                $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else{
                WidgetService.updateWidget(vm.widget,widgetId,vm.widget.widgetType);
                $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+ vm.userId + "/website/"+ vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();