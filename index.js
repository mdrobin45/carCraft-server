const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const { MongoClient } = require("mongodb");
const getAllCars = require("./middlewares/cars/getAllCars");
const getSingleCar = require("./middlewares/cars/getSingleCar");
const addNewCar = require("./middlewares/cars/addNewCar");
const updateCar = require("./middlewares/cars/updateCar");
const deleteCar = require("./middlewares/cars/deleteSingleCar");
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

   // Get all cars
   app.get("/cars", (req, res) => {
      getAllCars(req, res, cars);
   });

   // Get single
   app.get("/cars/:id", (req, res) => {
      getSingleCar(req, res, cars);
   });

   // Add new car
   app.post("/cars", (req, res) => {
      addNewCar(req, res, cars);
   });

   // Update car details
   app.put("/cars/:id", (req, res) => {
      updateCar(req, res, cars);
   });

   // Delete car
   app.delete("/cars/:id", (req, res) => {
      deleteCar(req, res, cars);
   });
};
run();

// Listen server
app.listen(port, () => {
   console.log(`Server is running in ${port}`);
});
