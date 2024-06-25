const model = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// Generate a JWT token
const generateToken = (userId) => {
    const secretKey = 'your_secret_key'; // Replace with your own secret key
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Set the expiration time as per your requirement
    return token;
};
// Verify the JWT token
exports.create = async (req, res) => {
    console.log(req.body);
    const {username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            status: 'error',
            message: 'Please provide all required fields'
        });
    } else {
        try {
            const result = await model.create(username, password);
            res.status(201).json({ message: `User created successfully with NAME ${result}` });
        } catch (error) {
            res.status(400).json({ message: 'Error creating user'+ error.message });
        }
    }
};

exports.read = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await model.read(id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching users' });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const {username, password } = req.body;
    if (!username || !id || !password) {
        res.status(400).json({
            status: 'error',
            message: 'Please provide all required fields'
        });
    } else {
        try {
            const result = await model.update(id, username, password);
            if (!result) {
                res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Product updated successfully',
                    data: result
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
};

exports.delete = async (req, res) => {
    const user_id = req.params.id;
    try {
        const result = await model.delete(user_id);
        res.status(201).json({ message: `User created successfully DELETED` });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user' });
    }
};

exports.authenticate = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            status: 'error',
            message: 'Please provide username and password'
        });
    } else {
        try {
            const result = await model.authenticate(username, password);
            if (result) {
                const token = generateToken(result.userId);
                res.status(200).json({
                    status: 'success',
                    message: 'Authentication successful',
                    token: token
                });
            } else {
                res.status(401).json({
                    status: 'error',
                    message: 'Invalid username or password'
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
};
