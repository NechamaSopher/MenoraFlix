const jwt = require('jsonwebtoken');

const decodeToken = (req, res, next) => {
  const header = req.headers['x-access-token'];

  if (!header) {
    return res.status(401).json({ message: 'not authenticated' });
  }

  const token = header.split(' ')[1];

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: err.message || 'could not decode the token' });
    }
    else {
      req.user = decoded;
      next();
    }
  }); 
}

module.exports = decodeToken;
