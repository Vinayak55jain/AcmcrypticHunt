const razorpay = require('../utils/razorpayInstance');

exports.createOrder = async ({ amount, currency = 'INR', receipt }) => {
  const options = {
    amount: amount , 
    currency,
    receipt: receipt || `rcpt_${Math.floor(Math.random() * 10000)}`,
  };

  const order = await razorpay.orders.create(options);
  return order;
};
