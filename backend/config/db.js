const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log('✅Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectToMongo;