const dotenv = require('dotenv');
const admin = require('firebase-admin');
const bodyParser = require('body-parser')
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

  console.log("Started Script");
// After successful signup
const user = firebase.auth().currentUser;

if (user) {
  user.getIdToken(/* forceRefresh */ true)
    .then(idToken => {
      // Send the ID token to the server
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: idToken }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the response from the server
      })
      .catch(error => {
        console.error("Error sending ID token:", error);
      });
    })
    .catch(error => {
      console.error("Error getting ID token:", error);
    });
}
