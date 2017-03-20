var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppWebsite'}],
    dateCreated: Date
    },{collections: 'mongoose.webapp.user'});

module.exports = userSchema;