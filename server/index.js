require("dotenv").config();
const express = require("express");
const models = require("./models/index.js");
const sequelize = require("./database/db.js");
const PORT = process.env.PORT || 3030;
const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
