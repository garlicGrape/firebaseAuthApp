const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path'); // Import path module

const verifyToken = require('../middleware/verifyToken');

const authController = require('../controllers/auth');

const router = express.Router();

// ... (other imports and middleware)

// Regular user routes
router.get('/signup', (req, res, next) => {
  res.render('signup', {}); // Renders the 'signup.ejs' template
});

router.post('/signup', authController.postSignup);

// router.post('/signup', async (req, res, next) => {
//   try {
//     // Perform user signup, assign group code, etc.
//     // Example: create user in Firebase Auth and generate group code
//     const groupCode = uuid.v4();
//     const user = await admin.auth().createUser({
//       email: req.body.email,
//       password: req.body.password,
//     });

//     // Generate JWT token
//     const token = jwt.sign({ uid: user.uid, email: user.email, groupCode }, process.env.JWT_SECRET);
//     res.send(token);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

router.get('/login', (req, res, next) => {
  res.render('login', {}); // Renders the 'login.ejs' template
});

router.post('/login', authController.postLogin);

// router.post('/login', async (req, res, next) => {
//   try {
//     // Perform user login logic
   
//     // Generate JWT token
//     const token = jwt.sign({ uid: 'user_id', email: req.body.email }, process.env.JWT_SECRET);
//     res.send(token);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// ... (other routes)

router.post('/joinGroup', authController.postJoinGroup);

module.exports = router;
