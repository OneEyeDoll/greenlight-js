import express from "express"
import helmet from "helmet"
import crypto from "crypto"
import session from "express-session"
import {GreenlightError} from "./errors.js"
import {TwingEnvironment, TwingLoaderFilesystem} from "twing"
import GreenlightSettings  from "./settings_parser";

//Type of requests
enum Request_Types{
  POST,
  GET,
  PATCH,
  DELETE
}
//Server class. This is the core of the framework. There are 2 important methods: serve, that starts an express server and setRoute, that allows to specify a route
class GreenlightServer{
    private app:express.Express;//Express Application object
    public port:Number;//Server port
    private loader:typeof TwingLoaderFilesystem;
    twing:typeof TwingEnvironment;
    private settings;
    //Enum of possible request methods
    static Request_Types=Request_Types;
    //Constructing server with settings
    constructor(settings:GreenlightSettings){
        this.settings=settings.settings;
        this.app=express();//Constructing app object
        if (this.settings.PRODUCTION)//Helmet will be used only in production
          this.app.use(helmet());//Constructing helmet object to increase security of the template
        this.loader = new TwingLoaderFilesystem(this.settings['TEMPLATE_DIR']);//Creating a Loader based on the TEMPLATE_DIR setting
        this.twing = new TwingEnvironment(this.loader);//Instantiating Twing
        this.setMiddlewares();//Instantiating middlewares
        this.app.use(session({secret:this.settings.SECRET
    ,name:'GreenlightSession',
    saveUninitialized:true,
    })
    )
    }
    serveStatic(){
      this.app.use(express.static(this.settings.STATIC_DIR))
    }
    //function that actually serves the content
    serve():void{
        this.port=4000;
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}!`)
          });
    }
    //Using router passed as parameter
    setRoute(route:string,//Route path
      view:any,//View to process data before render
      request_type:Number//Name of the template to render
      )
      :Boolean{
        let callback=(req, res) => {
            let ctx:any;//Context to pass to the response
            if(typeof view=="function") //Check if the view object is a function 
              view(req,res).then((ctx)=>{
              if(ctx)
                if(ctx.isRender){
                      //In case of template rendering. The view should return a dict containing template name and the context to the render function.
                        res.header("Content-Type", "text/html");
                        this.twing.render(ctx.template_name, ctx.ctx).then((output) => {
                          res.end(output);
                        });
                    }
              })
            else{
              //If not, it will throw a GreenlightError.
              throw new GreenlightError(`The view is not a function. It is: ${typeof view}`,res)
            }
          }
        //Switching through request type
        switch(request_type){
          case GreenlightServer.Request_Types.GET:
            this.app.get(route, (req,res)=>callback(req,res));
              break;
          case GreenlightServer.Request_Types.POST:
            this.app.post(route, (req,res)=>callback(req,res));
            break;
          case GreenlightServer.Request_Types.PATCH:
              this.app.patch(route, (req,res)=>callback(req,res));
              break;
          case GreenlightServer.Request_Types.DELETE:
            this.app.delete(route, (req,res)=>callback(req,res));
            break;
        default:
            throw new GreenlightError("The request type specified does not exist.",null);
            break;
        }
      return true;

    }

    private setMiddlewares(){
      let middleware:()=>any;
      for(middleware of this.settings.MIDDLEWARES){
        this.app.use(middleware);
      }
    }

}
export default GreenlightServer;
