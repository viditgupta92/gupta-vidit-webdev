module.exports = function(app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:uid", deleteUser);

    var userModel = model.userModel;

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password){
            findUserByCredentials(req,res);
        }
        else if(username){
            findUserByUsername(req,res);
        }
    }
    
    function findUserByUsername(req,res) {
        userModel
            .findUserByUsername(req.body)
            .then(function (user){
                res.send(user);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (user){
                res.send(user);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findUserById(req, res){
        var userId = req.params.uid;
        userModel
            .findUserById(userId)
            .then(function (user){
                res.send(user);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.uid;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function (status){
                res.send(status);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }
    
    function createUser(req,res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function (user){
                res.send(user);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req,res) {
        var userId = req.params.uid;
        userModel
            .deleteUser(userId)
            .then(function (status){
                res.send(status);
            }, function(err){
                console.log(err);
                res.sendStatus(500).send(err);
            });
    }

};