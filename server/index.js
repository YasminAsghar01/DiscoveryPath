const express = require('express');
const projectRoute = require('../routes/projectRoute');
const pathwayRoute = require('../routes/pathwayRoute');
const userRoute  = require('../routes/auth')
const employeeRoute = require('../routes/user')
const suggestionRoute =  require('../routes/suggestions')
const { connectToMongo, client } = require('../db/database');
const cors = require('cors');
const allowedOrigin = ['http:/localhost:3000'];

const app = express();

app.use(express.json()); //process json format

app.use(cors())

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', allowedOrigin); // only allow frontend access
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

// Connect to MongoDB
connectToMongo();

// all route definitions
app.use('/projects', projectRoute);
app.use('/pathways', pathwayRoute);
app.use('/login', userRoute);
app.use('/profiles', employeeRoute );
app.use('/suggestions', suggestionRoute)

// start  server
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close the MongoDB connection when the application exits
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

module.exports = server;
