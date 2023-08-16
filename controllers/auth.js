const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");



exports.postSignup = async (req, res, next) => {
     
   
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    try {
        const token = jwt.sign({ uid: user.uid, email: user.email}, process.env.JWT_SECRET);
        res.send(token);
        const saved_user = await user.save();
    } catch (error) {
        res.status(400).send(error.message);
    }

    

    // try {
    //     const saved_user = await user.save();
    //     res.json({status: true, message: "Registered successfully.", data: saved_user});
    // } catch (error) {
    //     // do logging in DB or file.
    //     res.status(400).json({status: false, message: "Something went wrong.", data: error});
    // }
};