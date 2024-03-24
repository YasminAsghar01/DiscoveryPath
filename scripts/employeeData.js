const mongoose = require('mongoose');
const { Employee } = require('../models/employee');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/discoverypath', { useNewUrlParser: true, useUnifiedTopology: true });

// Sample project data
const EmployeesData = [
  {
    employee_id: '1445701',
    name: 'Yasmin Asghar',
    role: 'Software Engineer Apprentice',
    email: 'yasminasghar@testing.co.uk',
    password:'test12',
    work_number: '074442019345',
    grade: 'E',
    cost_centre: '25E675',
    team: 'Software Engineering',
    home_office: 'Canary Wharf',
    manager: 'Susan Gett',
    skills: [
      {name: 'Python', proficiency_level: 'Beginner'},
      {name: 'GitHub', proficiency_level: 'Advanced'},
    ],
    project_experience: [
      {name: 'Project X', role: 'QA Tester', skills_gained: ['Python','AWS'], end_date: '2022-10-02'},
      {name: 'Project Y', role: 'Business Analyst', skills_gained: ['Python'], end_date: '2023-10-05'},
    ],
    favouriteProjects: ['Project A', 'Project D'],
    favouritePathways: [],
  },
  {
    employee_id: '1445702',
    name: 'Jane Asghar',
    role: 'Resource Manager',
    email: 'janeasghar@testing.co.uk',
    password:'test123',
    work_number: '074442019345',
    grade: 'B',
    cost_centre: '25E675',
    team: 'Cloud Engineering',
    home_office: 'Canary Wharf',
    manager: 'Susan1 Gett',
    skills: [
      {name: 'Python', proficiency_level: 'Beginner'},
      {name: 'Excel', proficiency_level: 'Intermediate'},
    ],
    project_experience: [
      {name: 'Project Z', role: 'Senior Software Engineer', skills_gained: ['JavaScript','Azure', 'Kubernetes'], end_date: '2022-08-03'},
      {name: 'Project 1', role: 'Cyber Security Engineer', skills_gained: ['Python'], end_date: '2022-12-02'},
      {name: 'Project 2', role: 'Software Engineer Apprentice', skills_gained: ['Python', 'GCP'], end_date: '2022-05-09'},
    ],
    favouriteProjects: [],
    favouritePathways: ['Pathway A'],
  },
];

const saltRounds = 10;

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
    mongoose.connection.close();
  }
}
seedProjects();
