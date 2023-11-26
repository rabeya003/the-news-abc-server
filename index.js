const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

const catagories = require("./Data/categoriesd.json");
app.get("/", (req, res) => {
  res.send("Dragon is running");
});

app.get("/categories", (req, res) => {
  res.send(catagories);
});

app.listen(port, () => {
  console.log(`Dragon api is running on port: ${port}`);
});
