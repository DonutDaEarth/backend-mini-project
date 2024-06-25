const express = require('express');
const app = express();
const path = require('path');
const productRoute = require('./src/routes/ProductRoute');
const userRoute = require('./src/routes/UserRoute');
const orderRoute = require('./src/routes/OrderRoute');
// Verify Token Function
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split the bearer token
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Call the next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

// Use the verifyToken function for all routes except /authentication
app.use((req, res, next) => {
    if (req.path === '/authenticate' || req.path === '/user_create') {
        next();
    } else {
        verifyToken(req, res, next);
    }
});

    
app.use(express.json());
// To display static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', productRoute);
app.use('/', userRoute);
app.use('/', orderRoute);

// Start the server
const PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
