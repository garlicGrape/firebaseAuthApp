const User = require('../models/user');
const Groupcode = require('../models/groupcode');

const admin = require('firebase-admin');


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

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
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

      // console.log("Decoded data: ");
      // console.log(decodedToken);
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
      const email = decodedToken.email.trim();

      // console.log("This is the email:" + email);
      const  user = await User.findOne({email: email});
      // console.log("This is the updated user: " + user);
      
     await user.updateOne({role: 'user'});
     
     const gc = await Groupcode.findOne({groupCode: 4444});

     if(!gc) {
      console.log("Creating  groupcode");
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
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
      console.log(ex);
    }    
  };
  
  
  
