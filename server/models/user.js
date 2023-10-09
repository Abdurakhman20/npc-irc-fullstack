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
  },
  {
    timestamps: false,
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        const lastUser = await User.findOne({
          order: [["id", "DESC"]],
        });
        let lastId = 0;
        if (lastUser) {
          lastId = lastUser.id;
        }
        user.id = lastId + 1;
      },
    },
  }
);

module.exports = User;
