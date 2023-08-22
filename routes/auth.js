const express = require('express');



const path = require('path'); // Import path module

const verifyToken = require('../middleware/verifyToken');

const authController = require('../controllers/auth');

const router = express.Router();



router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);

router.post('/joinGroup', authController.postJoinGroup);

router.put('/updateUser', authController.putUpdateUser);

module.exports = router;
