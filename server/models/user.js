const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
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

module.exports = User;
