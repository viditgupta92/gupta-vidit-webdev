module.exports = function (app, model) {
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.post("/api/website/:websiteId/page", createPage);
    app.delete("/api/page/:pageId", deletePage);

    var websiteModel = model.websiteModel;
    var pageModel = model.pageModel;

    function createPage(req,res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        pageModel
            .createPage(websiteId, page)
            .then(function (page){
                websiteModel
                    .addPage(websiteId, page._doc._id)
                    .then(function (website){
                        res.send(website);
                    }, function(err){
                        res.sendStatus(500).send(err);
                    });
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages){
                res.send(pages);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page){
                res.send(page);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        pageModel
            .updatePage(pageId, page)
            .then(function (status){
                res.send(status);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (status){
                res.send(status);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }
};