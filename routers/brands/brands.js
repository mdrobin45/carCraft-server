const express = require("express");
const getAllItems = require("../../middlewares/cars/getAllItems");
const addNewItem = require("../../middlewares/cars/addNewItem");
const getSingleItem = require("../../middlewares/cars/getSingleItem");

const router = express.Router();

const brands = (client) => {
   const database = client.db("CarCraft");
   const brands = database.collection("brands");

   // Get all brand
   router.get("/", (req, res) => {
      getAllItems(req, res, brands);
   });

   // Get single brand
   router.get("/:id", (req, res) => {
      getSingleItem(req, res, brands);
   });

   // Add new brand
   router.post("/", (req, res) => {
      addNewItem(req, res, brands);
   });

   // Insert Multiple
   router.post("/many", async (req, res) => {
      const data = req.body;
      const result = await brands.insertMany(data);
      res.send(result);
   });

   return router;
};
module.exports = brands;
