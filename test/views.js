import {GreenlightResponses} from "../build/lib/module.js"
import {GreenlightAuth} from '../build/lib/module.js'

/* Write your code here */
const Views={
    RenderViewTest: async  (Request,Response,Models)=>{
        return GreenlightResponses.Render(Response,Request.params,'index.html')
    },

    PTextViewTest: async (Request,Response,Models)=>{
        return GreenlightResponses.Plaintext(Response,"Plaintext");
    },

    JSONViewTest: async (Request,Response,Models)=>{
        return GreenlightResponses.JSON(Response,{TEST:'TEST'});
    },

    SignupView: async(Request,Response, Models)=>{
        GreenlightAuth.signup(Models.User,Request.body.username,Request.body.firstName,Request.body.password)
        return GreenlightResponses.Redirect(Response,'/plaintext')
    },
    SignupFormView: async(Request,Response, Models)=>{
        return GreenlightResponses.Render(Response,{},'signup.html')
    }
}
export default Views;