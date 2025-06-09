const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for product count
categorySchema.virtual('productCount', {
    ref: 'Product',
    localField: 'name',
    foreignField: 'category',
    count: true
});

// Pre-save hook to generate slug
categorySchema.pre('save', function(next) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    next();
});

module.exports = mongoose.model('Category', categorySchema);