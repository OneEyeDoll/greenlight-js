Welcome
------
Welcome to Greenlight.js documentation!
=====

Hello, welcome to the Greenlight.js documentation. This is a MVC framework for Node.js, strongly inspired by the Python's Django Framework. We use Express as main server, with several abstraction to speed up the coding process.Our main goal is to let you waste less time writing code and focus on your application's logic. This framework is designed to let you write complex apps in less time possible. We call "Views" what others call "Controllers", because we are following Django's philosophy.

What to expect from this framework
=====

* A secure environment
* A wonderful developer experience
* A growing project, currently mantained
* A framework that is meant to simplify your life
* Scalability and efficiency
* A template system based on Twig, named Twing

Examples
------

Declaring a route
=====

.. code-block:: javascript
    :linenos:

    sync_function(Models).then( ()=>{
    let server=new GreenlightServer(settings);

    ...
    //In server.js
        server.setRoute('/render/:id',//Route Name
        (Request,Response)=>Views.RenderViewTest(Request,Response,Models),//View
        GreenlightServer.Responses.RENDER,//Response type
        GreenlightServer.Request_Types.GET//Request type
    );

    });

Rendering a template
=====

.. code-block:: javascript
    :linenos:

    const Views={

        //In views.js
        RenderViewTest: async  (Request,Response,Models)=>{
            return GreenlightRouter.Render(Request.params,'index.html')
        },
    }

Return a JSON response
=====

.. code-block:: javascript
    :linenos:

    const Views={
        JSONViewTest: async (Request,Response,Models)=>{
        
            return {TEST:'TEST'};
        },
    }

Add a Middleware to Express server.
