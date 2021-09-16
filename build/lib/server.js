import express from "express";
import helmet from "helmet";
import session from "express-session";
import { GreenlightError } from "./errors.js";
import { TwingEnvironment, TwingLoaderFilesystem } from "twing";
//Type of requests
var Request_Types;
(function (Request_Types) {
    Request_Types[Request_Types["POST"] = 0] = "POST";
    Request_Types[Request_Types["GET"] = 1] = "GET";
    Request_Types[Request_Types["PATCH"] = 2] = "PATCH";
    Request_Types[Request_Types["DELETE"] = 3] = "DELETE";
})(Request_Types || (Request_Types = {}));
//Server class. This is the core of the framework. There are 2 important methods: serve, that starts an express server and setRoute, that allows to specify a route
var GreenlightServer = /** @class */ (function () {
    //Constructing server with settings
    function GreenlightServer(settings) {
        this.settings = settings.settings;
        this.app = express(); //Constructing app object
        if (this.settings.PRODUCTION) //Helmet will be used only in production
            this.app.use(helmet()); //Constructing helmet object to increase security of the template
        this.loader = new TwingLoaderFilesystem(this.settings['TEMPLATE_DIR']); //Creating a Loader based on the TEMPLATE_DIR setting
        this.twing = new TwingEnvironment(this.loader); //Instantiating Twing
        this.setMiddlewares(); //Instantiating middlewares
        this.app.use(session({ secret: this.settings.SECRET,
            name: 'GreenlightSession',
            saveUninitialized: true,
        }));
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
    request_type //Name of the template to render
    ) {
        var _this = this;
        var callback = function (req, res) {
            var ctx; //Context to pass to the response
            if (typeof view == "function") //Check if the view object is a function 
                view(req, res).then(function (ctx) {
                    if (ctx.isRender) {
                        //In case of template rendering. The view should return a dict containing template name and the context to the render function.
                        res.header("Content-Type", "text/html");
                        _this.twing.render(ctx.template_name, ctx.ctx).then(function (output) {
                            res.end(output);
                        });
                    }
                });
            else {
                //If not, it will throw a GreenlightError.
                throw new GreenlightError("The view is not a function. It is: " + typeof view, res);
            }
        };
        //Switching through request type
        switch (request_type) {
            case GreenlightServer.Request_Types.GET:
                this.app.get(route, function (req, res) { return callback(req, res); });
                break;
            case GreenlightServer.Request_Types.POST:
                this.app.post(route, function (req, res) { return callback(req, res); });
                break;
            case GreenlightServer.Request_Types.PATCH:
                this.app.patch(route, function (req, res) { return callback(req, res); });
                break;
            case GreenlightServer.Request_Types.DELETE:
                this.app.delete(route, function (req, res) { return callback(req, res); });
                break;
            default:
                throw new GreenlightError("The request type specified does not exist.", null);
                break;
        }
        return true;
    };
    GreenlightServer.prototype.setMiddlewares = function () {
        var middleware;
        for (var _i = 0, _a = this.settings.MIDDLEWARES; _i < _a.length; _i++) {
            middleware = _a[_i];
            this.app.use(middleware);
        }
    };
    //Enum of possible request methods
    GreenlightServer.Request_Types = Request_Types;
    return GreenlightServer;
}());
export default GreenlightServer;
