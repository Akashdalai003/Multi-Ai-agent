import express from "express";
// Imports Express to create and manage the backend server.

import dotenv from "dotenv";
// Imports dotenv to load environment variables from the .env file.

import connectDB from "./config/db.js";
// Imports the function that connects our backend to MongoDB.

import router from "./routes/auth.route.js";
// Imports authentication routes such as register and login.


dotenv.config();
// Loads variables from .env into process.env.


const port = process.env.PORT;
// Gets the server port from the .env file.


const app = express();
// Creates an Express application.


app.use(express.json());
// Allows the server to receive JSON data in request bodies.


app.use("/", router);
// Registers the authentication routes with Express.
// The routes inside auth.route.js will start from "/".


app.get("/", (req, res) => {
    // Handles GET requests to the root URL.

    res.json({
        message: "Hello from Auth"
    });
    // Sends a JSON response to confirm that the Auth server is working.
});


// Function responsible for starting the application.
const startServer = async () => {

    try {

        // First connect to MongoDB.
        // The server will start only after the database connection succeeds.
        await connectDB();

        // Start the Express server after MongoDB is connected.
        app.listen(port, () => {
            console.log(`Auth started at ${port}`);
        });

    } catch (error) {

        // If MongoDB connection fails, show the error in the terminal.
        console.log("Server startup error:", error);
    }
};


// Start the application.
startServer();