const { validationResult } = require('express-validator');
const { sendError } = require('../utils/response.util');

/**
 * Middleware to handle express-validator validation errors.
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 'Validasi gagal', 400, errors.array());
  }
  next();
};

module.exports = { validateRequest };
