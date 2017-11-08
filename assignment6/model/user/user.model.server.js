var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('MongooseWebAppUser', userSchema);
var q = require('q');

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

function createUser(user) {
    var d = q.defer();
    userModel
        .create(user, function (err, user) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(user);
            }
        });
    return d.promise;
}

function findUserById(userId) {
    var d = q.defer();

    userModel
        .findById(userId, function (err, user) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(user);
            }
        });

    return d.promise;
}

function findUserByUsername(username) {
    var d = q.defer();

    userModel
        .findOne({username: username}, function (err, user) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(user);
            }
        });

    return d.promise;
}

function findUserByCredentials(username, password) {
    var d = q.defer();

    userModel
        .findOne({username: username, password: password}, function (err, user) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(user);
            }
        });
    return d.promise;
}

function updateUser(userId, user) {
    var d = q.defer();

    userModel
        .update({_id: userId}, {$set: user}, function (err, status) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(status);
            }
        })
    return d.promise;
}

function deleteUser(userId) {
    var d = q.defer();
    userModel
        .remove({_id: userId}, function (err, status) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(status);
            }
        })
    return d.promise;
}

function addWebsite(userId, websiteId) {
    console.log(websiteId);
    var d = q.defer();
    userModel
        .findById(userId, function (err, user) {
            if (err) {
                d.reject(new Error(err));
            } else {
                user.websites.push(websiteId);
                user.save();
                d.resolve(user);
            }
        })
    return d.promise;
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}