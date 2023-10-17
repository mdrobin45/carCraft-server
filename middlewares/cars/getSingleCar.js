const { ObjectId } = require("mongodb");

const getSingleCar = async (req, res, collection) => {
   const id = req.params.id;
   const query = { _id: new ObjectId(id) };
   const result = await collection.findOne(query);
   res.send(result);
};

module.exports = getSingleCar;
