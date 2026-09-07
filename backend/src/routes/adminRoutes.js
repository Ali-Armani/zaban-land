const express = require('express');
const { listUsers, createLesson, addCardToLesson, getAnalytics } = require('../controllers/adminController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth, requireRole('ADMIN'));

router.get('/users', listUsers);
router.get('/analytics', getAnalytics);
router.post('/lessons', createLesson);
router.post('/lessons/:lessonId/cards', addCardToLesson);

module.exports = router;
