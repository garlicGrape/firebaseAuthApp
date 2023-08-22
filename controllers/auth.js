const User = require('../models/user');
const Groupcode = require('../models/groupcode');
const uuid = require('uuid');
const jwt = require("jsonwebtoken");
const admin = require('firebase-admin');
const dotenv = require('dotenv');

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

// exports.postSignup = async (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     const confirmPassword = req.body.confirmPassword;
  
//     if (!email || !password || !confirmPassword) {
//         res.status(401).json({
//         success: false,
//         message: `No username or password supplied.`,
//       });
//     }
//     if (password !== confirmPassword) {
//         res.status(401).json({
//         success: false,
//         message: `Passwords don't match.`,
//       });
//     }
  
//     // Generate a UID for the user (using uuid library)
//     const uid = uuid.v4();
  
//     bcrypt
//       .hash(password, saltRounds)
//       .then((hash) => {
//         const newUser = new User({ uid: uid, email: email, password: hash }); // Store the generated UID in your MongoDB user document
//         console.log(newUser);
//         return newUser.save();
//       })
//       .then((result) => {
//         // Create a custom token for Firebase Authentication
//         admin
//           .auth()
//           .createCustomToken(uid)
//           .then((customToken) => {
//             // Send the custom token to Firebase for authentication
//             return admin.auth().signInWithCustomToken(customToken);
//           })
//           .then((firebaseUser) => {
//             // Continue with your logic, like generating your own JWT token
//             const token = jwt.sign(
//               { uid: uid, email: email },
//               process.env.JWT_SECRET
//             );
//             return res.json({
//               success: true,
//               email: req.body.email,
//               token: token, // Include the generated JWT token in the response
//             });
//           })
//           .catch((error) => {
//             console.error('Error creating custom token:', error);
//             res.status(500).json({ success: false, message: 'Authentication error' });
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({ success: false, message: 'Signup error' });
//       });
//   };

exports.postSignup =  (req, res, next) => {
    const email = req.body[0].email;
    const firstname = req.body[0].firstname;
    const lastname = req.body[0].lastname;

    console.log(req);
    console.log(email);
    console.log(firstname);
    console.log(lastname);
    
    
    // Create a new user document in MongoDB with the generated UID, email, first name, and last name
    console.log("Creating  user");
    const newUser = new User({email: email, firstname: firstname, lastname: lastname, groupCode: 4444});
    console.log("Done");
    return newUser.save();
  
      
  };
  


  exports.putUpdateUser = async (req, res, next) => {
    let idToken;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split(' ')[1]
  }

  console.log(idToken);

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (req.body.firstname && req.body.lastname) {
      await user.updateOne({
        firstname: req.body.firstname,
        lastname: req.body.lastname
      });

      res.json({
        success: true,
        message: 'Name update successful',
        user: user
      });
    } else {
      res.status(400).json({ success: false, message: 'Missing firstname or lastname in request body' });
    }

    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
    console.log(ex);
  }

  };

  exports.postLogin = async (req, res, next) => {
    let idToken;

    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      idToken = req.headers.authorization.split(' ')[1]
    }
    
    // const idToken = req.header('Authorization');

    // console.log(idToken);

    
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      // const decodedToken = jwt.verify(idToken, process.env.JWT_SECRET);
      // req.user = decodedToken;
      const email = decodedToken.email;
      const  user = await User.findOne({email: email});
      console.log(user);

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
  
      res.json({
        success: true,
        message: 'Login successful',
        user: user
      });

      console.log("Decoded data: ");
      console.log(decodedToken);
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
      console.log(ex);
    }
  
  };
  
  exports.postJoinGroup = async (req, res, next) => {
    let idToken;

    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      idToken = req.headers.authorization.split(' ')[1]
    }

    console.log(idToken);

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      // const decodedToken = jwt.verify(idToken, process.env.JWT_SECRET);
      // req.user = decodedToken;
      const email = decodedToken.email.trim();

      console.log("This is the email:" + email);
      const  user = await User.findOne({email: email});
      console.log("This is the updated user: " + user);
      
     await user.updateOne({role: 'user'});
     console.log("Creating  groupcode");

     const gc = await Groupcode.findOne({groupCode: 4444});

     if(!gc) {
      const groupCode = new Groupcode({groupCode: 4444, role: user.role});
      await groupCode.save();
      console.log("Done");
     } 
    
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      res.json({
        success: true,
        message: 'Role update successful',
        user: user
      });
  
      // console.log("Decoded data: ");
      // console.log(decodedToken);
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
      console.log(ex);
    }
  
    
  };
  
  
  
  
  
  
  
  

// exports.postLogin = async (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password; 

//     User.findOne({email: email})
//     .then(user => {
//         if (!user) {
//             return res.status(422).redirect('/login');
//         }
//         bcrypt
//             .compare(password, user.password)
//             .then(doMatch => {
//                 if (doMatch) {
//                     const token = jwt.sign({ uid: 'user_id', email: req.body.email }, process.env.JWT_SECRET);
//                     res.send(token);
//                 }
//             })
//         })
//     .catch(err => {
//         console.log(err);
//     })
// };