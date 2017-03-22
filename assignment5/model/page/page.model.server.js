var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var pageModel = mongoose.model('MongooseWebAppPage', pageSchema);
var q = require('q');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
module.exports = pageModel;


function createPage(websiteId, page) {
    var d = q.defer();
    page._website = websiteId;
    pageModel
        .create(page,function (err,new_page)  {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(new_page);
            }
        });
    return d.promise;
}

function findAllPagesForWebsite(websiteId) {
    var d = q.defer();
    pageModel
        .find({_website:websiteId},function (err, pages) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(pages);
            }
        });
    return d.promise;
}

function findPageById(pageId) {
    var d = q.defer();
    pageModel
        .findById(pageId, function (err, page) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(page);
            }
        });
    return d.promise;
}

function updatePage(pageId, page) {
    var d = q.defer();
    pageModel
        .update({_id: pageId},{$set: page}, function (err, status) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(status);
            }
        })
    return d.promise;
}

function deletePage(pageId) {
    var d = q.defer();
    pageModel
        .remove({_id: pageId}, function (err, status) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(status);
            }
        })
    return d.promise;
}

function addWidget(pageId, widgetId) {
    var d = q.defer();
    pageModel
        .findById(pageId, function (err, page) {
            if(err){
                d.reject(new Error(err));
            } else{
                page.widgets.push(widgetId);
                page.save();
                d.resolve(page);
            }
        })
    return d.promise;
}