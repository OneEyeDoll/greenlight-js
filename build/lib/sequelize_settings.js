import { Sequelize } from 'sequelize';
import { BackendError, GreenlightError } from "./errors.js";
import GreenlightSettings from './settings_parser.js';
/*
The sequelize object is exported to allow user to construct new Models from it. The object depends on settings
*/
var SequelizeSettings = /** @class */ (function () {
    function SequelizeSettings(settings) {
        if (!(settings instanceof GreenlightSettings)) {
            throw new GreenlightError('The object that was passed to SequelizeSettings was not a GreenlightSettings object.', null);
        }
        this.settings = settings.settings;
        //Switching through Backend Types
        switch (this.settings.BACKEND.TYPE) {
            case 'sqlite':
                this.sqlite();
                break;
            case 'postgres':
                this.dialect();
            case 'mysql':
                this.dialect();
            case 'mssql':
                this.dialect();
            case 'mariadb':
                this.dialect();
            default:
                throw new BackendError("The Backend DIALECT is invalid.");
        }
    }
    SequelizeSettings.prototype.sqlite = function () {
        //Usage for sqlite
        if (!this.settings.BACKEND.DATABASE_PATH) {
            throw new BackendError("Please specify PATH in BACKEND.");
        }
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: this.settings.BACKEND.DATABASE_PATH, //File name
        });
    };
    SequelizeSettings.prototype.dialect = function () {
        //Check if required values exist
        if (!this.settings.BACKEND.DATABASE) {
            throw new BackendError("Please specify DATABASE in BACKEND.");
        }
        if (!this.settings.BACKEND.USERNAME) {
            throw new BackendError("Please specify USERNAME in BACKEND.");
        }
        if (!this.settings.BACKEND.PASSWORD) {
            throw new BackendError("Please specify PASSWORD in BACKEND.");
        }
        if (!this.settings.BACKEND.HOST) {
            throw new BackendError("Please specify HOST in BACKEND.");
        }
        this.sequelize = new Sequelize(this.settings.BACKEND.DATABASE, this.settings.BACKEND.USERNAME, this.settings.BACKEND.PASSWORD, {
            host: this.settings.BACKEND.HOST,
            dialect: this.settings.BACKEND.DIALECT,
        });
    };
    return SequelizeSettings;
}());
export default SequelizeSettings;
