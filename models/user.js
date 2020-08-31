'use strict';
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
      User.hasMany(models.Todo);
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING, 
      validate:{
        allowNull: {args: false, msg: "Email cannot be empty."}, 
        unique: {args: true, msg:"This email is already used."}, 
        isEmail: {args: true, msg:"Input must be in email format."}}},
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};