const mongoose = require('mongoose');
const slugify = require('slugify');
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    image_url: String,
    slug: {
        type: String,
        unique: true
    },
  organic_certification: String,
}, { timestamps: true });

productSchema.pre('save', async function () {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
});

module.exports = mongoose.model('Product', productSchema);