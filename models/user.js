'use strict';
const { user } = require('pg/lib/defaults');
const { hashPassword } = require('../helpers/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [[3,12]],
          msg: 'Username length must be between 3-12 characters!'
        },
        notNull: {
          msg: 'Username is required!'
        },
        notEmpty: {
          msg: 'Username is required!'
        }
      }},
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [[8,12]],
          msg: 'Password length must be between 8-12 characters!'
        },
        notNull: {
          msg: 'Password is required!'
        },
        notEmpty: {
          msg: 'Password is required!'
        }
      }},
    role: {
      type: DataTypes.STRING,
      validate:{
        isIn: {
          args: [['admin', 'superadmin']],
          msg: 'Invalid role'
        }
      }}
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeValidate', (user)=> {
    user.role = user.role.toLowerCase()
  })

  User.addHook('beforeCreate', (user) => {
    user.userName = user.userName.toLowerCase()
    user.password = hashPassword(user.password)
  })
  return User;
};