const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const cars = require("./routers/cars/cars");
const { MongoClient } = require("mongodb");
const cart = require("./routers/cart/cart");
const brands = require("./routers/brands/brands");
require("dotenv").config();

// Initialize app
const app = express();

// Use Middleware
app.use(cors());
app.use(express.json());

const local =
   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3";

// Database connection
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ywsqr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(local);

const run = async () => {
   try {
      await client.connect();
      console.log("Database connection successful");
   } catch (err) {
      console.log("Cannot establish database connection: ", err);
   }

   // Root router
   app.get("/", (req, res) => {
      res.send("Server is running");
   });

   // Application routes
   app.use("/cars", cars(client));
   app.use("/cart", cart(client));
   app.use("/brands", brands(client));
};
run();

// Listen server
app.listen(port, () => {
   console.log(`Server is running in ${port}`);
});
