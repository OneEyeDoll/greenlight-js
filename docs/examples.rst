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


Return a Plaintext response
=====

.. code-block:: javascript
    :linenos:

    const Views={
        PTextViewTest: async (Request,Response,Models)=>{
            return "Plaintext";
        },
    }

Create a builtin User Models
=====

.. code-block:: javascript
    :linenos:
    
    import {GreenlightUser} from '.greenlight';

    //In models.js
    const Models={
        User : sequelize_settings.sequelize.define('Users',new GreenlightUser()),
    }

