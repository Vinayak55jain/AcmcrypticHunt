const paymentService = require('../services/paymentService');

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const order = await paymentService.createOrder({ amount, currency, receipt });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Razorpay error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};
