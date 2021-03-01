const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')



const postLikes =  sequelize.define('postLikes', {
      id : {
          type : DataTypes.INTEGER.UNSIGNED,
          primaryKey : true,
          autoIncrement :true,
          allowNull : false
      },
      likes : {
          type : DataTypes.INTEGER.UNSIGNED,
      }
})

module.exports = postLikes
