var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppUser'}],
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppPage'}],
    dateCreated: Date
}, {collection: 'mongoose.webapp.website'});

module.exports = websiteSchema;