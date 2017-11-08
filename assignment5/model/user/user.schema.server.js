var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppWebsiteFinal'}],
    dateCreated: Date,
    facebook: {
        id:    String,
        token: String
    }
},{collections: 'mongoose.webapp.user'});

module.exports = userSchema;