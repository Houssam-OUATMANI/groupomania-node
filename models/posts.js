const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const Post =  sequelize.define('post', {
    id : {
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement :true,
        allowNull : false
    },
    title : {
        type : DataTypes.STRING,
    },
    detail : {
        type : DataTypes.STRING,
    },
    imageUrl : {
        type : DataTypes.STRING,
    },
    likes :{
      type : DataTypes.INTEGER,
      defaultValue : 0,
    },
    dislikes : {
      type : DataTypes.INTEGER,
      defaultValue : 0,
    }
})


module.exports = Post
