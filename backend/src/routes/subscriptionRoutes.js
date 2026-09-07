const express = require('express');
const { startProCheckout, verifyProPayment } = require('../controllers/subscriptionController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/checkout', requireAuth, startProCheckout);
router.get('/verify', verifyProPayment); // gateway callback, no auth header available

module.exports = router;
