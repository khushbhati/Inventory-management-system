const Item = require("../models/Item");

// Add Item
exports.addItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (error) {
   console.error("ADD ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get All Items
exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// Delete Item
exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// Update Item
exports.updateItem = async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
};

// Search Item
exports.searchItem = async (req, res) => {
  const items = await Item.find({
    name: { $regex: req.query.q, $options: "i" }
  });
  res.json(items);
};

// Low Stock (<10)
exports.lowStock = async (req, res) => {
  const items = await Item.find({
    quantity: { $lt: 10 }
  });
  res.json(items);
};