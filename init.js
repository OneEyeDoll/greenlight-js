#!/usr/bin/env node

import fs from "fs"
import path from "path"

const basedir=process.argv[2];
const staticdir=path.join(basedir,'static')
const templatedirs=path.join(basedir,'templates');
const models=path.join(basedir,'models.js');
const views=path.join(basedir,"views.js")
const settings=path.join(basedir,"settings.js")
const server=path.join(basedir,"server.js")
const packagefile=path.join(basedir,"package.json")



fs.mkdirSync(basedir);
fs.mkdirSync(templatedirs);
fs.mkdirSync(staticdir);

fs.writeFileSync(models,`
import {default as Sequelize} from 'sequelize';
const DataTypes=Sequelize.DataTypes;
import settings from './settings.js'
import {SequelizeSettings} from 'greenlight-js';
//Instantiating a sequelize settings object
let sequelize_settings=new SequelizeSettings(settings);

const Models={
   User : sequelize_settings.sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }),
  //write your models here
}
export {Models};
`)
fs.writeFileSync(views,`
import {GreenlightResponses} from "greenlight-js"

/* Write your code here */
const Views={

//Write your views here

}
export default Views;
`)
fs.writeFileSync(settings,`
import path from 'path'
import { fileURLToPath } from 'url';
import {GreenlightSettings} from 'greenlight-js'

const PATH=path.dirname(fileURLToPath(import.meta.url));

let settings_array={

    //Place your settings here

    MODULE_NAME:"${process.argv[2]}",

    TEMPLATE_DIR:path.join(PATH,'templates'),

    STATIC_DIR:path.join(PATH,'static'),

    BACKEND:{'TYPE':'sqlite',
        'DATABASE_PATH':path.join(PATH,'database.db'),        
    },

    PRODUCTION:false,

    STATIC_PATH: '/static',

    //WARNING: CHANGE IT
    SECRET:'12345unsecurechangeit',

    PORT: 4000,

    MIDDLEWARES:[],
}


//Settings object setup section. Do not edit the code below

let settings=new GreenlightSettings();//Greenlight settings object

settings.setSettings(settings_array);


export default settings;

`)
fs.writeFileSync(server,`
import {Models} from './models.js'
import Views from './views.js'
import settings from './settings.js'
import {Sync,GreenlightServer} from "greenlight-js"

Sync(Models).then( ()=>{
    let server=new GreenlightServer(settings);
  
//Write your routes here

    server.serveStatic();
    server.serve();
})

`)
fs.writeFileSync(packagefile,`
{
    "type": "module"

}

`)




