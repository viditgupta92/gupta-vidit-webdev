module.exports = function (app) {
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.get("/api/widget/:widgetId", findWidgetById);

    var multer = require('multer'); // npm install multer --save

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });

    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEAD ER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678   ", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},

        {"_id": "h", "widgetType": "HEADER"},
        {"_id": "i", "widgetType": "IMAGE"},
        {"_id": "ht", "widgetType": "HTML"},
        {"_id": "y", "widgetType": "YOUTUBE"}
    ];


    function createWidget(req, res) {
        var widget = req.body;
        widget.pageId = req.params.pageId;
        widget._id = (new Date()).getTime().toString();
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var wid = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                wid.push(widgets[w]);
            }
        }
        res.json(wid);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.send(widgets[w]);
            }
        }
        return null;
    }

    function updateWidget(req, res) {
        var wgid = req.params.widgetId;
        var widget = req.body;
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                switch (widget.widgetType) {
                    case "HEADER":
                        widgets[w].name = widget.name;
                        widgets[w].text = widget.text;
                        widgets[w].size = widget.size;
                        break;
                    case "HTML":
                        widgets[w].name = widget.name;
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
                res.json(widgets[w]);
                return;
            }
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function uploadImage(req, res) {

        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;

        var myFile = req.file;
        // var destination   = myFile.destination;  // folder where file is saved to

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file

        var size = myFile.size;
        var mimetype = myFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;
            }
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
    }

};