const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const productController = require('../controllers/product');

router.post('/create', [
    body('productName')
    .isLength({min: 5})
    .withMessage('input productName tidak sesuai'),
    body('productStory')
    .isLength({min: 15})
    .withMessage('input productStory tidak sesuai')],
    productController.createProduct);

router.get('/all-products-paged', productController.getAllProductsPagination);
router.get('/allproduct', productController.getAllProduct);
router.get('/:productId', productController.getProductById);
router.put('/:productId', [
    body('productName')
    .isLength({min: 5})
    .withMessage('input productName tidak sesuai'),
    body('productStory')
    .isLength({min: 15})
    .withMessage('input productStory tidak sesuai')],
    productController.updateProduct)
router.delete('/:productId', productController.deleteProduct);

module.exports = router;