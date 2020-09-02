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
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Title cannot be empty" },
        notEmpty: { args: true, msg: "Title cannot be empty" },
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Status cannot be empty" } }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Due Date cannot be empty" },
        notEmpty: { args: true, msg: "Title cannot be empty" },
        isFutureDate(due_date) {
          if (due_date) {
            if (due_date.getTime() < Date.now()) {
              throw new Error('Date must be a future date.')
            }
          } else {
            throw new Error('Date must not be empty')
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