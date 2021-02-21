const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')



const Comment =  sequelize.define('Comment', {
      id : {
          type : DataTypes.INTEGER.UNSIGNED,
          primaryKey : true,
          autoIncrement :true,
          allowNull : false
      },
      comment : {
            type : DataTypes.STRING
      }
})


module.exports = Comment