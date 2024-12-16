const Product = require('../model/productModel');
const CartProducts = require('../model/productCart');

const User = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "loinloginloginlogin"
// Fetch all products
const getAllProducts = async (req, res) => {

  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ message: 'Category query parameter is required' });
  }

  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getProductById = async (req, res) => {

  const { _id } = req.query;
  // console.log(_id);
  // console.log(req.query)

  if (!_id) {
    return res.status(400).json({ message: 'id query parameter is required' });
  }

  try {
    const product = await Product.find({ _id });
    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};


const addToCart = async (req, res) => {
  const { title, category, image, quantity, user, priceCurrent, priceOld } = req.body;

  // 
  try {
    // Check if the item already exists
    const existingItem = await CartProducts.findOne({ title, user });
    // console.log(existingItem, "existingItem")

    if (existingItem) {
      // Update count if the item exists
      const updatedItem = await CartProducts.findOneAndUpdate(
        { user, title }, // Filter criteria
        { $inc: { quantity } }, // Increment the count if the item exists
        { new: true, upsert: true } // Return the updated item, create if not found
      );
      // await updatedItem.save();
    } else {
      // Add a new item if it doesn't exist
      const newItem = new CartProducts({ title, category, image, user, priceCurrent, priceOld, quantity });
      await newItem.save();
    }

    const cart = await CartProducts.find(); // Get updated cart
    res.status(200).json({ message: "Product added to Cart successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incCartItem = async (req, res) => {
  const {  id, user } = req.body;
  // console.log(id)

  try {

    // Check if the item already exists
    const existingItem = await CartProducts.findById(id);
    // console.log(existingItem, "existingItem")

    if (existingItem) {
      // Update count if the item exists
      const updatedItem = await CartProducts.findByIdAndUpdate(
       id, // Filter criteria
        { $inc: { quantity: 1 } }, // Increment the count if the item exists
        { new: true} // Return the updated item, create if not found
      );
    }
    const cart = await CartProducts.find({user});
    res.status(200).json({cart, message: "Product added to Cart successfully" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const decCartItem = async (req, res) => {
  const {  id, user  } = req.body;
  // console.log(id)

  try {

    // Check if the item already exists
    const existingItem = await CartProducts.findById(id);
    // console.log(existingItem, "existingItem")

    if (existingItem) {
      // Update count if the item exists
      const updatedItem = await CartProducts.findByIdAndUpdate(
       id, // Filter criteria
        { $inc: { quantity: -1 } }, // Increment the count if the item exists
        { new: true} // Return the updated item, create if not found
      );
    }
    const cart = await CartProducts.find({user});
    res.status(200).json({ cart, message: "Product added to Cart successfully" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const removeFromCart = async (req, res) => {

  const { user, title, id } = req.body;

  try {
    // Remove the item matching username and title
    // await CartProducts.findOneAndDelete({ user, title});
    await CartProducts.findByIdAndDelete(id);

    // Fetch the updated cart for the user
    const userCart = await CartProducts.find({ user });
    res.status(200).json(userCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

const getCartByUser = async (req, res) => {

  const { user } = req.query;
  // console.log(_id);
  // console.log(req.query)

  if (!user) {
    return res.status(400).json({ message: 'user query parameter is required' });
  }

  try {
    const products = await CartProducts.find({ user });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};



// Login API
const loginAPI = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Login successful", token, user: user.email });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

// Register API (for testing)
const signUpAPI = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User registered successfully" });
};

module.exports = { getAllProducts, getProductById, loginAPI, signUpAPI, addToCart, getCartByUser, removeFromCart, incCartItem, decCartItem };
