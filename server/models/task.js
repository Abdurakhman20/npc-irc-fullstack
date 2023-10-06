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
  },
  {
    timestamps: false,
  }
);

module.exports = Task;
