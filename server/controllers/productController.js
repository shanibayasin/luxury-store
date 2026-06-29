const Product = require('../Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required" });
        }

        // Get image URL from Cloudinary upload or use provided URL
        const imageUrl = req.file?.path || "";
        const newProduct = new Product({
            name: name.trim(),
            price: parseFloat(price),
            description: description?.trim() || "",
            image: imageUrl,
        });

        await newProduct.save();
        res.status(201).json({ message: "✅ Product added!", product: newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully!", deletedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required" });
        }

        const updatedData = {
            name: name.trim(),
            price: parseFloat(price),
            description: description?.trim() || "",
        };

        // Update image only if new file is uploaded
        if (req.file?.path) {
            updatedData.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "✅ Product updated successfully!", product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};