'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class users extends Model {
    static associate(models) {
      users.hasMany(models.request_leaves, {
        foreignKey: 'userID',
      });
      users.hasMany(models.squads, {
        foreignKey: 'userID',
      });
      users.hasMany(models.request_infos, {
        foreignKey: 'userID',
      });
      users.hasMany(models.squadmembers, {
        foreignKey: 'userID',
      });
      users.belongsTo(models.companys, {
        foreignKey: 'companyID',

      });

    }
  }

 
  users.init({
    KeyID: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyID: {
      type: DataTypes.UUID, // Ensure the data type matches the primary key of the companys model
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startOfWorkday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgProfile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'users',
    timezone: '+07:00', // Thailand timezone (Asia/Bangkok)
  });

  
  return users;
};
