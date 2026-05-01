const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/userDB')
  .then(() => console.log('User DB Connected!'))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});