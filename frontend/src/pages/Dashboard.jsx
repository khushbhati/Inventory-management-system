import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    quantity: "",
    price: ""
  });

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/items", form);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory Dashboard</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2 mb-6">
        <input placeholder="ID" className="border p-2"
          onChange={(e)=>setForm({...form,id:e.target.value})}/>
        <input placeholder="Name" className="border p-2"
          onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Quantity" className="border p-2"
          onChange={(e)=>setForm({...form,quantity:e.target.value})}/>
        <input placeholder="Price" className="border p-2"
          onChange={(e)=>setForm({...form,price:e.target.value})}/>
        <button className="bg-green-500 text-white p-2 col-span-4">
          Add Item
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>ID</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}
              className={item.quantity < 10 ? "bg-red-200" : ""}
            >
              <td>{item.name}</td>
              <td>{item.id}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={()=>handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded">
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