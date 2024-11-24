const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    priceCurrent: { type: String },
    priceOld: {type: String},
    category: { type: String },
    image: { type: String },
    quantity: {type : Number}
}, { timestamps: true });



const Product = mongoose.model('products', productSchema);

module.exports = Product;
