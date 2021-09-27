import express from "express";
import helmet from "helmet";
import session from "express-session";
import { GreenlightError } from "./errors.js";
import { TwingEnvironment, TwingLoaderFilesystem } from "twing";
import GreenlightSettings from "./settings_parser.js";
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
        console.log("Creating a server.");
        //Validating settings
        if (!(settings instanceof GreenlightSettings)) {
            throw new GreenlightError('The object that was passed to GreenlightServer was not a GreenlightSettings object.', null);
        }
        this.settings = settings.settings;
        //Constructing expressapp object
        this.app = express();
        //Helmet will be used only in production
        if (this.settings.PRODUCTION)
            this.app.use(helmet());
        //Creating a Loader based on the TEMPLATE_DIR setting
        this.loader = new TwingLoaderFilesystem(this.settings['TEMPLATE_DIR']);
        //Instantiating Twing
        this.twing = new TwingEnvironment(this.loader);
        //Instantiating middlewares
        this.setMiddlewares();
        //Creating a session
        this.app.use(session({ secret: this.settings.SECRET //User's secret key, passed in the GreenlightSettings class
            ,
            name: 'GreenlightSession',
            saveUninitialized: true, //
        }));
    }
    //Public methods
    /**
    Method to serve static files. Call it before the serve() method. Otherwise, you can host by yourself the static files, but you'll need extra configuration.
    */
    GreenlightServer.prototype.serveStatic = function () {
        this.app.use(express.static(this.settings.STATIC_DIR));
    };
    /**
    Method to start the server.
    */
    GreenlightServer.prototype.serve = function () {
        var _this = this;
        this.port = this.settings.PORT;
        this.app.listen(this.port, function () {
            console.log("App listening on port " + _this.port + "!");
        });
    };
    /**
    Set a route to the server.
    @params {string} route - Route path
    @params {any} view - Function to process data before rendering. Equivalent of a controller
    @params {Number} request_type - The type of request, currently only POST,PUT,PATCH and Get are supported.
    */
    GreenlightServer.prototype.setRoute = function (route, view, request_type) {
        var _this = this;
        var callback = function (req, res) {
            //Context
            var ctx;
            if (typeof view == "function") //Check if the view object is a function 
                //Calling the view
                view(req, res).then(function (ctx) {
                    if (ctx) //Check if a context exists
                        if (ctx.isRender) {
                            //In case of template rendering. The view should return a dict containing template name and the context to the render function.
                            res.header("Content-Type", "text/html");
                            _this.twing.render(ctx.template_name, ctx.ctx).then(function (output) {
                                res.end(output);
                            });
                        }
                });
            else {
                //If the view is not a function, it will throw a GreenlightError.
                throw new GreenlightError("The view is not a function. It is: " + typeof view, res);
            }
        };
        //Switching through request type. It will call callback with request and response parameter
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
    //Private methods
    /**
    Sets all the middlewares that were specified in the settings
    */
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
