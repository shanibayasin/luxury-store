const Contact = require('../models/Contact');

// Form Submit krne ke liye
exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Admin panel mein Messages dikhane ke liye
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};