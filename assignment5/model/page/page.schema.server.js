var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppWebsiteFinal'}],
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppWidgetFinal'}],
    dateCreated: Date
}, {collection: 'mongoose.webapp.page'});

module.exports = pageSchema;