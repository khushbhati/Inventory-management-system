const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database("inventory.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Table Creation
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    name TEXT,
    quantity INTEGER,
    price INTEGER
  )
`);

// GET
app.get("/api/items", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// POST
app.post("/api/items", (req, res) => {
  const { id, name, quantity, price } = req.body;

  db.run(
    "INSERT INTO items (id, name, quantity, price) VALUES (?, ?, ?, ?)",
    [id, name, quantity, price],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Item added successfully" });
    }
  );
});

// PUT (UPDATE)
app.put("/api/items/:id", (req, res) => {
  const { name, quantity, price } = req.body;

  db.run(
    "UPDATE items SET name = ?, quantity = ?, price = ? WHERE id = ?",
    [name, quantity, price, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      if (this.changes === 0) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.json({ message: "Item updated successfully" });
    }
  );
});

// DELETE
app.delete("/api/items/:id", (req, res) => {
  db.run("DELETE FROM items WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Item deleted successfully" });
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});