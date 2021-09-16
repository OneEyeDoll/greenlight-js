class GreenlightResponses{

    //Static class that offers utilities to return more easily responses

    //Render function for render routes
    static  Render(Response,ctx:{},template_name:string) {
        Response.header("Content-Type", "text/html");
        return {isRender:1,ctx:ctx,template_name:template_name}
    }

    static Redirect(Response,Redirect:string){
        Response.redirect(Redirect);
        return null;
    }
    static JSON(Response,Ctx){
        Response.header("Content-Type", "application/json");
        Response.end(JSON.stringify(Ctx));

    }
    static Plaintext(Response,Message:string){
        Response.header("Content-Type", "text/plain");
        Response.end(Message);

    }

}

export default GreenlightResponses;
