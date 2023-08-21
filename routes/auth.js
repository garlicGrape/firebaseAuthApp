const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path'); // Import path module

const verifyToken = require('../middleware/verifyToken');

const authController = require('../controllers/auth');

const router = express.Router();



router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);

router.post('/joinGroup', authController.postJoinGroup);

module.exports = router;
