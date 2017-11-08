(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.createUpdateForWidget = createUpdateForWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }

        init();

        function updateWidget(widget) {
            WidgetService
                .updateWidget(widget, vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-' + type + '-editor.view.client.html';
        }

        function createUpdateForWidget(widgetId) {
            if (widgetId === "h" || widgetId === "ht" || widgetId === "i" || widgetId === "y") {
                WidgetService
                    .createWidget(vm.pageId, vm.widget)
                    .success(function (widget) {
                        vm.widget = widget;
                    });
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else {
                WidgetService
                    .updateWidget(vm.widget, widgetId, vm.widget.widgetType)
                    .success(function (widget) {
                        vm.widget = widget;
                    });
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();