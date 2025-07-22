const express = require('express');
const mongoose = require('mongoose');  
const authRoutes = require('./routes/authRoutes.js'); 
const tableRoutes = require('./routes/tableRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const restaurantMiddleware = require('./middleware/restaurantMiddleware');
const cors = require('cors');
require('dotenv').config(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(restaurantMiddleware); // ✅ Apply restaurant middleware globally

// Routes
app.use('/api/auth', restaurantMiddleware,authRoutes);
app.use('/api/tables', restaurantMiddleware,tableRoutes); // ✅ Mounted correctly
app.use('/api/order',restaurantMiddleware,orderRoutes);
app.use('/api/payment',paymentRoutes);

// Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Mongo connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};
connectDB();
