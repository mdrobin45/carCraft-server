const { ObjectId } = require("mongodb");

const deleteCar = async (req, res, collection) => {
   const userId = req.params.id;
   const query = { _id: new ObjectId(userId) };
   const result = await collection.deleteOne(query);
   if (result.deletedCount === 1) {
      res.send(result);
   } else {
      res.send({ error: "User not found!" });
   }
};

module.exports = deleteCar;
