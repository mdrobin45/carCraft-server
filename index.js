const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Initialize app
const app = express();

// Use Middleware
app.use(cors());
app.use(express.json());

// Database connection
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ywsqr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongoURI);

const run = async () => {
   try {
      await client.connect();
      console.log("Database connection successful");
   } catch (err) {
      console.log("Cannot establish database connection: ", err);
   }

   // Assign database name and collections name
   const database = client.db("CarCraft");
   const cars = database.collection("cars");
   const brands = database.collection("brands");

   // Root router
   app.get("/", (req, res) => {
      res.send("Server is running");
   });
};
run();

// Listen server
app.listen(port, () => {
   console.log(`Server is running in ${port}`);
});
