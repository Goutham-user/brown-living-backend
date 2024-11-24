const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');

const app = express();

// Middleware
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// Database connection
const DB_URI = 'mongodb+srv://goutham09871:zVCC6rotsPvkSLi6@cluster0.vog1c.mongodb.net/eCommerse';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/user',userRoutes );

// Handle undefined routes (should come last)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running`);
});
