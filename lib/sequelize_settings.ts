import  { Sequelize } from 'sequelize';
import {BackendError} from "./errors.js"

/*
The sequelize object is exported to allow user to construct new Models from it. The object depends on settings
*/
class SequelizeSettings{
   public sequelize;//sequelize property to export
   private settings;//Settings property
   constructor(settings){
     this.settings=settings.settings
    //Setup for SQLite
    switch(this.settings.BACKEND.TYPE){
      case 'sqlite': 
        this.sqlite()
        break;
      case 'postgres':
        this.dialect()
      case 'mysql':
        this.dialect();
      case 'mssql':
        this.dialect();
      case 'mariadb':
        this.dialect()
      default:
         throw new BackendError("The Backend DIALECT is invalid.");
    }
      
   }
   sqlite(){
     //Usage for sqlite
     if(!this.settings.BACKEND.DATABASE_PATH){
       throw new BackendError("Please specify PATH in BACKEND.")
     }
    this.sequelize = new Sequelize({//Creating sequelize instance
      dialect: 'sqlite',//Dialect setup
      storage: this.settings.BACKEND.DATABASE_PATH,//File name
    });
   }
   dialect(){
    //Check if required values exist
     if(!this.settings.BACKEND.DATABASE){
      throw new BackendError("Please specify DATABASE in BACKEND.")
    }
    if(!this.settings.BACKEND.USERNAME){
      throw new BackendError("Please specify USERNAME in BACKEND.")
    }
    if(!this.settings.BACKEND.PASSWORD){
      throw new BackendError("Please specify PASSWORD in BACKEND.")
    }
    if(!this.settings.BACKEND.HOST){
      throw new BackendError("Please specify HOST in BACKEND.")
    }

     this.sequelize = new Sequelize(this.settings.BACKEND.DATABASE,this.settings.BACKEND.USERNAME,this.settings.BACKEND.PASSWORD,{
       host:this.settings.BACKEND.HOST,
       dialect:this.settings.BACKEND.DIALECT,
     })
   }
   
}
export default SequelizeSettings;