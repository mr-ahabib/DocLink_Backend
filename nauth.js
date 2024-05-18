const jwt = require('jsonwebtoken');
const defaultSecret = 'default-secret';
const User = require('./models/User');

async function auth(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || defaultSecret);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found for the provided token.' });
    }

    req.user = { userId: decoded.userId }; 
    next();
  } catch (err) {
    console.error('Error authenticating token:', err);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired.' });
    } else {
      return res.status(401).json({ error: 'Invalid token.' });
    }
  }
}

module.exports = auth;
