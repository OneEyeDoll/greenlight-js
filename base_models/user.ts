import {default as Sequelize} from 'sequelize';
const DataTypes=Sequelize.DataTypes;

class GreenlightUser{
    public username;
    public firstName
    public lastName;
    public email;
    public password;

    constructor()
    {
        this.username= {
            type: DataTypes.STRING,
            allowNull: false
        }
        // Model attributes are defined here
        this.firstName= {
          type: DataTypes.STRING,
          allowNull: false
        },
        this.lastName= {
          type: DataTypes.STRING
          // allowNull defaults to true
        }
        this.email = {
            type: DataTypes.STRING
            // allowNull defaults to true
        }
        this.password = {
            type: DataTypes.STRING,
            allowNull: false
        }
      }


}

export default GreenlightUser;