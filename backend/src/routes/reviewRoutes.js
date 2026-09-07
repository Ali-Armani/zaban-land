const express = require('express');
const { body } = require('express-validator');
const { getDueCards, submitReview } = require('../controllers/reviewController');
const { requireAuth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/due', requireAuth, getDueCards);
router.post(
  '/submit',
  requireAuth,
  [body('cardId').isString().notEmpty(), body('correct').isBoolean()],
  validate,
  submitReview
);

module.exports = router;
