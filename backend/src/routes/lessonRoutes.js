const express = require('express');
const { listLessons, getLesson } = require('../controllers/lessonController');

const router = express.Router();

// Public browsing; controller hides Pro-only content for non-Pro users
router.get('/', listLessons);
router.get('/:id', getLesson);

module.exports = router;
