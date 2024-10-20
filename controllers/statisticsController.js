const Transaction = require('../models/transactionModel');

// Get statistics for a given month
const getStatistics = async (req, res) => {
  const month = parseInt(req.params.month);
  const start = new Date(2023, month - 1, 1);
  const end = new Date(2023, month, 1);

  try {
    const stats = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$price' },
          soldItems: { $sum: { $cond: ['$sold', 1, 0] } },
          notSoldItems: { $sum: { $cond: ['$sold', 0, 1] } },
        },
      },
    ]);

    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getStatistics };
