// seedData.js
const mongoose = require('mongoose');
const { Employee } = require('../models/employee');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/discoverypath', { useNewUrlParser: true, useUnifiedTopology: true });

// Sample project data
const EmployeesData = [
  {
    name: 'Yasmin Asghar',
    role: 'Software Engineer Apprentice',
    email: 'yasminasghar@testing.co.uk',
    password:'test12',
    work_number: '074442019345',
    grade: 'E',
    cost_centre: '25E675',
    lead: 'John Applegreen',
    team: 'Software Engineering',
    home_office: 'Canary Wharf',
    manager: 'Susan Gett',
    technologies: ['Python', 'GitHub'],
  },
  {
    name: 'Jane Asghar',
    role: 'Software Engineer',
    email: 'janeasghar@testing.co.uk',
    password:'test123',
    work_number: '074442019345',
    grade: 'B',
    cost_centre: '25E675',
    lead: 'John1 Applegreen',
    team: 'Cloud Engineering',
    home_office: 'Canary Wharf',
    manager: 'Susan1 Gett',
    technologies: ['Python', 'AWS'],
  },
];

const saltRounds = 10; // Number of salt rounds for bcrypt

  // Function to seed projects
async function seedProjects() {
  try {
    // Remove existing projects
    await Employee.deleteMany();

    const hashedEmployeesData =
    await Promise.all(EmployeesData.map(async (employeeData) => {
      const hashedPassword = await bcrypt.hash(employeeData.password, saltRounds);
      return {
        ...employeeData,
        password: hashedPassword, // Replace plain password with hashed password
      };
    }));

    const seededProjects = await Employee.create(hashedEmployeesData);

    console.log('Projects seeded successfully:', seededProjects);
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the seedProjects function
seedProjects();
