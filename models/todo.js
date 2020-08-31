'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate:{allowNull: {args: false, msg: "Title cannot be empty"}}},
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate:{allowNull: {args: false, msg: "Status cannot be empty"}}},
    due_date: {
      type: DataTypes.DATE,
      validate:{
        allowNull: {args: false, msg: "Due Date cannot be empty"},
        isFutureDate(due_date){
          let newDate = new Date();
          if (due_date.now() < newDate.now()){
            throw new Error('Date must be a future date.')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};