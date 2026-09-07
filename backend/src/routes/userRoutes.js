const express = require('express');
const { getMe, getDashboard } = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', requireAuth, getMe);
router.get('/dashboard', requireAuth, getDashboard);

module.exports = router;
