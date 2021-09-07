import {default as Sequelize} from 'sequelize';
const DataTypes=Sequelize.DataTypes;
import settings from './settings.js'
import {SequelizeSettings} from '../build/module.js';
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
  })
}
export {Models};