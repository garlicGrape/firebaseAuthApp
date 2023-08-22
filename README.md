# Node.js Firebase Authentication and MongoDB Backend

This is a Node.js application that utilizes Firebase Authentication for user verification and MongoDB as the database. It provides two separate APIs: one for regular users and another for the admin CMS. Users can sign up, log in, and manage their account information.

## NPM Packages Used

This project utilizes the following NPM packages to create a robust authentication and data management system:

- [Firebase Admin](https://www.npmjs.com/package/firebase-admin): Provides backend access to Firebase services, enabling seamless integration with the frontend.
- [Firebase](https://www.npmjs.com/package/firebase): Offers the Firebase JavaScript SDK for frontend interaction, used in combination with EJS to create dynamic views.
- [Express](https://www.npmjs.com/package/express): A fast, unopinionated, and minimalist web framework for Node.js, used to create API endpoints and manage routing.
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Enables the generation and verification of JSON Web Tokens (JWTs) for secure authentication.
- [Body-parser](https://www.npmjs.com/package/body-parser): Middleware to parse incoming request bodies in Express routes, facilitating data handling.
- [Dotenv](https://www.npmjs.com/package/dotenv): Allows loading environment variables from a `.env` file to safeguard sensitive database information.
- [Mongoose](https://www.npmjs.com/package/mongoose): Facilitates schema creation for MongoDB, automating data population for users and admins.

## Getting Started

1. Clone this repository to your local machine.
2. Install the required NPM packages using `npm install`.
3. Create a `.env` file in the project root and add the necessary environment variables.
4. Set up Firebase authentication and obtain your Firebase configuration data.
5. Configure your MongoDB connection.
6. Run the application using `npm start`.