'use strict';
const {
  Model
} = require('sequelize');
const {SALT} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
var randomBytes = require('randombytes');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, {
           through : 'User_Roles',
      })
    }
  }
  User.init({
    Name : {
      type :DataTypes.STRING,
      allowNull:false
    },

    email:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate : {
        isEmail:true 
      }
      },
    password: DataTypes.STRING,
    verified:{
      type : DataTypes.STRING,
      defaultValue: 0
    },
    emailtoken :{
      type:DataTypes.STRING,
      defaultValue:randomBytes(32).toString('hex'),
      allowNull:true
    },
   

  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user)=>{
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    user.password = encryptedPassword
  });
  return User;
};