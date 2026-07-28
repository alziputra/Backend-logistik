/**
 * Utility functions for standardized API HTTP responses.
 */

const sendSuccess = (res, data = null, message = null, statusCode = 200) => {
  const response = { success: true };
  if (message) response.message = message;
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

const sendPaginated = (res, dataKey, rows, count, page, limit, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data: {
      [dataKey]: rows,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / limit) || 1,
      },
    },
  });
};

const sendError = (res, message = 'Internal Server Error', statusCode = 400, errors = null) => {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

const sendNotFound = (res, message = 'Resource tidak ditemukan') => {
  return res.status(404).json({ success: false, message });
};

module.exports = {
  sendSuccess,
  sendPaginated,
  sendError,
  sendNotFound,
};
