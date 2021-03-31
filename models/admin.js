const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const Admin =  sequelize.define('admin', {
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
    }
})


module.exports = Admin
