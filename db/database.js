const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/discoverypath';

// creating MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// connecting to MongoDB
async function connectToMongo() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connectToMongo, client };
