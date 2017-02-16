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
            vm.widgets = WidgetService.findAllWidgets(vm.pageId);
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
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
            var widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/"+ vm.userId + "/websites/"+ vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();