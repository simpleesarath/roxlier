const Transaction = require('../models/transactionModel');

// Get all transactions with pagination and search
const getTransactions = async (req, res) => {
  const { search = '', page = 1, perPage = 10 } = req.query;
  const regex = new RegExp(search, 'i');

  try {
    const transactions = await Transaction.find({
      $or: [{ title: regex }, { description: regex }, { price: regex }],
    })
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add more functions for handling statistics, bar chart, etc.

module.exports = { getTransactions };
