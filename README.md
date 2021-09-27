![npm](https://img.shields.io/npm/v/greenlight-js)
# Greenlight.js
MVT framework for NodeJS.

This project is focused to bring a valid alternative to Django in NodeJS. The project relies on ExpressJS. This project's goals are semplicity, easy to use and scalability. Also, since we took inspiration from Django Project, we decided to name our architecture "MVT", instead of MVC, like Django does. Also, we encourage modern JavaScript, so all imports are done through ES6 syntax. We support also TypeScript, and the project was fully written with it. We use the [Twing](https://github.com/NightlyCommit/twing) template engine, and [Sequelize](https://sequelize.org/) ORM.

Check the documentation [here](https://greenlight.oneeyedoll.tech/).

# Examples

Check the examples folder to see some dummy code to begin with.

# Usage

First, create a project with 

```
npx greenlight (PROJECT_NAME)
```

then, add your views in views.js.

```
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
```

You can specify your Models in the models.js file

```
const Models={
    User : sequelize_settings.sequelize.define('Users',new GreenlightUser()),
   UserNew : sequelize_settings.sequelize.define('UsersNew', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  })
}
```

You can specify your routes in server.js

```
    server.setRoute('/render/:id',//Route Name
        (Request,Response)=>Views.RenderViewTest(Request,Response,Models),//View
        GreenlightServer.Request_Types.GET//Request type
    );
    server.setRoute('/plaintext',//Route Name
        (Request,Response)=>Views.PTextViewTest(Request,Response,Models),//View
        GreenlightServer.Request_Types.GET//Request type

    );
    server.setRoute('/json',//Route Name
        (Request,Response)=>Views.JSONViewTest(Request,Response,Models),//View
        GreenlightServer.Request_Types.GET//Request type

    );
    server.setRoute('/signup',//Route Name
    (Request,Response)=>Views.SignupFormView(Request,Response,Models),//View
    GreenlightServer.Request_Types.GET//Request type
);
    server.setRoute('/signup',//Route Name
    (Request,Response)=>Views.SignupView(Request,Response,Models),//View
    GreenlightServer.Request_Types.POST//Request type
);

```

And then, to test it, run

```
node server.js
```



