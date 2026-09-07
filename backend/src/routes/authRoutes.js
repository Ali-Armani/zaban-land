const express = require('express');
const { body } = require('express-validator');
const { register, login, refresh, logout } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post(
  '/register',
  authLimiter,
  [
    body('username').trim().isLength({ min: 3, max: 30 }).matches(/^[a-zA-Z0-9_]+$/),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('email').optional().isEmail().normalizeEmail(),
    body('mobile').optional().isMobilePhone('any'),
  ],
  validate,
  register
);

router.post(
  '/login',
  authLimiter,
  [body('identifier').trim().notEmpty(), body('password').notEmpty()],
  validate,
  login
);

router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;
