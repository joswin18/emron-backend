const Category = require('../models/Category');
const Product = require('../models/Product');

const categoryController = {
    // Get all categories with product counts
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find()
                .populate('productCount')
                .sort({ name: 1 });
            
            res.json({ categories });
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ message: 'Error fetching categories' });
        }
    },

    // Create new category
    createCategory: async (req, res) => {
        try {
            const { name, description } = req.body;
            
            // Check if category already exists
            const existingCategory = await Category.findOne({ 
                name: { $regex: new RegExp(`^${name}$`, 'i') }
            });
            
            if (existingCategory) {
                return res.status(400).json({ 
                    message: 'Category already exists' 
                });
            }

            const category = new Category({ name, description });
            await category.save();

            res.status(201).json({ 
                message: 'Category created successfully', 
                category 
            });
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ 
                message: 'Error creating category' 
            });
        }
    },

    // Update category
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, active } = req.body;

            // Check if new name already exists
            if (name) {
                const existingCategory = await Category.findOne({
                    name: { $regex: new RegExp(`^${name}$`, 'i') },
                    _id: { $ne: id }
                });

                if (existingCategory) {
                    return res.status(400).json({ 
                        message: 'Category name already exists' 
                    });
                }
            }

            const category = await Category.findByIdAndUpdate(
                id,
                { name, description, active },
                { new: true, runValidators: true }
            );

            if (!category) {
                return res.status(404).json({ 
                    message: 'Category not found' 
                });
            }

            res.json({ 
                message: 'Category updated successfully', 
                category 
            });
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ 
                message: 'Error updating category' 
            });
        }
    },

    // Delete category
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            // Check if category has products
            const productCount = await Product.countDocuments({ 
                category: id 
            });

            if (productCount > 0) {
                return res.status(400).json({
                    message: 'Cannot delete category with existing products'
                });
            }

            const category = await Category.findByIdAndDelete(id);

            if (!category) {
                return res.status(404).json({ 
                    message: 'Category not found' 
                });
            }

            res.json({ 
                message: 'Category deleted successfully' 
            });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ 
                message: 'Error deleting category' 
            });
        }
    }
};

module.exports = categoryController;