(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        this.findAllWidgets = findAllWidgets;
        this.createWidget = createWidget;
        this.findWidgetByPageId = findWidgetByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        
        function createWidget(pageId, widget) {
            
        }

        function findAllWidgets(pageId) {
            return widgets;
        }

        function findWidgetByPageId(pageId) {
            for(var w in widgets){
                if(widgets[w].pageId === pageId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, newWidget) {
            for(var w in widgets){
                var widget = widgets[w]
                if(widgets[w]._id === widgetId){
                    return angular.up(widgets[w]);
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    widgets.splice(w,1);
                }
            }
        }
    }
})();