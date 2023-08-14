const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify admin JWT token
const verifyAdminToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

// Admin CMS routes
router.get('/users', verifyAdminToken, async (req, res) => {
  try {
    // Fetch a list of users (for admin use only)
    const userList = await admin.auth().listUsers();
    res.send(userList);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// More admin CMS routes for managing users and groups

module.exports = router;