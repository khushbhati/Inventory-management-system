import React, { useEffect, useState } from "react";

function ItemForm({ onSubmit, editItem }) {
  const [form, setForm] = useState({
    name: "",
    itemId: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (editItem) setForm(editItem);
  }, [editItem]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="grid grid-cols-4 gap-3">
        <input name="name" value={form.name} onChange={handleChange}
          placeholder="Name" className="border p-2 rounded" />
        <input name="itemId" value={form.itemId} onChange={handleChange}
          placeholder="Item ID" className="border p-2 rounded" />
        <input name="quantity" value={form.quantity} onChange={handleChange}
          placeholder="Quantity" className="border p-2 rounded" />
        <input name="price" value={form.price} onChange={handleChange}
          placeholder="Price" className="border p-2 rounded" />
      </div>

      <button onClick={() => onSubmit(form)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        {editItem ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default ItemForm;