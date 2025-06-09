const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categoryData = [
    {
        name: "Switches",
        description: "Electrical switches for various applications",
        slug: "switches"
    },
    {
        name: "Sockets",
        description: "Power sockets and outlets",
        slug: "sockets"
    },
    {
        name: "Cables",
        description: "Electrical cables and wiring",
        slug: "cables"
    },
    {
        name: "Circuit Breakers",
        description: "Safety devices for electrical circuits",
        slug: "circuit-breakers"
    },
    {
        name: "LED Lighting",
        description: "Energy efficient lighting solutions",
        slug: "led-lighting"
    },
    {
        name: "Distribution Boards",
        description: "Electrical distribution panels",
        slug: "distribution-boards"
    }
];

async function seedCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing categories
        await Category.deleteMany({});
        console.log('Cleared existing categories');
        
        // Insert new categories
        const insertedCategories = await Category.insertMany(categoryData);
        console.log('Categories seeded successfully');
        
        return insertedCategories;
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
}

module.exports = { seedCategories, categoryData };