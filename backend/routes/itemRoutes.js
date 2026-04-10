const express = require("express");
const router = express.Router();

const {
  addItem,
  getItems,
  deleteItem,
  updateItem,
  searchItem,
  lowStock
} = require("../controllers/itemController");

router.post("/", addItem);
router.get("/search", searchItem);   // 👈 FIRST
router.get("/lowstock", lowStock);   // 👈 FIRST
router.get("/", getItems);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;