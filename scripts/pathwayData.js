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
    technologies: ['GitHub', 'Azure'],
    certification: 'AZ-900',
    link: "http://www.w3schools.com",
    completedUsers: [ '1445702' , '1445701'],
  },
  {
    name: 'Pathway B',
    description: 'Description for Pathway B',
    duration: "3 weeks",
    technologies: ['GitHub'],
    certification: 'GitHub Actions',
    link: "http://www.w3schools.com",
    completedUsers: [ '1445703'],
  },
  {
    name: 'Pathway C',
    description: 'Description for Pathway C',
    duration: "1 months",
    technologies: ['Cloud', 'Azure'],
    certification: 'AZ-300',
    link: "http://www.w3schools.com",
    completedUsers: [],
  },
  {
    name: 'Pathway D',
    description: 'Description for Pathway D',
    duration: "3 months",
    technologies: ['AWS'],
    certification: 'AWS-Practitioner',
    link: "http://www.w3schools.com",
    completedUsers: ['1445705'],
  },
  {
    name: 'Pathway E',
    description: 'Description for Pathway E',
    duration: "2 days",
    technologies: ['Consulting'],
    certification: '',
    link: "http://www.w3schools.com",
    completedUsers: [ '1445703', '1445704', '1445702'],
  },
  {
    name: 'Pathway F',
    description: 'Description for Pathway F',
    duration: "7 days",
    technologies: ['Python'],
    certification: 'Python Basics',
    link: "http://www.w3schools.com",
    completedUsers: [ '1445701'],
  },
  {
    name: 'Pathway G',
    description: 'Description for Pathway G',
    duration: "2 weeks",
    technologies: ['HTML', 'CSS'],
    certification: '',
    link: "http://www.w3schools.com",
    completedUsers: [],
  },
  {
    name: 'Pathway H',
    description: 'Description for Pathway H',
    duration: "12 months",
    technologies: ['Java'],
    certification: 'Java Beginner',
    link: "http://www.w3schools.com",
    completedUsers: [ '1445702'],
  },
  {
    name: 'Pathway I',
    description: 'Description for Pathway I',
    duration: "5 days",
    technologies: ['Figma', 'PowerBI', 'CloverDX'],
    certification: 'DataandDesign-200 ',
    link: "http://www.w3schools.com",
    completedUsers: [ '1445702', '1445705'],
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



