import express from "express";
import helmet from "helmet";
import { GreenlightError } from "./errors.js";
import { TwingEnvironment, TwingLoaderFilesystem } from "twing";
var Responses;
(function (Responses) {
    Responses[Responses["RENDER"] = 0] = "RENDER";
    Responses[Responses["PLAINTEXT"] = 1] = "PLAINTEXT";
    Responses[Responses["JSON"] = 2] = "JSON";
})(Responses || (Responses = {}));
//Server class. This is the core of the server. There are 2 important methods: serve, that starts an express server and setRoute, that allows to specify a route
var GreenlightServer = /** @class */ (function () {
    //Constructing server with settings
    function GreenlightServer(settings) {
        this.settings = settings.settings;
        this.app = express(); //Constructing app object
        if (this.settings.PRODUCTION) //Helmet will be used only in production
            this.app.use(helmet()); //Constructing helmet object to increase security of the template
        this.loader = new TwingLoaderFilesystem(this.settings['TEMPLATE_DIR']); //Creating a Loader based on the TEMPLATE_DIR setting
        this.twing = new TwingEnvironment(this.loader); //Instantiating Twing
    }
    GreenlightServer.prototype.serveStatic = function () {
        this.app.use(express.static(this.settings.STATIC_DIR));
    };
    //function that actually serves the content
    GreenlightServer.prototype.serve = function () {
        var _this = this;
        this.port = 4000;
        this.app.listen(this.port, function () {
            console.log("App listening on port " + _this.port + "!");
        });
    };
    //Using router passed as parameter
    GreenlightServer.prototype.setRoute = function (route, //Route path
    view, //View to process data before render
    response_type, template_name //Name of the template to render
    ) {
        if (template_name === void 0) { template_name = null; }
        this.app.get(route, function (req, res) {
            var _this = this;
            var ctx; //Context to pass to the response
            if (typeof view == "function") //Check if the view object is a function 
                view(req).then(function (ctx) {
                    //Switching between response types
                    switch (response_type) {
                        //In case of template rendering. The view should return a dict containing template name and the context to the render function.
                        case GreenlightServer.Responses.RENDER:
                            res.header("Content-Type", "text/html");
                            _this.twing.render(ctx.template_name, ctx.ctx).then(function (output) {
                                res.end(output);
                            });
                            break;
                        //In case of plaintext Response. The view should return a string.
                        case GreenlightServer.Responses.PLAINTEXT:
                            res.header("Content-Type", "text/plain");
                            res.end(ctx);
                            break;
                        //In case of JSON response. The view should return a dict.
                        case GreenlightServer.Responses.JSON:
                            res.header("Content-Type", "application/json");
                            res.end(JSON.stringify(ctx));
                            break;
                        default:
                            throw new GreenlightError("The render type specified does not exist.", res);
                    }
                });
            else {
                //If not, it will throw a GreenlightError.
                throw new GreenlightError("The view is not a function. It is: " + typeof view, res);
            }
        }.bind(this));
        return true;
    };
    //Enum of possible responses. Right now, RENDER, PLAINTEXT, JSON are supported
    GreenlightServer.Responses = Responses;
    return GreenlightServer;
}());
export default GreenlightServer;
