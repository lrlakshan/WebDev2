const express = require('express');
const SandwichController = require('../controllers/sandwichController');
const router = express.Router();

// POST endpoint to add a new sandwich
router.post('/sandwich', SandwichController.saveSandwich);
router.get('/sandwich', SandwichController.getAllSandwiches);
router.get('/sandwich/:id', SandwichController.getSandwichByID);
router.post('/updateSandwich/:id', SandwichController.updateSandwich);
router.delete('/deleteSandwich/:id', SandwichController.deleteSandwich);
// GET endpoint to retrieve all sandwichs
//router.get('/sandwich', SandwichController.getAllsandwichs);

// GET endpoint to retrieve a single sandwich by ID
//router.get('/sandwich/:sandwichId', SandwichController.getsandwichByID);

module.exports = router;