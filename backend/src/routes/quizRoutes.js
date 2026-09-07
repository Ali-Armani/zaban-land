const express = require('express');
const { listQuizzes, getQuiz, submitQuiz } = require('../controllers/quizController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', listQuizzes);
router.get('/:id', getQuiz);
router.post('/:id/submit', requireAuth, submitQuiz);

module.exports = router;
