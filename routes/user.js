const express = require('express');
const router = express.Router();
const user = require('../services/user.service');

/**
 * Main endpoints
 * 
 * actions admin can perform 
 * based on the exam sheet.
 * 
 */

// View list of all users in the system
router.get('/', user.getAll);

// Add a new user
router.post('/', user.create);

// Edit a user
router.put('/:id', user.edit);

// Delete a user
router.delete('/:id', user.delete);

// Allow multiple users to be removed 
router.delete('/', user.deleteMany);

module.exports = router;