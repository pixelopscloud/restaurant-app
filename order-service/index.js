const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/orderDB')
  .then(() => console.log('Order DB Connected!'))
  .catch(err => console.log(err));

app.use('/api/orders', orderRoutes);

app.listen(3003, () => {
  console.log('Order Service running on port 3003');
});