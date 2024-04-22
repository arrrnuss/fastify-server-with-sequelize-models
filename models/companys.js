'use strict';
const { v4: uuidv4 } = require('uuid');
const {
    Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class companys extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Ensure that models are referenced correctly
            companys.hasMany(models.departments, {
                foreignKey: 'companyId', 
            }); 

            companys.hasMany(models.users, {
                foreignKey: 'companyID', 
            });
        }

        
    }
    companys.init({
        KeyID: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: () => uuidv4(),
            primaryKey: true,
        },
         company: {
            type: DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
       
    }, {
        sequelize,
        modelName: 'companys',
        timezone: '+07:00', // Thailand timezone (Asia/Bangkok)

    });
    return companys;
};