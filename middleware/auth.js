const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = header.slice(7).trim();

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: 'JWT_SECRET is not configured' });
    }

    const payload = jwt.verify(token, secret);
    req.admin = { id: payload.id, username: payload.username };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = auth;
