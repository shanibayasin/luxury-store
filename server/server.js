require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// Routes (Yahan saare modules link ho gaye)
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/orders", require("./routes/orderRoutes")); // Naya Order Route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));