// seedData.js
const mongoose = require('mongoose');
const Pathway = require('../models/pathway');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/discoverypath', { useNewUrlParser: true, useUnifiedTopology: true });


// Sample project data
const pathwaysData = [
  {
    name: 'Pathway A',
    description: 'Description for Pathway A',
    duration: "3 months",
    technologies: ['JavaScript', 'GitHub', 'AWS'], // Add employee IDs if you have an Employee model
    certification: 'AZ-900',
    link: "http://www.w3schools.com",
    completedUsers: [
      {
        name: 'Yasmin Asghar',
        email_address: 'yasminasghar@testing.co.uk',
      },
      {
        name: 'Yasmin Asghar 2',
        email_address: 'yasminasghar2@testing.co.uk',
      },
    ],
  },
  {
    name: 'Pathway B',
    description: 'Description for Pathway B',
    duration: "3 weeks",
    technologies: ['Python', 'GitHub', 'AWS'], // Add employee IDs if you have an Employee model
    certification: 'AZ-300',
    link: "http://www.w3schools.com",
    completedUsers: [
      {
        name: 'Yasmin Asghar 3',
        email_address: 'yasminasghar3@testing.co.uk',
      },
      {
        name: 'Yasmin Asghar 4',
        email_address: 'yasminasghar4@testing.co.uk',
      },
    ],
  },
  {
    name: 'Pathway C',
    description: 'Description for Pathway C',
    duration: "1 months",
    technologies: ['JavaScript', 'GitHub', 'AWS'], // Add employee IDs if you have an Employee model
    certification: 'AZ-900',
    link: "http://www.w3schools.com",
    completedUsers: [],
  },
  {
    name: 'Pathway D',
    description: 'Description for Pathway D',
    duration: "3 months",
    technologies: ['JavaScript', 'GitHub', 'AWS'], // Add employee IDs if you have an Employee model
    certification: '',
    link: "http://www.w3schools.com",
    completedUsers: [
      {
        name: 'Yasmin Asghar',
        email_address: 'yasminasghar@testing.co.uk',
      },
      {
        name: 'Yasmin Asghar 2',
        email_address: 'yasminasghar@testing.co.uk',
      },
    ],
  },
  {
    name: 'Pathway E',
    description: 'Description for Pathway E',
    duration: "2 days",
    technologies: ['JavaScript', 'GitHub', 'AWS'], // Add employee IDs if you have an Employee model
    certification: 'AZ-900',
    link: "http://www.w3schools.com",
    completedUsers: [
      {
        name: 'Yasmin Asghar',
        email_address: 'yasminasghar@testing.co.uk',
      },
      {
        name: 'Yasmin Asghar 2',
        email_address: 'yasminasghar@testing.co.uk',
      },
    ],
  },
];


async function seedPathways() {
  try {
    // Remove existing projects
    await Pathway.deleteMany();

    // Seed projects
    const seededPathways = await Pathway.create(pathwaysData);

    console.log('Projects seeded successfully:', seededPathways);
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the seedProjects function
seedPathways();



