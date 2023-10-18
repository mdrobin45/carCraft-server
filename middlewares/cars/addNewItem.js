const addNewItem = async (req, res, collection) => {
   const data = req.body;
   const result = await collection.insertOne(data);
   res.send(result);
};

module.exports = addNewItem;
