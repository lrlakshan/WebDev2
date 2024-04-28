const express = require('express');
const SandwichController = require('../controllers/sandwichController');
const router = express.Router();
const { authenticateAdmin, authenticateCustomer, authenticateBoth } = require('../middleware/authMiddleware');

// POST endpoint to add a new sandwich
router.post('/sandwich', authenticateAdmin, SandwichController.saveSandwich);
router.get('/sandwich', authenticateBoth, SandwichController.getAllSandwiches);
router.get('/sandwich/:id', authenticateBoth, SandwichController.getSandwichByID);
router.put('/sandwich/:id', authenticateAdmin, SandwichController.updateSandwich);
router.delete('/sandwich/:id', authenticateAdmin, SandwichController.deleteSandwich);

module.exports = router;