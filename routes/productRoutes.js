const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Home page
router.get('/', productController.getHome);

// All products page
router.get('/products', productController.getProducts);

// Featured products
router.get('/products/featured', productController.getFeaturedProducts);

// Product by ID
router.get('/products/:id', productController.getProductById);

module.exports = router;