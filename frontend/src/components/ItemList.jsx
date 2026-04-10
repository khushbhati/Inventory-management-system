import React, { useState } from "react";

function ItemList({ items, onDelete, onEdit, onSearch, onLowStock, onRefresh }) {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex gap-2 mb-4">
        <input className="border p-2 flex-1 rounded"
          placeholder="Search..."
          onChange={(e)=>setSearch(e.target.value)} />

        <button onClick={()=>onSearch(search)}
          className="bg-green-500 text-white px-3 py-2 rounded">
          Search
        </button>

        <button onClick={onLowStock}
          className="bg-yellow-500 text-white px-3 py-2 rounded">
          Low Stock
        </button>

        <button onClick={onRefresh}
          className="bg-gray-500 text-white px-3 py-2 rounded">
          All
        </button>
      </div>

      <ul>
        {items.map((item)=>(
          <li key={item._id}
            className="border p-2 mb-2 flex justify-between">
            <span>
              {item.name} | Qty: {item.quantity} | ₹{item.price}
            </span>

            <div>
              <button onClick={()=>onEdit(item)}
                className="bg-yellow-400 px-2 py-1 mr-2 rounded">
                Edit
              </button>

              <button onClick={()=>onDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;