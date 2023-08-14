const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path'); // Import path module

const router = express.Router();

// ... (other imports and middleware)

// Regular user routes
router.get('/signup', (req, res) => {
  res.render('signup'); // Renders the 'signup.ejs' template
});

router.post('/signup', async (req, res) => {
  try {
    // Perform user signup, assign group code, etc.
    // Example: create user in Firebase Auth and generate group code
    const groupCode = uuid.v4();
    const user = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    // Generate JWT token
    const token = jwt.sign({ uid: user.uid, email: user.email, groupCode }, process.env.JWT_SECRET);
    res.send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/login', (req, res) => {
  res.render('login'); // Renders the 'login.ejs' template
});

router.post('/login', async (req, res) => {
  try {
    // Perform user login logic
    // Example: verify user credentials and generate JWT token
    // Note: This is a simplified example. Implement actual login logic here.

    // Generate JWT token
    const token = jwt.sign({ uid: 'user_id', email: req.body.email }, process.env.JWT_SECRET);
    res.send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ... (other routes)

module.exports = router;
