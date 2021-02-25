const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const User =  sequelize.define('users', {
    id : {
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement :true,
        allowNull : false
    },
    username : {
        type : DataTypes.STRING,
        unique: true
    },
    email : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    imageUrl : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})


module.exports = User
