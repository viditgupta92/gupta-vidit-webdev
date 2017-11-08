var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppUserFinal'}],
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppPageFinal'}],
    dateCreated: Date
}, {collection: 'mongoose.webapp.website'});

module.exports = websiteSchema;