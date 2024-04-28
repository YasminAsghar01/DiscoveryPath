const mongoose = require('mongoose');
const { Employee } = require('../models/employee');
const bcrypt = require('bcrypt');

// connects to MongoDB
mongoose.connect('mongodb://localhost:27017/discoverypath', { useNewUrlParser: true, useUnifiedTopology: true });

// add sample employee data
const EmployeesData = [
  {
    employee_id: '1445701',
    name: 'John Doe',
    role: 'Software Engineer',
    email: 'john.doe@example.com',
    password: 'test12',
    work_number: '074442019345',
    grade: 'E',
    cost_centre: '25E675',
    team: 'Software Engineering',
    home_office: 'Canary Wharf',
    manager: 'Alice Smith',
    skills: [
      { name: 'Python', proficiency_level: 'Beginner' },
      { name: 'GitHub', proficiency_level: 'Advanced' },
    ],
    project_experience: [
      { name: 'Project X', role: 'QA Tester', skills_gained: ['Python', 'AWS'], end_date: '2022-10-02' },
      { name: 'Project Y', role: 'Business Analyst', skills_gained: ['Python'], end_date: '2023-10-05' },
    ],
    favouriteProjects: ['Project A', 'Project D'],
    favouritePathways: ['Pathway C'],
  },
  {
    employee_id: '1445702',
    name: 'Alice Smith',
    role: 'Resource Manager',
    email: 'alice.smith@example.com',
    password: 'password123',
    work_number: '074442019346',
    grade: 'B',
    cost_centre: '25E675',
    team: 'Software Engineering',
    home_office: 'London Bridge',
    manager: 'Bob Johnson',
    skills: [
      { name: 'Agile', proficiency_level: 'Intermediate' },
    ],
    project_experience: [
      { name: 'Project Z', role: 'Product Owner', skills_gained: ['Agile', 'Product Management'], end_date: '2022-09-30' },
      { name: 'Project W', role: 'Scrum Master', skills_gained: ['Agile'], end_date: '2023-09-25' },
    ],
    favouriteProjects: ['Project B', 'Project E'],
    favouritePathways: [],
  },
  {
    employee_id: '1445703',
    name: 'Emma Johnson',
    role: 'Data Analyst',
    email: 'emma.johnson@example.com',
    password: 'securepass',
    work_number: '074442019347',
    grade: 'C',
    cost_centre: '25E675',
    team: 'Software Engineering',
    home_office: 'Liverpool Street',
    manager: 'Alice Smith',
    skills: [
      { name: 'SQL', proficiency_level: 'Intermediate' },
      { name: 'CloverDX', proficiency_level: 'Beginner' },
    ],
    project_experience: [
      { name: 'Project M', role: 'Data Analyst', skills_gained: ['SQL'], end_date: '2022-11-15' },
      { name: 'Project N', role: 'Data Scientist', skills_gained: ['SQL', 'Python'], end_date: '2023-12-20' },
    ],
    favouriteProjects: [],
    favouritePathways: ['Pathway D'],
  },
  {
    employee_id: '1445704',
    name: 'Michael Brown',
    role: 'QA Engineer',
    email: 'michael.brown@example.com',
    password: 'password1234',
    work_number: '074442019348',
    grade: 'B',
    cost_centre: '25E675',
    team: 'Software Engineering',
    home_office: 'Waterloo',
    manager: 'Bob Johnson',
    skills: [
      { name: 'Jest', proficiency_level: 'Advanced' },
      { name: 'Cypress', proficiency_level: 'Intermediate' },
    ],
    project_experience: [
      { name: 'Project P', role: 'QA Engineer', skills_gained: ['Manual Testing', 'Automated Testing'], end_date: '2022-08-25' },
      { name: 'Project Q', role: 'QA Lead', skills_gained: ['Manual Testing'], end_date: '2023-08-30' },
    ],
    favouriteProjects: ['Project G'],
    favouritePathways: [],
  },
  {
    employee_id: '1445705',
    name: 'Sarah Lee',
    role: 'UI/UX Designer',
    email: 'sarah.lee@example.com',
    password: 'userpass',
    work_number: '074442019349',
    grade: 'A',
    cost_centre: '25E675',
    team: 'Software Engineering',
    home_office: 'Oxford Circus',
    manager: 'Alice Smith',
    skills: [
      { name: 'Figma', proficiency_level: 'Advanced' },
    ],
    project_experience: [
      { name: 'Project R', role: 'UI Designer', skills_gained: ['Figma'], end_date: '2022-08-25' }
    ],
    favouriteProjects: [],
    favouritePathways: [],
  },
];

const saltRounds = 10;

async function addEmployees() {
  try {

    await Employee.deleteMany();

    const hashedEmployeesData =
      await Promise.all(EmployeesData.map(async (employeeData) => {
        const hashedPassword = await bcrypt.hash(employeeData.password, saltRounds);
        return {
          ...employeeData,
          password: hashedPassword, // replace plain password with hashed password and stores in database
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
addEmployees();
