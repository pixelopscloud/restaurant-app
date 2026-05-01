const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

// User Service
app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
}));

// Menu Service
app.use('/api/menu', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true
}));

// Order Service
app.use('/api/orders', createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true
}));

app.listen(8000, () => {
  console.log('API Gateway running on port 8000');
});