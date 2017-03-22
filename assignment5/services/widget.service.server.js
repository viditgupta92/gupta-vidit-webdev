module.exports = function (app, model) {
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.get("/api/widget/:widgetId", findWidgetById);

    var pageModel = model.pageModel;
    var widgetModel = model.widgetModel;

    var multer = require('multer'); // npm install multer --save

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+"/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now()+ '.' +extension)
        }
    });

    var upload = multer({storage: storage });

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget){
                pageModel
                    .addWidget(pageId, widget._doc._id)
                    .then(function (page){
                        widgetModel
                            .findWidgetById(widget._id)
                            .then(function (widget) {
                                res.send(widget);
                            }, function(err){
                                res.sendStatus(500).send(err);
                            });
                    }, function(err){
                        res.sendStatus(500).send(err);
                    });
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                    res.send(widgets);
                }, function(err){
                    res.sendStatus(500).send(err);
                });
    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function updateWidget(req,res) {
        var wgid = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(wgid, widget)
            .then(function (status) {
                res.send(status);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.send(status);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function uploadImage(req, res) {

        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;

        var myFile        = req.file;
        // var destination   = myFile.destination;  // folder where file is saved to

        // var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file

        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        if(widgetId == 'i'){
            var widget= {
                width: width,
                type: 'i',
                url : req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename
            };
            widgetModel
                .createWidget(pageId, widget)
                .then(function (new_widget){
                    widgetId = new_widget._doc._id;
                    console.log(widgetId);
                    pageModel
                        .addWidget(pageId, widget._doc._id)
                        .then(function (page){
                            res.send(page);
                        }, function(err){
                            res.sendStatus(500).send(err);
                        });
                }, function(err){
                    res.sendStatus(500).send(err);
                });
        }
        else{
            widgetModel
                .findWidgetById(widgetId)
                .then(function (widget){
                    widget.width = width;
                    widget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                    widgetModel
                        .updateWidget(widgetId, widget)
                        .then(function (widget){
                            res.send(widget);
                        }, function(err){
                            res.sendStatus(500).send(err);
                        });
                }, function(err){
                    res.sendStatus(500).send(err);
                });
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");///"+widgetId);
    }

};