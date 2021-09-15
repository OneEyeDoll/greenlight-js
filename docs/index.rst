Welcome
------
Welcome to Greenlight.js documentation!
=====

Hello, welcome to the Greenlight.js documentation. This is a MVC framework for Node.js, strongly inspired by the Python's Django Framework. Our main goal is to let you waste less time writing code and focus on your application's logic. This framework is designed to let you write complex apps in less time possible.

What to expect from this framework
=====

* A secure environment
* A wonderful developer experience
* A growing project, currently mantained
* A framework that is meant to simplify your life
* Scalability and efficiency
* A template system based 

Examples
------

Declaring a route
=====

.. code-block:: javascript
    :linenos:
    
    //In server.js
        server.setRoute('/render/:id',//Route Name
        (Request,Response)=>Views.RenderViewTest(Request,Response,Models),//View
        GreenlightServer.Responses.RENDER,//Response type
        GreenlightServer.Request_Types.GET//Request type
    );

Rendering a template
=====

.. code-block:: javascript
    :linenos:
    
    //In views.js, inside the Views associative array
    RenderViewTest: async  (Request,Response,Models)=>{
        return GreenlightRouter.Render(Request.params,'index.html')
    },
