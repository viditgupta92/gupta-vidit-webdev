module.exports = function (app, model) {
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid", findWebsiteByUser);
    app.delete("/api/website/:wid", deleteWebsite);
    app.put("/api/website/:wid", updateWebsite);
    app.get("/api/website/:wid", findWebsiteById);

    var websiteModel = model.websiteModel;
    var userModel = model.userModel;

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites){
                res.send(websites);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function createWebsite(req, res) {
        var userId = req.params.uid;
        var newWebsite = req.body;
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(function (website){
                userModel
                    .addWebsite(userId, website._doc._id)
                    .then(function (user){
                        res.send(user);
                    }, function(err){
                        res.sendStatus(500).send(err);
                    });
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findWebsiteByUser(req, res) {
        var userId = req.params.uid;
        for(var w in websites){
            if(websites[w].developerId === userId){
                return angular.copy(websites[w]);
            }
        }
        return null;
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (status){
                res.send(status);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(function (status){
                res.send(status);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params.wid;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website){
                res.send(website);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }
};