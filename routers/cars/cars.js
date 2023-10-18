const express = require("express");
const getSingleItem = require("../../middlewares/cars/getSingleItem");
const addNewItem = require("../../middlewares/cars/addNewItem");
const updateItem = require("../../middlewares/cars/updateItem");
const deleteSingleItem = require("../../middlewares/cars/deleteSingleItem");
const getAllItems = require("../../middlewares/cars/getAllItems");

const router = express.Router();

const cars = (client) => {
   const database = client.db("CarCraft");
   const cars = database.collection("cars");

   // Get all cars
   router.get("/", (req, res) => {
      getAllItems(req, res, cars);
   });

   // Get single
   router.get("/:id", (req, res) => {
      getSingleItem(req, res, cars);
   });

   // Add new car
   router.post("/", (req, res) => {
      addNewItem(req, res, cars);
   });

   // Update car details
   router.put("/:id", (req, res) => {
      updateItem(req, res, cars);
   });

   // Delete car
   router.delete("/:id", (req, res) => {
      deleteSingleItem(req, res, cars);
   });

   return router;
};
module.exports = cars;
