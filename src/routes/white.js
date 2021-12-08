const express = require('express');
const whiteController = require('../controllers/white')

const router = express.Router();

router.post('/create/:productId', whiteController.createWhite);
router.post('/delete/:productId', whiteController.dropWhite);
router.get('/:productId', whiteController.getAllWhite);
router.post('/edit/:recipeId', whiteController.editWhite);

module.exports = router;

