var mongoose = require('mongoose');
var widgetSchema = mongoose.Schema({
    _page: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebAppPage'}],
    index: Number,
    type: String,
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: Date
}, {collection: 'mongoose.webapp.widget'});

module.exports = widgetSchema;