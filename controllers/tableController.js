const tableService = require('../services/tableService');
exports.getAllTables = async (req, res) => {
    try{
        const tables= await tableService.getAlltables(req.body);
        res.status(200).json(tables);
    }
    catch(error){
        console.error('Error fetching tables:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createTable = async (req, res) => {
    try{
        const customer= await tableService.createTable(req.body);
        res.status(201).json({
            message: 'Table created successfully',
            customer
        }); 
    }
    catch(error){
        console.error('Error creating table:', error.message);
        res.status(400).json({ message: error.message });
    }
};