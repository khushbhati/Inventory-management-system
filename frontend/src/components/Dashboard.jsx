import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const API = "http://localhost:5000/api/items";

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    itemId: "",
    quantity: "",
    price: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(API);
    setItems(res.data);

    const low = res.data.filter((i) => i.quantity < 10);
    if (low.length > 0) {
      alert("⚠️ Low stock items available!");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.itemId || !form.quantity || !form.price) {
      alert("All fields required");
      return;
    }

    const data = {
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    };

    if (editId) {
      await axios.put(`${API}/${editId}`, data);
      setEditId(null);
    } else {
      await axios.post(API, data);
    }

    setForm({ name: "", itemId: "", quantity: "", price: "" });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchItems();
  };

  const editItem = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const searchItem = async () => {
    const res = await axios.get(`${API}/search?q=${search}`);
    setItems(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Inventory Dashboard
      </h2>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-4 gap-3">
          <input className="border p-2 rounded" placeholder="Name" value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <input className="border p-2 rounded" placeholder="Item ID" value={form.itemId}
            onChange={(e)=>setForm({...form,itemId:e.target.value})}/>
          <input className="border p-2 rounded" placeholder="Quantity" value={form.quantity}
            onChange={(e)=>setForm({...form,quantity:e.target.value})}/>
          <input className="border p-2 rounded" placeholder="Price" value={form.price}
            onChange={(e)=>setForm({...form,price:e.target.value})}/>
        </div>

        <button onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4 flex gap-2">
        <input className="border p-2 flex-1 rounded"
          placeholder="Search by name"
          onChange={(e)=>setSearch(e.target.value)} />
        <button onClick={searchItem}
          className="bg-green-500 text-white px-3 py-2 rounded">
          Search
        </button>
        <button onClick={fetchItems}
          className="bg-gray-500 text-white px-3 py-2 rounded">
          All
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded text-center">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}
              className={item.quantity < 10 ? "bg-red-200" : ""}>
              <td>{item.name}</td>
              <td>{item.itemId}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>

              <td>
                <button onClick={() => editItem(item)}
                  className="bg-yellow-400 px-2 py-1 mr-2 rounded">
                  Edit
                </button>
                <button onClick={() => deleteItem(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded">
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

export default Dashboard;