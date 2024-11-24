const express = require('express');
const { getAllProducts, getProductById, addToCart, getCartByUser } = require('../controller/productController');

const router = express.Router();

// GET /api/products - Fetch all products
router.get('/', getAllProducts);

router.get('/details', getProductById);

router.post('/addToCart', addToCart)

router.get('/cart', getCartByUser)





module.exports = router;
