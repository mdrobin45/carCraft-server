const express = require("express");
const getAllItems = require("../../middlewares/cars/getAllItems");
const getSingleItem = require("../../middlewares/cars/getSingleItem");
const addNewItem = require("../../middlewares/cars/addNewItem");
const updateItem = require("../../middlewares/cars/updateItem");
const deleteSingleItem = require("../../middlewares/cars/deleteSingleItem");

const router = express.Router();

const cart = (client) => {
   const database = client.db("CarCraft");
   const cart = database.collection("cart");

   // Get all cars
   router.get("/", (req, res) => {
      getAllItems(req, res, cart);
   });

   // Get single
   router.get("/:id", (req, res) => {
      getSingleItem(req, res, cart);
   });

   // Add new car
   router.post("/", (req, res) => {
      addNewItem(req, res, cart);
   });

   // Update car details
   router.put("/:id", (req, res) => {
      updateItem(req, res, cart);
   });

   // Delete car
   router.delete("/:id", (req, res) => {
      deleteSingleItem(req, res, cart);
   });

   return router;
};
module.exports = cart;
