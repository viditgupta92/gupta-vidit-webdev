(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},

            {"_id": "h", "widgetType": "HEADER"},
            {"_id": "i", "widgetType": "IMAGE"},
            {"_id": "ht", "widgetType": "HTML"},
            {"_id": "y", "widgetType": "YOUTUBE"}
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetByPageId": findWidgetByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findAllWidgets": findAllWidgets
        };
        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widget._id = (new Date()).getTime().toString();
            widgets.push(widget);
        }

        function findWidgetByPageId(pageId) {
            var wid = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    wid.push(widgets[w]);
                }
            }
            return wid;
        }

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widget, wgid, type) {
            for (var w in widgets) {
                if (widgets[w]._id === wgid) {
                    switch (type) {
                        case "HEADER":
                            widgets[w].text = widget.text;
                            widgets[w].size = widget.size;
                            break;
                        case "HTML":
                            widgets[w].text = widget.text;
                            break;
                        case "YOUTUBE":
                            widgets[w].url = widget.url;
                            widgets[w].width = width.width;
                            break;
                        case "IMAGE":
                            widgets[w].url = widget.url;
                            widgets[w].width = widget.width;
                            break;
                    }
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function findAllWidgets(pageId) {
            return widgets;
        }
    }
})();