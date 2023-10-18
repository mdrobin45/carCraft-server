const express = require("express");
const getAllItems = require("../../middlewares/cars/getAllItems");
const addNewItem = require("../../middlewares/cars/addNewItem");

const router = express.Router();

const brands = (client) => {
   const database = client.db("CarCraft");
   const brands = database.collection("brands");

   // Get all brand
   router.get("/", (req, res) => {
      getAllItems(req, res, brands);
   });

   // Add new brand
   router.post("/", (req, res) => {
      addNewItem(req, res, brands);
   });

   return router;
};
module.exports = brands;
