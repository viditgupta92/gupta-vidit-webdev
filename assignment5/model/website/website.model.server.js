var mongoose = require('mongoose');
var userSchema = require('../user/user.schema.server.js');
var userModel = mongoose.model('MongooseWebAppUser', userSchema);
var websiteSchema = require('./website.schema.server.js');
var websiteModel = mongoose.model('MongooseWebAppWebsite', websiteSchema);
var q = require('q');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    var d = q.defer();
    website._user = userId;
    websiteModel
        .create(website,function (err,new_website)  {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(new_website);
            }
        });
    return d.promise;
}

function findAllWebsitesForUser(userId) {
    var d = q.defer();
    websiteModel
        .find({_user:userId},function (err, websites) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(websites);
            }
        });
    return d.promise;
}

function findWebsiteById(websiteId) {
    var d = q.defer();
    websiteModel
        .findById(websiteId, function (err, website) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(website);
            }
        });
    return d.promise;
}

function updateWebsite(websiteId, website) {
    var d = q.defer();
    websiteModel
        .update({_id: websiteId},{$set: website}, function (err, status) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(status);
            }
        })
    return d.promise;
}

function deleteWebsite(websiteId) {
    var d = q.defer();
    websiteModel
        .remove({_id: websiteId}, function (err,status) {
            if(err) {
                d.reject(new Error(err));
            } else {
                d.resolve(status);
            }
        })
    return d.promise;
}