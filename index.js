const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

const catagories = require("./Data/categoriesd.json");
const news = require("./Data/news.json");

app.get("/", (req, res) => {
  res.send("Dragon is running");
});

app.get("/categories", (req, res) => {
  res.send(catagories);
});
app.get("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id === 0) {
    res.send(news);
  } else {
    const selectedcategorie = news.filter(
      (n) => parseInt(n.category_id) === id
    );
    res.send(selectedcategorie);
  }
});

app.get("/news", (req, res) => {
  res.send(news);
});
app.get("/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const selectedNews = news.find((n) => parseInt(n._id) === id);
  res.send(selectedNews);
});

app.listen(port, () => {
  console.log(`Dragon api is running on port: ${port}`);
});
