import React, { useState, useEffect } from 'react';

function Menu() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('starter');

  const fetchMenu = async () => {
    const res = await fetch('http://localhost:8000/api/menu');
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addItem = async () => {
    await fetch('http://localhost:8000/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price), category })
    });
    setName('');
    setPrice('');
    fetchMenu();
  };

  return (
    <div>
      <h2>🍔 Menu Items</h2>

      {/* Add Item Form */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>Add New Item</h3>
        <input placeholder="Item Name" value={name} onChange={e => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <select value={category} onChange={e => setCategory(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}>
          <option value="starter">Starter</option>
          <option value="main">Main</option>
          <option value="dessert">Dessert</option>
          <option value="drink">Drink</option>
        </select>
        <button onClick={addItem}
          style={{ padding: '8px 20px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Item
        </button>
      </div>

      {/* Menu List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {items.map(item => (
          <div key={item._id} style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
            <p style={{ color: '#ff6b35', fontWeight: 'bold' }}>Rs. {item.price}</p>
            <p style={{ color: '#888', fontSize: '12px' }}>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;