const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;



exports.postSignup = async (req, res, next) => {
     
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!email || !password || !confirmPassword) {
        // no username or password received in the POST body... send an error
        res
          .status(401)
          .json({ success: false, message: `no username or password supplied.` });
      }
      if (password != confirmPassword) {
        //password doesn't match the password check
        res.status(401).json({ success: false, message: `passwords don't match` });
      }

      bcrypt
        .hash(password, saltRounds)
        .then(hash => {
            const newUser = new User({ email: email, password: hash });
            console.log(newUser);
            return newUser.save();
        })
        .then(result => {
            return res.json({ success: true, email: req.body.email });
        })
        .catch(err => {
            console.log(err);
        })
};