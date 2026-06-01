import React, { useState, useEffect } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchOrders = async () => {
    const res = await fetch('http://localhost:8000/api/orders');
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const createOrder = async () => {
    const total = Number(itemPrice) * Number(quantity);
    await fetch('http://localhost:8000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableNumber: Number(tableNumber),
        items: [{ name: itemName, price: Number(itemPrice), quantity: Number(quantity) }],
        totalAmount: total
      })
    });
    setTableNumber('');
    setItemName('');
    setItemPrice('');
    setQuantity(1);
    fetchOrders();
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:8000/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  const statusColor = (status) => {
    if (status === 'pending') return '#ff9800';
    if (status === 'preparing') return '#2196f3';
    if (status === 'ready') return '#4caf50';
    if (status === 'delivered') return '#888';
  };

  return (
    <div>
      <h2>🍽️ Orders</h2>

      {/* Create Order Form */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>New Order</h3>
        <input placeholder="Table Number" value={tableNumber} onChange={e => setTableNumber(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <input placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <input placeholder="Price" value={itemPrice} onChange={e => setItemPrice(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <input placeholder="Qty" value={quantity} onChange={e => setQuantity(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd', width: '60px' }} />
        <button onClick={createOrder}
          style={{ padding: '8px 20px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Place Order
        </button>
      </div>

      {/* Orders List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        {orders.map(order => (
          <div key={order._id} style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>Table #{order.tableNumber}</h3>
            <p style={{ color: '#888', fontSize: '12px' }}>
              {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
            </p>
            <p style={{ fontWeight: 'bold' }}>Total: Rs. {order.totalAmount}</p>
            <p style={{ color: statusColor(order.status), fontWeight: 'bold' }}>● {order.status.toUpperCase()}</p>
            <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)}
              style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;