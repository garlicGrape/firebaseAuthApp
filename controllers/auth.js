const User = require('../models/user');
const uuid = require('uuid');
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;



// exports.postSignup = async (req, res, next) => {
     
//     const email = req.body.email;
//     const password = req.body.password;
//     const confirmPassword = req.body.confirmPassword;

//     if (!email || !password || !confirmPassword) {
//         // no username or password received in the POST body... send an error
//         res
//           .status(401)
//           .json({ success: false, message: `no username or password supplied.` });
//       }
//       if (password != confirmPassword) {
//         //password doesn't match the password check
//         res.status(401).json({ success: false, message: `passwords don't match` });
//       }

//       bcrypt
//         .hash(password, saltRounds)
//         .then(hash => {
//             const newUser = new User({ email: email, password: hash });
//             console.log(newUser);
//             return newUser.save();
//         })
//         .then(result => {
//             return res.json({ success: true, email: req.body.email });
//         })
//         .catch(err => {
//             console.log(err);
//         })
// };

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
  
    if (!email || !password || !confirmPassword) {
        res.status(401).json({
        success: false,
        message: `No username or password supplied.`,
      });
    }
    if (password !== confirmPassword) {
        res.status(401).json({
        success: false,
        message: `Passwords don't match.`,
      });
    }
  
    // Generate a UID for the user (using uuid library)
    const uid = uuid.v4();
  
    bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        const newUser = new User({ uid: uid, email: email, password: hash }); // Store the generated UID in your MongoDB user document
        console.log(newUser);
        return newUser.save();
      })
      .then((result) => {
        // Create a custom token for Firebase Authentication
        admin
          .auth()
          .createCustomToken(uid)
          .then((customToken) => {
            // Send the custom token to Firebase for authentication
            return admin.auth().signInWithCustomToken(customToken);
          })
          .then((firebaseUser) => {
            // Continue with your logic, like generating your own JWT token
            const token = jwt.sign(
              { uid: uid, email: email },
              process.env.JWT_SECRET
            );
            return res.json({
              success: true,
              email: req.body.email,
              token: token, // Include the generated JWT token in the response
            });
          })
          .catch((error) => {
            console.error('Error creating custom token:', error);
            res.status(500).json({ success: false, message: 'Authentication error' });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, message: 'Signup error' });
      });
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