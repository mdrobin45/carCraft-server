const express = require("express");
const getAllCars = require("../../middlewares/cars/getAllCars");
const addNewCar = require("../../middlewares/cars/addNewCar");
const getSingleCar = require("../../middlewares/cars/getSingleCar");
const updateCar = require("../../middlewares/cars/updateCar");
const deleteCar = require("../../middlewares/cars/deleteSingleCar");
const router = express.Router();

const cars = (client) => {
   const database = client.db("CarCraft");
   const cars = database.collection("cars");

   // Get all cars
   router.get("/", (req, res) => {
      getAllCars(req, res, cars);
   });

   // Get single
   router.get("/:id", (req, res) => {
      getSingleCar(req, res, cars);
   });

   // Add new car
   router.post("/", (req, res) => {
      addNewCar(req, res, cars);
   });

   // Update car details
   router.put("/:id", (req, res) => {
      updateCar(req, res, cars);
   });

   // Delete car
   router.delete("/:id", (req, res) => {
      deleteCar(req, res, cars);
   });

   return router;
};
module.exports = cars;
