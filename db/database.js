const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// Connection URI
const uri = 'mongodb://localhost:27017/discoverypath';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToMongo() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to connect
module.exports = { connectToMongo, client };
