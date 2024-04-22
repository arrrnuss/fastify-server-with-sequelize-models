// db.js
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./models/users');
const companys = require('./models/companys')


const sequelize = new Sequelize('your_table', 'root', '', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql',
  timezone: '+07:00', // Thailand timezone (Asia/Bangkok)
  
});



const models = {
  users: users(sequelize, DataTypes),
  companys: companys(sequelize,DataTypes),



  // Add other models here...
};


// Define associations
models.companys.hasMany(models.users,{
  foreignKey: 'companyID', 
  as:'companys_users'
});
models.users.belongsTo(models.companys,{
  foreignKey: 'companyID', 
  as:'companys_users'
});





module.exports = { sequelize, models };
