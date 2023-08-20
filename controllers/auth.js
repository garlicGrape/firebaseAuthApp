const User = require('../models/user');
const uuid = require('uuid');
const jwt = require("jsonwebtoken");
const admin = require('firebase-admin');

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
    const newUser = new User({email: email, firstname: firstname, lastname: lastname});
    console.log("Done");
    return newUser.save();
  
      
  };
  


  
  
  exports.postLogin = async (req, res, next) => {
    const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoic2tnYW1pbWdAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Zpci1hdXRoYXBwLWVmYTdkIiwiYXVkIjoiZmlyLWF1dGhhcHAtZWZhN2QiLCJhdXRoX3RpbWUiOjE2OTIzODU4MzQsInVzZXJfaWQiOiJqU0lwdkI0NEpVTVJXa2NVdndIMTcyamlUdDYzIiwic3ViIjoialNJcHZCNDRKVU1SV2tjVXZ3SDE3MmppVHQ2MyIsImlhdCI6MTY5MjM4NTgzNCwiZXhwIjoxNjkyMzg5NDM0LCJlbWFpbCI6InNrZ2FtaW1nQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJza2dhbWltZ0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.NSVmEFjbqILPD26Lw1OeNMMjMeJisG_UPq14qnOd4dAOhhoZumMC73xn6MZ0PiRpHqjwP7dN4-SDt8djUuJQksKO-2gZgBH261gBeEnKmHcRdDnh7d3VMAJLr6qE_aymBVCwDIJoQZtstcudQjLUotjWJDZAPj7xQJkcL-V4e7EkPWPVDV0JH2NVDWWpvVtxWYWO5sl4Ku6eqP7ob-VlxrV_knRddflSi1Jjykc95xMtXC6WVyf9GyiEaCezpgjq2F3X7vW1uSPJVqNWuBZDg7bDL3pLCacdvt2osNAgViNSwDC5nWlsS9DZQMn5M9audlTpyHR6qyr3pffvZk2-Fw";

    console.log("This is the token:" + idToken);
  
    try {
      // Verify the ID token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
  
      // Find the user in your MongoDB database by UID
      const user = await User.findOne({ uid: uid });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
  
      res.json({
        success: true,
        message: 'Login successful',
      });
    } catch (error) {
      console.error('Error verifying ID token:', error);
      res.status(500).json({ success: false, message: 'Verification error' });
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