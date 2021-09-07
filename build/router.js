import { Router } from "express";
var GreenlightRouter = /** @class */ (function () {
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
