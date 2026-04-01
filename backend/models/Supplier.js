const mongoose = require('mongoose');
const slugify = require('slugify');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    phone: String,
    address: String,
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true });

supplierSchema.pre('save', async function () {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
});

module.exports = mongoose.model('Supplier', supplierSchema);