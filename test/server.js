import {Models} from './models.js'
import Views from './views.js'
import settings from './settings.js'
import {sync_function,GreenlightServer} from "../build/lib/module.js"

sync_function(Models).then( ()=>{
    let server=new GreenlightServer(settings);
    server.setRoute('/render/:id',//Route Name
        (Request,Response)=>Views.RenderViewTest(Request,Response,Models),//View
        GreenlightServer.Responses.RENDER,//Response type
        GreenlightServer.Request_Types.GET//Request type
    );
    server.setRoute('/plaintext',//Route Name
        (Request)=>Views.PTextViewTest(Request,Models),//View
        GreenlightServer.Responses.PLAINTEXT,//Response type
        GreenlightServer.Request_Types.GET//Request type

    );
    server.setRoute('/json',//Route Name
        (Request)=>Views.JSONViewTest(Request,Models),//View
        GreenlightServer.Responses.JSON,//Response type
        GreenlightServer.Request_Types.GET//Request type

    );
    server.setRoute('/signup',//Route Name
    (Request,Response)=>Views.SignupFormView(Request,Response,Models),//View
    GreenlightServer.Responses.RENDER,//Response type
    GreenlightServer.Request_Types.GET//Request type
);
    server.setRoute('/signup',//Route Name
    (Request,Response)=>Views.SignupView(Request,Response,Models),//View
    GreenlightServer.Responses.RENDER,//Response type
    GreenlightServer.Request_Types.POST//Request type
);

    server.serveStatic();
    server.serve();
})

