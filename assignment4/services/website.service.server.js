module.exports = function (app) {
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid", findWebsiteByUser);
    app.delete("/api/website/:wid", deleteWebsite);
    app.put("/api/website/:wid", updateWebsite);
    app.get("/api/website/:wid", findWebsiteById);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
    ];

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        var sites = [];
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function createWebsite(req, res) {
        var developerId = req.params.uid;
        var newWebsite = req.body;
        newWebsite.developerId = developerId;
        newWebsite._id = (new Date()).getTime().toString();
        websites.push(newWebsite);
        res.json(websites);
    }

    function findWebsiteByUser(req, res) {
        var userId = req.params.uid;
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                return angular.copy(websites[w]);
            }
        }
        return null;
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var newWebsite = req.body;
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.json(websites[w]);
                return;
            }
        }
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        var website = websites.find(function (w) {
            return w._id === websiteId;
        });
        res.json(website);
    }
};