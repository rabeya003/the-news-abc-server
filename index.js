const express = require("express");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gkftdz7.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const categoriesCollection = client
      .db("dragonNews")
      .collection("categories");
    const newsCollection = client.db("dragonNews").collection("news");

    app.get("/categories", async (req, res) => {
      const category = await categoriesCollection.find().toArray();
      res.send(category);
    });
    app.get("/categories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { id: id };
      const category = await categoriesCollection.findOne(query);

      res.send(category);
    });

    app.get("/news", async (req, res) => {
      const news = await newsCollection.find().toArray();
      res.send(news);
    });
    app.get("/news/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const news = await newsCollection.findOne(query);
      res.send(news);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Dragon is running");
});
app.listen(port, () => {
  console.log(`Dragon api is running on port: ${port}`);
});
