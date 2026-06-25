const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('dotenv').config();

// Client untuk fetch public key dari Supabase JWKS endpoint
const client = jwksClient({
  jwksUri: process.env.SUPABASE_JWKS_URL,
  cache: true,
  cacheMaxAge: 86400000, // cache 24 jam
});

// Ambil signing key dari JWKS berdasarkan kid (key id)
const getSigningKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

// Verifikasi token menggunakan JWKS (ECC P-256)
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getSigningKey,
      {
        algorithms: ['ES256'], // ECC P-256 = ES256
        issuer: `${process.env.SUPABASE_URL}/auth/v1`,
      },
      (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      }
    );
  });
};

// Middleware: authenticate request
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);

    // decoded berisi payload dari Supabase JWT
    // sub = user id, email, role, dll
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role || 'authenticated',
      ...decoded,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    next(error);
  }
};

// Middleware: authorize by role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
