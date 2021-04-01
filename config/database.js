const Sequelize = require('sequelize').Sequelize
 
const sequelize = new Sequelize("groupomania", " your username ", "your  password", {dialect : 'mysql', host : 'localhost'}) 



module.exports = sequelize
