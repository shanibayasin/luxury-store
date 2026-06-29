require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin'); // Aapka admin model

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected!");

        // Password hash karna (Security step)
        const hashedPassword = await bcrypt.hash("admin123", 10);
        
        const newAdmin = new Admin({
            username: "admin",
            password: hashedPassword
        });

        await newAdmin.save();
        console.log("Admin created successfully!");
        process.exit();
    } catch (err) {
        console.error("Error creating admin:", err);
        process.exit(1);
    }
};

createAdmin();