const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController.js');

router.post('/ordering',orderController.ordering);
router.get('/checkorder',orderController.getAllorder);
router.get('/checkorder/:orderId', orderController.customerorder);
router.put('/updateorder/:orderId', orderController.updateOrder);
router.delete('/deleteorder/:orderId', orderController.deleteOrder);

module.exports=router;