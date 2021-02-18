const Sequelize = require('sequelize').Sequelize

const sequelize = new Sequelize("groupomania", "root", "Bejaia06,12", {dialect : 'mysql', host : 'localhost'}) 



module.exports = sequelize
