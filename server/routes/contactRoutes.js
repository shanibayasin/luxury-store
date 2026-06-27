const express = require('express');
const router = express.Router();
const { submitContact, getMessages } = require('../controllers/contactController');

router.post('/submit', submitContact);
router.get('/messages', getMessages);

module.exports = router;