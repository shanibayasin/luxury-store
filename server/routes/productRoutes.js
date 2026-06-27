const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const productController = require('../controllers/productController');

// Cloudinary Storage Setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "luxury-store/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);
router.post('/add', upload.single('image'), productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);

module.exports = router;