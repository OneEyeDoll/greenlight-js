var GreenlightResponses = /** @class */ (function () {
    function GreenlightResponses() {
    }
    //Static class that offers utilities to return more easily responses
    //Render function for render routes
    GreenlightResponses.Render = function (Response, ctx, template_name) {
        Response.header("Content-Type", "text/html");
        return { isRender: 1, ctx: ctx, template_name: template_name };
    };
    GreenlightResponses.Redirect = function (Response, Redirect) {
        Response.redirect(Redirect);
        return null;
    };
    GreenlightResponses.JSON = function (Response, Ctx) {
        Response.header("Content-Type", "application/json");
        Response.end(JSON.stringify(Ctx));
    };
    GreenlightResponses.Plaintext = function (Response, Message) {
        Response.header("Content-Type", "text/plain");
        Response.end(Message);
    };
    return GreenlightResponses;
}());
export default GreenlightResponses;
