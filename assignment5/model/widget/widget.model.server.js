var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');
var widgetModel = mongoose.model('MongooseWebAppWidget', widgetSchema);

var pageSchema = require('../page/page.schema.server.js');
var pageModel = mongoose.model('MongooseWebAppPage', pageSchema);

var q = require('q');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
// widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;

function createWidget(pageId, widget) {
    var d = q.defer();
    widget._page = pageId;
    widgetModel
        .create(widget,function (err,new_widget)  {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(new_widget);
            }
        });
    return d.promise;
}

function findAllWidgetsForPage(pageId) {
    var d = q.defer();
    widgetModel
        .find({_page: pageId}, function (err, widgets) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(widgets);
            }
        });
    return d.promise;
}

function findWidgetById(widgetId) {
    var d = q.defer();
    widgetModel
        .findById(widgetId, function (err, widget) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(widget);
            }
        });
    return d.promise;
}

function updateWidget(widgetId, widget) {
    var d = q.defer();
    widgetModel
        .update({_id: widgetId},{$set: widget}, function (err, status) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(status);
            }
        })
    return d.promise;
}

function deleteWidget(widgetId) {
    var d = q.defer();
    widgetModel
        .remove({_id: widgetId}, function (err, status) {
            if (err) {
                d.reject(new Error(err));
            } else {
                d.resolve(status);
            }
        })
    return d.promise;
}
