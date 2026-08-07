const sanitizeErrorMessage = (msg) => {
  if (!msg || typeof msg !== 'string') return 'Internal Server Error';

  // Mask any Supabase hostnames, database URLs, DNS, or connection errors
  if (
    msg.includes('supabase') ||
    msg.includes('ENOTFOUND') ||
    msg.includes('ECONNREFUSED') ||
    msg.includes('ETIMEDOUT') ||
    msg.includes('Sequelize') ||
    msg.includes('getaddrinfo')
  ) {
    return 'Gagal terhubung ke Server Database Logistik. Silakan periksa jaringan koneksi Anda atau hubungi Administrator.';
  }

  return msg;
};

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error caught:', err.stack || err.message);

  // Sequelize connection, host, or DNS errors
  if (
    err.name === 'SequelizeConnectionError' ||
    err.name === 'SequelizeHostNotFoundError' ||
    err.name === 'SequelizeHostNotReachableError' ||
    err.name === 'SequelizeConnectionRefusedError' ||
    (err.message && (err.message.includes('ENOTFOUND') || err.message.includes('supabase') || err.message.includes('getaddrinfo')))
  ) {
    return res.status(503).json({
      success: false,
      message: 'Gagal terhubung ke Server Database Logistik. Silakan periksa jaringan koneksi Anda atau hubungi Administrator.',
    });
  }

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors.map((e) => ({ field: e.path, message: e.message })),
    });
  }

  // Sequelize unique constraint
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'Resource already exists',
      errors: err.errors.map((e) => ({ field: e.path, message: e.message })),
    });
  }

  // Default error
  const cleanMessage = sanitizeErrorMessage(err.message);

  res.status(err.status || 500).json({
    success: false,
    message: cleanMessage,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

module.exports = { errorHandler, notFound };
