const { validationResult } = require('express-validator');

// Runs after express-validator checks; returns 400 with details on failure.
// Centralizing this keeps every route consistent and avoids forgetting the check.
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }
  next();
}

module.exports = validate;
