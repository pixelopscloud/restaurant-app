import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('waiter');

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:8000/api/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    await fetch('http://localhost:8000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    setName('');
    setEmail('');
    setPassword('');
    fetchUsers();
  };

  const roleColor = (role) => {
    if (role === 'admin') return '#e74c3c';
    if (role === 'waiter') return '#2196f3';
    if (role === 'chef') return '#4caf50';
  };

  return (
    <div>
      <h2>👤 Users Management</h2>

      {/* Add User Form */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>Add New User</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}
          style={{ marginRight: '10px', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          style={{ marginRight: '10px', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
          style={{ marginRight: '10px', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <select value={role} onChange={e => setRole(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}>
          <option value="admin">Admin</option>
          <option value="waiter">Waiter</option>
          <option value="chef">Chef</option>
        </select>
        <button onClick={addUser}
          style={{ padding: '8px 20px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add User
        </button>
      </div>

      {/* Users List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {users.map(user => (
          <div key={user._id} style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>👤 {user.name}</h3>
            <p style={{ color: '#888', fontSize: '13px' }}>{user.email}</p>
            <p style={{ color: roleColor(user.role), fontWeight: 'bold', fontSize: '13px' }}>● {user.role.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;