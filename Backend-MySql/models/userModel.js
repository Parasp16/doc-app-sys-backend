const {sequelize} = require('../config/db')

const {DataTypes} = require('sequelize')


const User = sequelize.define("User", {
    id:{
        type:DataTypes.BIGINT.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(200),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING
    },
    contactNumber:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.ENUM('User','Admin','Doctor'),
        defaultValue:'User'
    },
    image: {
  type: DataTypes.STRING,
  allowNull: true
}

},{
    timestamps:true,
    tableName:"Users"
})

module.exports = User