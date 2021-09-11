import { Router } from "express";
var GreenlightRouter = /** @class */ (function () {
    //STILL WIP!!!
    //This class, in future, will let to create subroutes for another route. It will be used as a middleware for the Express app.
    function GreenlightRouter() {
        this.router = Router();
    }
    //Render function for render routes
    GreenlightRouter.Render = function (ctx, template_name) {
        return { ctx: ctx, template_name: template_name };
    };
    return GreenlightRouter;
}());
export default GreenlightRouter;
