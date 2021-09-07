import {Models} from './models.js'
import Views from './views.js'
import settings from './settings.js'
import {sync_function,GreenlightServer} from "../build/module.js"

sync_function(Models).then( ()=>{
    let server=new GreenlightServer(settings);
    server.setRoute('/render/:id',//Route Name
        (Request)=>Views.RenderViewTest(Request,Models),//View
        GreenlightServer.Responses.RENDER,//Response type
        'index.html'//Template Name
    );
    server.setRoute('/plaintext',//Route Name
        (Request)=>Views.PTextViewTest(Request,Models),//View
        GreenlightServer.Responses.PLAINTEXT,//Response type
    );
    server.setRoute('/json',//Route Name
        (Request)=>Views.JSONViewTest(Request,Models),//View
        GreenlightServer.Responses.JSON,//Response type
    );
    server.serveStatic();
    server.serve();
})

