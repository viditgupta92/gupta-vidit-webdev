(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController);

    function WidgetChooserController($location,$routeParams, WidgetService) {
        var template = [
            { "widgetType": "HEADER","size": 2, "text": ""},
            { "widgetType": "IMAGE", "width": "100%","url": ""},
            { "widgetType": "HTML", "text": ""},
            { "widgetType": "YOUTUBE", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" }
        ];
        var vm =this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.createWidget = createWidget;

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
            vm.newHeader = {
                "_id": "","widgetType": "HEADER","pageId": vm.pageId,"size": 0, "text": ""
            };
            vm.newYoutube = {
                "_id": "","widgetType": "YOUTUBE","pageId": vm.pageId,"width": ""
            };
            vm.newHTML = {
                "_id": "","widgetType": "HTML","pageId": vm.pageId,"text": ""
            };
            vm.newIMAGE = {
                "_id": "","widgetType": "IMAGE","pageId": vm.pageId,"width": "0","url":""
            };
        }
        init();

        function createWidget(newWidget) {
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (widget) {
                    var widget = widget;
                });
            $location.url("/user/"+ vm.userId + "/websites/"+ vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();