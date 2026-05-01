const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/menuDB')
  .then(() => console.log('Menu DB Connected!'))
  .catch(err => console.log(err));

app.use('/api/menu', menuRoutes);

app.listen(3002, () => {
  console.log('Menu Service running on port 3002');
});