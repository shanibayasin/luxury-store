require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Product = require('./Product');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary Storage Configuration for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'luxury_store_products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    resource_type: 'auto'
  },
});
const upload = multer({ storage: storage });

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("Database connection error:", err));

// 3. POST: Product Add Route
app.post('/add-product', upload.single('image'), async (req, res) => {
    try {
        const { name, price, image } = req.body;
        
        // If file was uploaded via multer, use that; otherwise use base64 from body
        const imageUrl = req.file ? req.file.path : image;

        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required" });
        }

        const newProduct = new Product({
            name: name.trim(),
            price: parseFloat(price), // Convert to number
            image: imageUrl || "" // Can be Cloudinary URL or base64
        });
        
        const savedProduct = await newProduct.save();
        res.status(201).json({ 
            message: "Product added successfully!", 
            product: savedProduct 
        });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(400).json({ error: err.message });
    }
});

// 4. GET: Products Route
app.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Data fetch nahi ho saka" });
    }
});

// 5. DELETE Route
app.delete('/delete-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🗑️ Attempting to delete product with ID:", id);
        
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            console.log("❌ Product not found with ID:", id);
            return res.status(404).json({ error: "Product not found" });
        }
        
        console.log("✅ Successfully deleted product:", product.name);
        res.json({ message: "Product deleted successfully", deletedProduct: product });
    } catch (err) {
        console.error("❌ Delete error:", err);
        res.status(500).json({ error: err.message });
    }
});

// 6. UPDATE Route - For editing products
app.put('/update-product/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price, image } = req.body;
        
        const imageUrl = req.file ? req.file.path : image;

        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: name.trim(),
                price: parseFloat(price),
                image: imageUrl || undefined
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ 
            message: "Product updated successfully!", 
            product: updatedProduct 
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});