var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppWebsite'}],
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppWidget'}],
    dateCreated: Date
}, {collection: 'mongoose.webapp.page'});

module.exports = pageSchema;