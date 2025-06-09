const mongoose = require('mongoose');
const Product = require('../models/Product');
const { seedCategories } = require('./seedCategories');
require('dotenv').config();

async function createSampleProducts(categories) {
    const categoryMap = categories.reduce((map, category) => {
        map[category.name] = category._id;
        return map;
    }, {});

    return [
        {
            name: "Modular Switch - 16A",
            description: "High-quality modular switch with superior build quality",
            category: categoryMap["Switches"],
            brand: "Legrand",
            model: "Myrius 6732 16",
            specifications: {
                voltage: "240V AC",
                current: "16A",
                material: "Polycarbonate",
                dimensions: "86mm x 86mm",
                weight: "45g"
            },
            features: [
                "Fire retardant polycarbonate body",
                "Silver alloy contacts",
                "Modular design",
                "Easy installation",
                "ISI certified"
            ],
            images: [
                {
                    url: "/images/products/switch-16a.jpg",
                    alt: "16A Modular Switch"
                }
            ],
            price: 249,
            inStock: true,
            featured: true
        },
        {
            name: "LED Panel Light",
            description: "Energy-efficient LED panel light for modern interiors.",
            category: categoryMap["LED Lighting"],
            brand: "Havells",
            model: "Galaxy LP1245",
            specifications: {
                power: "24W",
                voltage: "220-240V",
                frequency: "50-60Hz",
                dimensions: "300x300mm",
                weight: "750g"
            },
            features: [
                "High luminous efficiency",
                "Long lifespan",
                "No UV radiation",
                "Easy installation",
                "2 years warranty"
            ],
            images: [
                {
                    url: "/images/products/led-panel.jpg",
                    alt: "LED Panel Light"
                }
            ],
            price: 1499,
            inStock: true,
            featured: true
        }
        // Add more products as needed
    ];
}

async function seedDatabase() {
    try {
        // First seed categories
        const categories = await seedCategories();
        console.log('Categories seeded');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        // Create and insert sample products
        const sampleProducts = await createSampleProducts(categories);
        await Product.insertMany(sampleProducts);
        
        console.log(`${sampleProducts.length} products added to the database`);
        
        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeder
seedDatabase().then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
});