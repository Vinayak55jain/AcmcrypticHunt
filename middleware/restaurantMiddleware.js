// middleware/restaurantMiddleware.js
const Restaurant = require('../model/restaurant'); // Adjust path as needed

module.exports = async (req, res, next) => {
  try {
    const restaurantName = req.header('x-restaurant-name') || req.body.restaurantName || req.query.restaurantName;

    if (!restaurantName) {
      return res.status(400).json({ message: 'Missing restaurant name' });
    }

    const restaurant = await Restaurant.findOne({ name: restaurantName });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    req.restaurantName = restaurantName;
    next();
  } catch (error) {
    console.error('Restaurant middleware error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
