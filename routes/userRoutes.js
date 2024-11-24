const express = require('express');
const { loginAPI, signUpAPI } = require('../controller/productController');

const router = express.Router();



// for login and sign up

router.post('/login', loginAPI);
router.post('/signup', signUpAPI);





module.exports = router;
