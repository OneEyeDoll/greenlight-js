import  { Sequelize } from 'sequelize';
import {BackendError,GreenlightError} from "./errors.js";
import GreenlightSettings from './settings_parser.js';
import ISettings from "./interfaces/ISettings";

/** 
The SequelizeSettings allows developer to create models upon it. 
It contains all the needed information to run the server with the required data.
*/
class SequelizeSettings{
   private _sequelize;//sequelize property to export
   private settings: ISettings;//Settings property

   /**
    The sequelize settings object will be created upon a GreenlightSettings object.
    */
   constructor(settings: GreenlightSettings){
     if(!(settings instanceof GreenlightSettings)){
       throw new GreenlightError('The object that was passed to SequelizeSettings was not a GreenlightSettings object.',null)
     }
     this.settings = settings.settings
    //Switching through Backend Types
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
   public sequelize() { return this.sequelize; }
   private sqlite(){
     //Usage for sqlite
     if(!this.settings.BACKEND.DATABASE_PATH){
       throw new BackendError("Please specify PATH in BACKEND.")
     }
    this._sequelize = new Sequelize({//Creating sequelize instance
      dialect: 'sqlite',//Dialect setup
      storage: this.settings.BACKEND.DATABASE_PATH,//File name
    });
   }
   private dialect(){
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

     this._sequelize = new Sequelize(this.settings.BACKEND.DATABASE,this.settings.BACKEND.USERNAME,this.settings.BACKEND.PASSWORD,{
       host:this.settings.BACKEND.HOST,
       dialect:this.settings.BACKEND.TYPE,
     })
   }
   
}
export default SequelizeSettings;