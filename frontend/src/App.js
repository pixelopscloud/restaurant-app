import React, { useState } from 'react';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Users from './pages/Login';

function App() {
  const [activePage, setActivePage] = useState('menu');

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
      {/* Header */}
      <div style={{ background: '#ff6b35', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>🍕 Restaurant Management</h1>
      </div>

      {/* Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActivePage('menu')}
          style={{ marginRight: '10px', padding: '10px 20px', background: activePage === 'menu' ? '#ff6b35' : '#ddd', color: activePage === 'menu' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          🍔 Menu
        </button>
        <button onClick={() => setActivePage('orders')}
          style={{ marginRight: '10px', padding: '10px 20px', background: activePage === 'orders' ? '#ff6b35' : '#ddd', color: activePage === 'orders' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          🍽️ Orders
        </button>
        <button onClick={() => setActivePage('users')}
          style={{ padding: '10px 20px', background: activePage === 'users' ? '#ff6b35' : '#ddd', color: activePage === 'users' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          👤 Users
        </button>
      </div>

      {/* Pages */}
      {activePage === 'menu' && <Menu />}
      {activePage === 'orders' && <Orders />}
      {activePage === 'users' && <Users />}

    </div>
  );
}

export default App;