import {Router} from "express"
class GreenlightRouter{
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
