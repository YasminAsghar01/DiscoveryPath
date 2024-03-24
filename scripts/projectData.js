// seedData.js
const mongoose = require('mongoose');
const Project = require('../models/project');
const { Employee }= require('../models/employee')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/discoverypath', { useNewUrlParser: true, useUnifiedTopology: true });


// Sample project data
const projectsData = [
  {
    name: 'Project A',
    description: 'Description for Project A',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['JavaScript', 'GitHub', 'Docker'], // Add employee IDs if you have an Employee model
    openRoles: [
      {
        job_role: 'Software Engineer Apprentice',
        skill_requirement: ['JavaScript', 'GitHub', 'Docker'],
      },
      {
        job_role: 'Senior Engineer',
        skill_requirement: ['Leadership', 'Docker'],
      },
    ],
    teamMembers: ['1445701'],
    recommended_pathway: ['Pathway A', 'Pathway B'],
  },
  {
    name: 'Project B',
    description: 'Description for Project B',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['Python', 'GitHub', 'Docker'], // Add employee IDs if you have an Employee model
    openRoles: [],
    teamMembers: ['1445702' , '1445701'],
    recommended_pathway: ['Pathway A'],
  },
  {
    name: 'Project C',
    description: 'Description for Project C',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['JavaScript', 'GitHub', 'Docker'], // Add employee IDs if you have an Employee model
    openRoles: [
      {
        job_role: 'Senior Manager',
        skill_requirement: ['JavaScript', 'Python'],
      },
      {
        job_role: 'Senior Engineer',
        skill_requirement: ['Azure', 'GCP'],
      },
    ],
    teamMembers: ['1445701'],
    recommended_pathway: ['Pathway E'],
  },
  {
    name: 'Project D',
    description: 'Description for Project C',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['JavaScript', 'GitHub', 'Docker'], // Add employee IDs if you have an Employee model
    openRoles: [
      {
        job_role: 'Senior Manager',
        skill_requirement: ['JavaScript', 'Python'],
      },
      {
        job_role: 'Senior Engineer',
        skill_requirement: ['Azure', 'GCP'],
      },
    ],
    teamMembers: ['1445702'],
    recommended_pathway: [],
  },
  {
    name: 'Project E',
    description: 'Description for Project C',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['JavaScript', 'GitHub', 'Docker'], // Add employee IDs if you have an Employee model
    openRoles: [
      {
        job_role: 'Senior Manager',
        skill_requirement: ['JavaScript', 'Python'],
      },
      {
        job_role: 'Senior Engineer',
        skill_requirement: ['Azure', 'GCP'],
      },
    ],
    teamMembers: ['1445702'],
    recommended_pathway: ['Pathway E'],
  },
  {
    name: 'Project F',
    description: 'Description for Project C',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['JavaScript', 'GitHub', 'Docker'], // Add employee IDs if you have an Employee model
    openRoles: [
      {
        job_role: 'Senior Manager',
        skill_requirement: ['JavaScript', 'Python'],
      },
      {
        job_role: 'Senior Engineer',
        skill_requirement: ['Azure', 'GCP'],
      },
    ],
    teamMembers: ['1445702'],
    recommended_pathway: ['Pathway C'],
  },
  {
    name: 'Project G',
    description: 'Description for Project C',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['JavaScript', 'GitHub', 'Docker'], // Add employee IDs if you have an Employee model
    openRoles: [
      {
        job_role: 'Senior Manager',
        skill_requirement: ['JavaScript', 'Python'],
      },
      {
        job_role: 'Senior Engineer',
        skill_requirement: ['Azure', 'GCP'],
      },
    ],
    teamMembers: ['1445702'],
    recommended_pathway: ['Pathway C', 'Pathway D'],
  },
];

// Function to seed projects
async function seedProjects() {
  try {
    // Remove existing projects
    await Project.deleteMany();

    // Seed projects
    const seededProjects = await Project.create(projectsData);

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


