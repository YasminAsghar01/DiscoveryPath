const express = require('express');
const projectRoute = require('../routes/projectRoute');
const pathwayRoute = require('../routes/pathwayRoute');
const userRoute  = require('../routes/auth')
const employeeRoute = require('../routes/user')
const suggestionRoute =  require('../routes/suggestions')
const { connectToMongo, client } = require('../db/database');
const cors = require('cors');

// Express application
const app = express();
app.use(cors())
app.use(express.json());

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

// Connect to MongoDB
connectToMongo();

app.use('/projects', projectRoute);
app.use('/pathways', pathwayRoute);
app.use('/login', userRoute);
app.use('/profile', employeeRoute );
app.use('/suggestions', suggestionRoute)

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close the MongoDB connection when the application exits
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
