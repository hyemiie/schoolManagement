const mongoose = require('mongoose');
require('dotenv').config();


const uri = process.env.DATABASE_CONNECT_URI;


async function connectDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB using Mongoose!');


        return mongoose.connection; 
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
        throw error;
    }
}

module.exports = connectDatabase; 
