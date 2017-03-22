module.exports = function(app) {

    var userModel = require('./model/user/user.model.server.js');
    var websiteModel = require('./model/website/website.model.server.js');
    var pageModel = require('./model/page/page.model.server.js');
    var widgetModel = require('./model/widget/widget.model.server.js');

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    require("./services/user.service.server.js")(app, model);
    require("./services/website.service.server.js")(app, model);
    require("./services/page.service.server.js")(app, model);
    require("./services/widget.service.server.js")(app, model);
};
