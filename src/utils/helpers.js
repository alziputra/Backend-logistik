/**
 * Selects specified fields from an object.
 * @param {Object} source 
 * @param {Array<string>} fields 
 * @returns {Object}
 */
const pick = (source, fields) =>
  fields.reduce((acc, field) => {
    if (source && source[field] !== undefined) {
      acc[field] = source[field];
    }
    return acc;
  }, {});

/**
 * Extracts and parses pagination parameters from query string.
 * @param {Object} query 
 * @param {number} defaultPage 
 * @param {number} defaultLimit 
 * @returns {{ page: number, limit: number, offset: number }}
 */
const getPaginationParams = (query, defaultPage = 1, defaultLimit = 10) => {
  const page = Math.max(1, parseInt(query.page, 10) || defaultPage);
  const limit = Math.max(1, parseInt(query.limit, 10) || defaultLimit);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

module.exports = {
  pick,
  getPaginationParams,
};
