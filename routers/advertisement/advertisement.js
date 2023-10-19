const express = require("express");
const getAllItems = require("../../middlewares/cars/getAllItems");
const getSingleItem = require("../../middlewares/cars/getSingleItem");
const addNewItem = require("../../middlewares/cars/addNewItem");
const updateItem = require("../../middlewares/cars/updateItem");
const deleteSingleItem = require("../../middlewares/cars/deleteSingleItem");

const router = express.Router();

const advertisement = (client) => {
   const database = client.db("CarCraft");
   const advertisement = database.collection("advertisement");

   // Get all cars
   router.get("/", (req, res) => {
      getAllItems(req, res, advertisement);
   });

   // Get single
   router.get("/:id", (req, res) => {
      getSingleItem(req, res, advertisement);
   });

   // Add new car
   router.post("/", (req, res) => {
      addNewItem(req, res, advertisement);
   });

   // Insert Multiple
   router.post("/many", async (req, res) => {
      const data = req.body;
      const result = await advertisement.insertMany(data);
      res.send(result);
   });

   // Update car details
   router.put("/:id", (req, res) => {
      updateItem(req, res, advertisement);
   });

   // Delete car
   router.delete("/:id", (req, res) => {
      deleteSingleItem(req, res, advertisement);
   });

   return router;
};
module.exports = advertisement;
