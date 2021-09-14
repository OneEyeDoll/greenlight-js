import {GreenlightRouter} from "../build/lib/module.js"
import {GreenlightAuth} from '../build/lib/module.js'

/* Write your code here */
const Views={
    RenderViewTest: async  (Request,Response,Models)=>{
        let user=Models.User.build({username:'myusername',firstName:'pluto',password:'paperino'});
        user.save()
        GreenlightAuth.login(Request,'pippo','pluto',Models.User)
        Response.cookie('name', 'value', {expire: 360000 + Date.now()})
        return GreenlightRouter.Render(Request.params,'index.html')
    },

    PTextViewTest: async (Request,Response,Models)=>{
        return "Plaintext";
    },

    JSONViewTest: async (Request,Response,Models)=>{
        
        return {TEST:'TEST'};
    },

    SignupView: async(Request,Response, Models)=>{
        GreenlightAuth.signup(Models.User,Request.body.username,Request.body.firstName,Request.body.password)
        return GreenlightRouter.Redirect(Response,'/plaintext')
    },
    SignupFormView: async(Request,Response, Models)=>{
        return GreenlightRouter.Render({},'signup.html')
    }
}
export default Views;