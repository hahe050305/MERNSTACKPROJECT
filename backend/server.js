const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/placementDB');

// Define user schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        res.send('User registered successfully!');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Error during login');
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Backend server is running on port 5000');
});
