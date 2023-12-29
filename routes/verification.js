const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Replace with your User model

const router = express.Router();
const JWT_SECRET = 'your-secret-key'; // Replace with your actual secret key

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter sensitive information if needed
    const profileData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      // ...other profile fields you want to expose
    };

    res.json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
}

module.exports = router;
