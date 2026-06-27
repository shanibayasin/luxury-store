require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const app = express();

const productController = require("./controllers/productController");
const Order = require("./models/Order");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Configuration (Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "luxury-store/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage: storage });

// Database
mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ DB Connected"));

// Legacy compatibility routes used by the client
app.get("/get-products", productController.getAllProducts);
app.post("/add-product", upload.single("image"), productController.addProduct);
app.delete("/delete-product/:id", productController.deleteProduct);
app.put("/update-product/:id", upload.single("image"), productController.updateProduct);

app.post("/place-order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "✅ Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/get-orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes (Saara code ab yahan import ho raha hai)
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));