const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProducts = [
  {
    name: "Modular Switch - 16A",
    description: "High-quality modular switch with superior build quality and long-lasting performance. Perfect for residential and commercial applications.",
    category: "Switches",
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
        url: "/images/modular-switch-16a.jpg",
        alt: "Modular Switch 16A"
      }
    ],
    price: 125,
    inStock: true,
    featured: true
  },
  {
    name: "3-Pin Socket with USB",
    description: "Modern 3-pin socket with built-in USB charging ports. Ideal for contemporary homes and offices.",
    category: "Sockets",
    brand: "Anchor",
    model: "Roma Classic 6A",
    specifications: {
      voltage: "240V AC",
      current: "6A + 2.1A USB",
      material: "ABS Plastic",
      dimensions: "86mm x 86mm",
      weight: "65g"
    },
    features: [
      "Dual USB ports",
      "Child safety shutters",
      "Universal socket design",
      "LED indicator",
      "Surge protection"
    ],
    images: [
      {
        url: "/images/3pin-socket-usb.jpg",
        alt: "3-Pin Socket with USB"
      }
    ],
    price: 285,
    inStock: true,
    featured: true
  },
  {
    name: "Copper Electrical Cable 2.5mm²",
    description: "Premium quality copper electrical cable suitable for house wiring and industrial applications.",
    category: "Cables",
    brand: "Havells",
    model: "HRFR 2.5 sq mm",
    specifications: {
      voltage: "1100V",
      current: "27A",
      material: "Electrolytic Copper",
      dimensions: "2.5mm² cross-section",
      weight: "3.2kg per 100m"
    },
    features: [
      "99.97% pure copper conductor",
      "HRFR (Heat Resistant Flame Retardant)",
      "ISI marked",
      "Low smoke emission",
      "Halogen free"
    ],
    images: [
      {
        url: "/images/copper-cable-2-5mm.jpg",
        alt: "Copper Electrical Cable 2.5mm²"
      }
    ],
    price: 4250,
    inStock: true,
    featured: false
  },
  {
    name: "LED Panel Light 18W",
    description: "Energy-efficient LED panel light with uniform light distribution and long lifespan.",
    category: "Lighting",
    brand: "Philips",
    model: "SlimValue RC065B",
    specifications: {
      voltage: "220-240V AC",
      power: "18W",
      frequency: "50-60Hz",
      dimensions: "300mm x 300mm",
      weight: "450g"
    },
    features: [
      "Cool white 6500K",
      "1800 lumens output",
      "50,000 hours lifespan",
      "Flicker-free operation",
      "Easy ceiling mount"
    ],
    images: [
      {
        url: "/images/led-panel-18w.jpg",
        alt: "LED Panel Light 18W"
      }
    ],
    price: 1250,
    inStock: true,
    featured: true
  },
  {
    name: "MCB 32A Single Pole",
    description: "Miniature Circuit Breaker for overload and short circuit protection in electrical installations.",
    category: "Circuit Breakers",
    brand: "Schneider Electric",
    model: "Easy9 EZ9F34132",
    specifications: {
      voltage: "230V AC",
      current: "32A",
      frequency: "50Hz",
      material: "Thermoplastic",
      dimensions: "85mm x 18mm x 78mm"
    },
    features: [
      "C-curve characteristic",
      "6kA breaking capacity",
      "Single pole design",
      "DIN rail mounting",
      "Visual trip indication"
    ],
    images: [
      {
        url: "/images/mcb-32a-single.jpg",
        alt: "MCB 32A Single Pole"
      }
    ],
    price: 185,
    inStock: true,
    featured: false
  },
  {
    name: "Distribution Board 8-Way",
    description: "Metal distribution board for organizing and protecting electrical circuits in residential applications.",
    category: "Panels",
    brand: "L&T",
    model: "Switchgear MD08",
    specifications: {
      voltage: "415V AC",
      current: "63A",
      material: "CRCA Steel",
      dimensions: "285mm x 210mm x 110mm",
      weight: "2.5kg"
    },
    features: [
      "8-way modular design",
      "IP43 protection",
      "Powder coated finish",
      "Transparent door",
      "Earth bar included"
    ],
    images: [
      {
        url: "/images/distribution-board-8way.jpg",
        alt: "Distribution Board 8-Way"
      }
    ],
    price: 1850,
    inStock: true,
    featured: true
  },
  {
    name: "Single Phase Motor 1HP",
    description: "High-efficiency single phase induction motor for various industrial and domestic applications.",
    category: "Motors",
    brand: "Crompton Greaves",
    model: "1311 Series",
    specifications: {
      voltage: "230V AC",
      power: "1HP (0.75kW)",
      frequency: "50Hz",
      material: "Cast Iron",
      dimensions: "320mm x 180mm x 200mm",
      weight: "18kg"
    },
    features: [
      "Class F insulation",
      "IP55 protection",
      "Capacitor start design",
      "Low noise operation",
      "Maintenance free"
    ],
    images: [
      {
        url: "/images/motor-1hp-single.jpg",
        alt: "Single Phase Motor 1HP"
      }
    ],
    price: 8500,
    inStock: true,
    featured: false
  },
  {
    name: "Step Down Transformer 5KVA",
    description: "Oil-cooled step down transformer for converting high voltage to low voltage applications.",
    category: "Transformers",
    brand: "Kirloskar",
    model: "KT-5000",
    specifications: {
      voltage: "11kV/415V",
      power: "5KVA",
      frequency: "50Hz",
      material: "Silicon Steel Core",
      dimensions: "600mm x 400mm x 500mm",
      weight: "85kg"
    },
    features: [
      "Oil-filled cooling",
      "CRGO core material",
      "Copper windings",
      "Outdoor installation",
      "BIS certified"
    ],
    images: [
      {
        url: "/images/transformer-5kva.jpg",
        alt: "Step Down Transformer 5KVA"
      }
    ],
    price: 45000,
    inStock: false,
    featured: false
  },
  {
    name: "Ceiling Fan Regulator",
    description: "Electronic fan speed regulator with smooth speed control and energy efficiency.",
    category: "Switches",
    brand: "Anchor",
    model: "Roma 1000W",
    specifications: {
      voltage: "230V AC",
      current: "4A",
      power: "1000W",
      material: "Polycarbonate",
      dimensions: "86mm x 86mm"
    },
    features: [
      "Step-less speed control",
      "Soft start technology",
      "Energy efficient",
      "Noiseless operation",
      "Overload protection"
    ],
    images: [
      {
        url: "/images/fan-regulator.jpg",
        alt: "Ceiling Fan Regulator"
      }
    ],
    price: 425,
    inStock: true,
    featured: true
  },
  {
    name: "Industrial Socket 32A",
    description: "Heavy-duty industrial socket for high current applications in factories and workshops.",
    category: "Sockets",
    brand: "L&T",
    model: "Industrial 32A",
    specifications: {
      voltage: "415V AC",
      current: "32A",
      material: "Nylon 6",
      dimensions: "110mm x 110mm",
      weight: "250g"
    },
    features: [
      "IP67 weatherproof",
      "4-pin configuration",
      "Mechanical interlock",
      "Arc-resistant contacts",
      "Vibration resistant"
    ],
    images: [
      {
        url: "/images/industrial-socket-32a.jpg",
        alt: "Industrial Socket 32A"
      }
    ],
    price: 1250,
    inStock: true,
    featured: false
  }
];

async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');
    
    console.log(`${sampleProducts.length} products added to the database`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();