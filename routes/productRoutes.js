const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product routes
router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Category routes
router.get('/categories', productController.getCategories);

// Optional category management routes
router.post('/categories', productController.createCategory);
router.put('/categories/:id', productController.updateCategory);
router.delete('/categories/:id', productController.deleteCategory);

module.exports = router;