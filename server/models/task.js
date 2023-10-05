const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

const Task = sequelize.define(
  "task",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    hooks: {
      beforeCreate: (task, options) => {
        task.createdAt = sequelize.literal("CURRENT_TIMESTAMP");
        task.updatedAt = sequelize.literal("CURRENT_TIMESTAMP");
      },
      beforeUpdate: (task, options) => {
        task.updatedAt = sequelize.literal("CURRENT_TIMESTAMP");
      },
    },
  }
);

module.exports = Task;
