const { ObjectId } = require("mongodb");

const updateItem = async (req, res, collection) => {
   const id = req.params.id;
   const newData = req.body;
   const filter = { _id: new ObjectId(id) };
   const updateDoc = { $set: newData };
   const result = await collection.updateOne(filter, updateDoc);
   res.send(result);
};

module.exports = updateItem;
