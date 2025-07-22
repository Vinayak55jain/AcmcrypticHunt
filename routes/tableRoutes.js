const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController.js');

router.get('/check', tableController.getAllTables);
router.post('/book', tableController.createTable); // Will fix logic later

module.exports = router;
