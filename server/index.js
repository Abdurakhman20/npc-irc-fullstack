const express = require("express");

const PORT = 3030;
const app = express();

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
