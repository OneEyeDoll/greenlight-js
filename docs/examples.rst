Examples
=====

Declaring a route
=====

.. code::

sync_function(Models).then( ()=>{
    let server=new GreenlightServer(settings);

    //In server.js
        server.setRoute('/render/:id',//Route Name
        (Request,Response)=>Views.RenderViewTest(Request,Response,Models),//View
        GreenlightServer.Responses.RENDER,//Response type
        GreenlightServer.Request_Types.GET//Request type
    );

    });
