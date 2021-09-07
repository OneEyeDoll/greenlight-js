import {GreenlightRouter} from "greenlight"

/* Write your code here */
const Views={
   RenderViewTest: async  (Request,Models)=>{

        return GreenlightRouter.Render(Request.params,'index.html')
    },

    PTextViewTest: async (Request,Models)=>{
        return "Plaintext";
    },

    JSONViewTest: async (Request,Models)=>{
        
        return {TEST:'TEST'};
    }
}
export default Views;