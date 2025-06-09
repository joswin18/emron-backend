const Product = require('../models/Product');
const Category = require('../models/Category');

const productController = {
    // Home page
    getHome: async (req, res) => {
        try {
            const featuredProducts = await Product.find({ featured: true }).limit(6);
            const categories = await Product.distinct('category');
            
            res.render('index', {
                title: 'EMRON Electricals - Quality Electrical Products',
                featuredProducts,
                categories
            });
        } catch (error) {
            console.error('Error fetching home data:', error);
            res.status(500).render('error', { 
                title: 'Error',
                message: 'Unable to load home page' 
            });
        }
    },

    // All products page
    getAllProducts: async (req, res) => {
        try {
            const { category, search, sort } = req.query;
            let query = {};
            
            // Filter by category
            if (category && category !== 'all') {
                query.category = category;
            }
            
            // Search functionality
            if (search) {
                query.$text = { $search: search };
            }
            
            // Sort options
            let sortOption = {};
            switch (sort) {
                case 'name':
                    sortOption = { name: 1 };
                    break;
                case 'price-low':
                    sortOption = { price: 1 };
                    break;
                case 'price-high':
                    sortOption = { price: -1 };
                    break;
                default:
                    sortOption = { createdAt: -1 };
            }
            
            const products = await Product.find(query).sort(sortOption);
            const categories = await Product.distinct('category');
            
            res.render('products', {
                title: 'All Products - EMRON Electricals',
                products,
                categories,
                currentCategory: category || 'all',
                searchTerm: search || '',
                currentSort: sort || 'newest'
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).render('error', { 
                title: 'Error',
                message: 'Unable to load products' 
            });
        }
    },

    // Single product page
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            
            if (!product) {
                return res.status(404).render('error', { 
                    title: '404 - Product Not Found',
                    message: 'The product you are looking for does not exist.' 
                });
            }
            
            // Get related products from same category
            const relatedProducts = await Product.find({
                category: product.category,
                _id: { $ne: product._id }
            }).limit(4);
            
            res.render('product-detail', {
                title: `${product.name} - EMRON Electricals`,
                product,
                relatedProducts
            });
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).render('error', { 
                title: 'Error',
                message: 'Unable to load product details' 
            });
        }
    },

    // Products by category
    getProductsByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const products = await Product.find({ category });
            const categories = await Product.distinct('category');
            
            res.render('products', {
                title: `${category} - EMRON Electricals`,
                products,
                categories,
                currentCategory: category,
                searchTerm: '',
                currentSort: 'newest'
            });
        } catch (error) {
            console.error('Error fetching products by category:', error);
            res.status(500).render('error', { 
                title: 'Error',
                message: 'Unable to load category products' 
            });
        }
    },

    // API - Get products with filters
    getProducts: async (req, res) => {
        try {
            const { category, search, sort } = req.query;
            let query = {};
            
            if (category && category !== 'all') {
                query.category = category;
            }
            
            if (search) {
                query.$text = { $search: search };
            }
            
            let sortOption = {};
            switch (sort) {
                case 'name':
                    sortOption = { name: 1 };
                    break;
                case 'price-low':
                    sortOption = { price: 1 };
                    break;
                case 'price-high':
                    sortOption = { price: -1 };
                    break;
                default:
                    sortOption = { createdAt: -1 };
            }
            
            const products = await Product.find(query).sort(sortOption);
            const categories = await Product.distinct('category');
            
            res.json({ products, categories });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products' });
        }
    },

    // Create new product
    createProduct: async (req, res) => {
        try {
            const { categoryId, ...productData } = req.body;
            
            // Validate category exists
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).json({ message: 'Invalid category' });
            }
            
            const product = new Product({
                ...productData,
                category: category._id // Set the category reference
            });
            
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(400).json({ message: 'Error creating product' });
        }
    },

    // Update product
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id, 
                req.body,
                { new: true }
            );
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: 'Error updating product' });
        }
    },

    // Delete product
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    },

    // Get categories
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find().sort('name');
            res.json({ categories }); // Return as { categories: [...] }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories' });
        }
    },

    // Create category (if needed)
    createCategory: async (req, res) => {
        // Implement if you need to manage categories separately
        res.status(501).json({ message: 'Not implemented' });
    },

    // Update category
    updateCategory: async (req, res) => {
        // Implement if you need to manage categories separately
        res.status(501).json({ message: 'Not implemented' });
    },

    // Delete category
    deleteCategory: async (req, res) => {
        // Implement if you need to manage categories separately
        res.status(501).json({ message: 'Not implemented' });
    }
};

module.exports = productController;