const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

// router.post('/register', authController.register);
router.post('/login/:adminId', authController.login);
router.get('/all-admin', authController.getAllAdmin);

module.exports = router;