// models/Trade.js
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true, index: true }, // Adding custom ID
    type: { type: String, required: true, enum: ['buy', 'sell'] },
  user_id: { type: Number, required: true },
  symbol: { type: String, required: true },
  shares: { type: Number, required: true, min: 10, max: 30 },
  price: { type: Number, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('Trade', tradeSchema);
