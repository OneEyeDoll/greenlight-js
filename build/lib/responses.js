var GreenlightResponses = /** @class */ (function () {
    function GreenlightResponses() {
    }
    //Static class that offers utilities to return more easily responses
    /*
    Render response for a view.
    *
    * @param {Any} Response - Express' response object
    * @param {Any} ctx - The context of response, variables that will be passed to the template
    * @param {string} template_name - The name of the template to be render
    * @returns {Any} A dictionary that contains all necessary data to the rendering
    */
    GreenlightResponses.Render = function (Response, ctx, template_name) {
        Response.header("Content-Type", "text/html");
        return { isRender: 1, ctx: ctx, template_name: template_name };
    };
    /*
    Redirect response for a view.
    *
    * @param {Any} Response - Express' response object
    * @param {string} Redirect - The name of the template to be render
    * @returns {Any} Always returns null
    */
    GreenlightResponses.Redirect = function (Response, Redirect) {
        Response.redirect(Redirect);
        return null;
    };
    /*
    Json response for a view.
    *
    * @param {Any} Response - Express' response object
    * @param {Any} ctx - The Dict to be JSONized
    */
    GreenlightResponses.JSON = function (Response, ctx) {
        Response.header("Content-Type", "application/json");
        Response.end(JSON.stringify(ctx));
    };
    /*
    Plaintext response for a view.
    *
    * @param {Any} Response - Express' response object
    * @param {string} Message - The Message to be displayed
    */
    GreenlightResponses.Plaintext = function (Response, Message) {
        Response.header("Content-Type", "text/plain");
        Response.end(Message);
    };
    return GreenlightResponses;
}());
export default GreenlightResponses;
