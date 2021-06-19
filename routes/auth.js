const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service');

// login
router.post('/', auth.authenticate);

//logout
router.get('/logout', auth.logout);

module.exports = router;
