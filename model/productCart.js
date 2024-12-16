const mongoose = require('mongoose');

const productCartSchema = new mongoose.Schema({
    title: { type: String, required: true },
    priceCurrent: { type: String },
    priceOld: {type: String},
    category: { type: String },
    image: { type: String },
    quantity: {type : Number, default: 1},
    user: { type: String },
}, { timestamps: true });



const CartProducts = mongoose.model('cart', productCartSchema);

module.exports = CartProducts;
