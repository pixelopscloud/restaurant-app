const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

router.post('/', async (req, res) => {
  try {
    const item = new Menu(req.body);
    await item.save();
    res.status(201).json({ message: 'Menu item added!', item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;