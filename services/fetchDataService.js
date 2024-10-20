const axios = require('axios');
const Transaction = require('../models/transactionModel');

const fetchAndSeedData = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Seed data to the database
    await Transaction.insertMany(transactions);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error fetching and seeding data:', error);
  }
};

module.exports = fetchAndSeedData;

