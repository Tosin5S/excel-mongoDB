const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Transaction = mongoose.model('Transaction', transactionsSchema);

module.exports = Transaction;
