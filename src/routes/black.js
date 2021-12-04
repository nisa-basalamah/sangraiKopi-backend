const express = require('express');
const blackController = require('../controllers/black')

const router = express.Router();

router.post('/create/:productId', blackController.createBlack);
router.post('/delete/:productId', blackController.dropBlack);
router.get('/:productId', blackController.getAllBlack);
router.post('/edit/:recipeId', blackController.editBlack);

module.exports = router;