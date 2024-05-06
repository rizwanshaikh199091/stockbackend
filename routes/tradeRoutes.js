// routes/tradeRoutes.js
const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

// POST /trades to create a new trade
router.post('/', async (req, res) => {
  try {
    const trade = new Trade(req.body);
    await trade.save();
    res.status(201).json(trade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /trades to retrieve all trades
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.type) filters.type = req.query.type;
    if (req.query.user_id) filters.user_id = req.query.user_id;

    const trades = await Trade.find(filters).sort('user_id');
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /trades/:id to retrieve a trade by id
router.get('/:id', async (req, res) => {
    try {
      const trade = await Trade.findOne({ id: req.params.id });
      if (!trade) {
        return res.status(404).send('ID not found');
      }
      res.status(200).json(trade);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Handle unsupported methods on /trades/:id
router.all('/:id', (req, res, next) => {
    if (req.method !== 'GET') {
        res.status(405).send('Method Not Allowed');
      } else {
        next(); 
      }
});

module.exports = router;
