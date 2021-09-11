import {Router} from "express"
class GreenlightRouter{
    //STILL WIP!!!
    //This class, in future, will let to create subroutes for another route. It will be used as a middleware for the Express app.
    constructor(){
        this.router=Router()
    }
    public router:Router;

    //Render function for render routes
    static  Render(ctx:{},template_name:string) {
        return {ctx:ctx,template_name:template_name}
    }



}

export default GreenlightRouter;
