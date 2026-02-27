import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

function App() {
  const [items, setItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    quantity: "",
    price: "",
    username: "",
    password: "",
  });

  // Fetch Items
  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  useEffect(() => {
    if (loggedIn) fetchItems();
  }, [loggedIn]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (editingId) {
      // Update
      await axios.put(`http://localhost:5000/api/items/${editingId}`, {
        name: form.name,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });
      setEditingId(null);
    } else {
      // Add
      await axios.post("http://localhost:5000/api/items", {
        id: form.id,
        name: form.name,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });
    }

    setForm({ ...form, id: "", name: "", quantity: "", price: "" });
    fetchItems();
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  // Edit
  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      ...form,
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    });
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "pass123") {
      setLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = filteredItems.filter(
    (item) => Number(item.quantity) < 10
  ).length;

  if (!loggedIn) {
    return (
      <div className="p-100 flex justify-center items-center h-screen bg-blue-400">
        <form onSubmit={handleLogin} className="bg-white p-6 shadow rounded w-120">
          <h2 className="text-xl mb-4 text-center font-bold">Login</h2>

          <input
            type="text"
            placeholder="Username"
            className="border p-2 mb-3 w-full"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-3 w-full"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

 <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
  Login
</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 font-bold">Inventory Management</h1>

      {/* Search filter */}
      <input
        type="text"
        placeholder="Search by name..."
        className="border p-2 mb-4 w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Low Stock Warning */}
      {lowStockCount > 0 && (
        <div className="bg-yellow-300 p-3 mb-4 font-semibold">
          ⚠ {lowStockCount} low-stock item(s)!
        </div>
      )}

      {/* Add & Update Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="ID"
          value={form.id}
          disabled={editingId}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          className="border p-2"
          required
        />

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-2"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2"
          required
        />

        <button className="bg-green-500 px-4">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/*Table creation*/}
      <table className="w-full border">
        <thead>
          <tr className="bg-black-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredItems.map((item) => (
            <tr
              key={item.id}
              className={Number(item.quantity) < 10 ? "bg-red-200" : ""}
            >
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>

              <td className="border p-2">
                {item.quantity}
                {Number(item.quantity) < 10 && (
                  <span className="text-red-600 font-bold ml-2">(Low)</span>
                )}
              </td>

              <td className="border p-2">{item.price}</td>

              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-black-500 px-3 py-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;