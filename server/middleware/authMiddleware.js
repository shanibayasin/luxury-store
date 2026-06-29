const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Header se token utha rahe hain
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    try {
        // Token verify kar rahe hain
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // Sab sahi hai, aage badho
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};