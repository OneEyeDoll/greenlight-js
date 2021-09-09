import { default as Sequelize } from 'sequelize';
var DataTypes = Sequelize.DataTypes;
var GreenlightUser = /** @class */ (function () {
    function GreenlightUser() {
        this.username = {
            type: DataTypes.STRING,
            allowNull: false
        };
        // Model attributes are defined here
        this.firstName = {
            type: DataTypes.STRING,
            allowNull: false
        },
            this.lastName = {
                type: DataTypes.STRING
                // allowNull defaults to true
            };
        this.email = {
            type: DataTypes.STRING
            // allowNull defaults to true
        };
        this.password = {
            type: DataTypes.STRING,
            allowNull: false
        };
    }
    return GreenlightUser;
}());
export default GreenlightUser;
