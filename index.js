const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const cars = require("./routers/cars/cars");
const { MongoClient } = require("mongodb");
const cart = require("./routers/cart/cart");
const brands = require("./routers/brands/brands");
const advertisement = require("./routers/advertisement/advertisement");
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
      // Root router
      app.get("/", (req, res) => {
         res.send("Server is running");
      });

      // Application routes
      app.use("/cars", cars(client));
      app.use("/cart", cart(client));
      app.use("/brands", brands(client));
      app.use("/advertisement", advertisement(client));
   } catch (err) {
      console.log(err);
   }
};
run();

// Listen server
app.listen(port, () => {
   console.log(`Server is running in ${port}`);
});
