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

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password; 

    User.findOne({email: email})
    .then(user => {
        if (!user) {
            return res.status(422).redirect('/login');
        }
        bcrypt
            .compare(password, user.password)
            .then(doMatch => {
                if (doMatch) {
                    const token = jwt.sign({ uid: 'user_id', email: req.body.email }, process.env.JWT_SECRET);
                    res.send(token);
                }
            })
        })
    .catch(err => {
        console.log(err);
    })
};