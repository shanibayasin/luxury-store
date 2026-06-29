const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    
    // 1. Admin dhoondo
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid Credentials" });

    // 2. Password verify karo (bcrypt ke zariye)
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

    // 3. Token generate karo
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};