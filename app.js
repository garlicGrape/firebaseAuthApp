const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path'); // We'll use this to manage file paths

// Load environment variables from .env
dotenv.config();

// Initialize Firebase Admin SDK with environment variables
const serviceAccount = {
    type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  };
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied.');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  };
  

// Use the routes from separate files
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

// Mount the routes with authentication
app.use('/admin', verifyToken, adminRoutes); // Apply verifyToken middleware for admin routes
app.use('/users', verifyToken, userRoutes); // Apply verifyToken middleware for user routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB')
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));