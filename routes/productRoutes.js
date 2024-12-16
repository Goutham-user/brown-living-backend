const express = require('express');
const { getAllProducts, getProductById, addToCart, getCartByUser, removeFromCart, incCartItem, decCartItem } = require('../controller/productController');

const router = express.Router();

// GET /api/products - Fetch all products
router.get('/', getAllProducts);

router.get('/details', getProductById);

router.post('/addToCart', addToCart)

router.get('/cart', getCartByUser)

router.delete('/cart/remove', removeFromCart)

router.put('/cart/incQuantity', incCartItem)

router.put('/cart/decQuantity', decCartItem)





module.exports = router;
