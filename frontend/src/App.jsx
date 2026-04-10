import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  const API = "http://localhost:5000/api/items";

  const [isAuth, setIsAuth] = useState(false); // ✅ login state
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // Fetch items
  const fetchItems = async () => {
    const res = await axios.get(API);
    setItems(res.data);
  };

  useEffect(() => {
    if (isAuth) {
      fetchItems();
    }
  }, [isAuth]);

  // Add or Update
  const handleSubmit = async (form) => {
    if (!form.name || !form.itemId || !form.quantity || !form.price) {
      alert("All fields required");
      return;
    }

    const data = {
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    };

    if (editItem) {
      await axios.put(`${API}/${editItem._id}`, data);
      setEditItem(null);
    } else {
      await axios.post(API, data);
    }

    fetchItems();
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchItems();
  };

  // Search
  const handleSearch = async (query) => {
    const res = await axios.get(`${API}/search?q=${query}`);
    setItems(res.data);
  };

  // Low Stock
  const handleLowStock = async () => {
    const res = await axios.get(`${API}/lowstock`);
    setItems(res.data);
  };

  // 🔐 LOGIN CONDITION
  if (!isAuth) {
    return <Login onLogin={setIsAuth} />;
  }

  return (
    <div className="container">
      <h1>Inventory Management</h1>

      <ItemForm onSubmit={handleSubmit} editItem={editItem} />

      <ItemList
        items={items}
        onDelete={handleDelete}
        onEdit={setEditItem}
        onSearch={handleSearch}
        onLowStock={handleLowStock}
        onRefresh={fetchItems}
      />
    </div>
  );
}

export default App;