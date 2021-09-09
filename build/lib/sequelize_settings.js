import { Sequelize } from 'sequelize';
import { BackendError } from "./errors.js";
/*
The sequelize object is exported to allow user to construct new Models from it. The object depends on settings
*/
var SequelizeSettings = /** @class */ (function () {
    function SequelizeSettings(settings) {
        this.settings = settings.settings;
        //Setup for SQLite
        switch (this.settings.BACKEND.TYPE) {
            case 'sqlite':
                this.sqlite();
                break;
            case 'postgres':
                this.dialect();
            case 'mysql':
                this.dialect();
            default:
                throw new BackendError("The Backend type is invalid.");
        }
    }
    SequelizeSettings.prototype.sqlite = function () {
        if (!this.settings.BACKEND.DATABASE_PATH) {
            throw new BackendError("Please specify PATH in BACKEND.");
        }
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: this.settings.BACKEND.DATABASE_PATH, //File name
        });
    };
    SequelizeSettings.prototype.dialect = function () {
        this.sequelize = new Sequelize(this.settings.BACKEND.DATABASE, this.settings.BACKEND.USERNAME, this.settings.BACKEND.PASSWORD, {
            host: this.settings.BACKEND.HOST,
            dialect: this.settings.BACKEND.DIALECT,
        });
    };
    return SequelizeSettings;
}());
export default SequelizeSettings;
