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
* A Sequelize compatible orm

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

Reference
------

GreenlightAuth
=======

.. code-block:: javascript
    :linenos:

    static async login(Request,User,Username:string,Password:string,) {

Requires a Express' request object, a Greenlight builtin User object, an username and a *plaintext* password.
This method will add authentication to the current Request.
You can access the authentication with (RequestObject).session.loggedIn.

.. code-block:: javascript
    :linenos:

    static logout(Request)

Requires a Express' request object. It will log out the current user.

.. code-block:: javascript
    :linenos:

    static signup(User,Username:string,firstName:string,Password:string,lastName:string="",Email:string=""){

Requires a Greenlight builtin User object, an Username, a first Name and a password. It can be optionally provided with a last name and an email. It creates a new User object in the database, with the supplied data.


Sync
======
.. code-block:: javascript
    :linenos:

    async Sync (Ctx)

A function that requires all models in the Database. It will sync the Database with Sequelize.

GreenlightResponses
======
.. code-block:: javascript
    :linenos:

    static  Render(Response,ctx:{},template_name:string)

Requires an Express' response, a context with the data to be passed to the template, and a template name. This method, when used in a view, will render a template.

.. code-block:: javascript
    :linenos:

    static Redirect(Response,Redirect:string)

Requires an Express' response, and a redirect URI. When used in a view, it will redirect to a callback URI.

.. code-block:: javascript
    :linenos:

    static JSON(Response,Ctx)

Requires an Express' response, and a dict that will be JSONized. When used in a view, it will return as response a JSON encoded string, that contains the data that will be displayed.

.. code-block:: javascript
    :linenos:

    static Plaintext(Response,Message:string)

Requires an Express' response, and a plaintext message. When used in a view, it will return a plaintext message.

GreenlightSettings
=======

.. code-block:: javascript
    :linenos:

    setSettings(modulesettings)

Requires a dictionary that contains all app's settings.

SequelizeSettings
=======

.. code-block:: javascript
    :linenos:

    constructor(settings)

Requires a GreenlightSettings object.


