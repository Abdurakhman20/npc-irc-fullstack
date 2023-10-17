require("dotenv").config();
const express = require("express");
const models = require("./models/index.js");
const sequelize = require("./database/db.js");
const router = require("./routes/index.js");
const cors = require("cors");
const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

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
