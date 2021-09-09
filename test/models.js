import {default as Sequelize} from 'sequelize';
const DataTypes=Sequelize.DataTypes;
import settings from './settings.js'
import {SequelizeSettings,GreenlightUser} from '../build/module.js';
//Instantiating a sequelize settings object
let sequelize_settings=new SequelizeSettings(settings);

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
export {Models};