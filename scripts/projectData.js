const mongoose = require('mongoose');
const Project = require('../models/project');

// connects to MongoDB
mongoose.connect('mongodb://localhost:27017/discoverypath', { useNewUrlParser: true, useUnifiedTopology: true });


// adds sample project data
const projectsData = [
  {
    name: 'Project A',
    description: 'Description for Project A',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['JavaScript', 'GitHub', 'Docker'],
    openRoles: [
      {
        job_role: 'Software Engineer Apprentice',
        skill_requirement: ['JavaScript', 'GitHub', 'Docker'],
      },
      {
        job_role: 'Senior Engineer',
        skill_requirement: ['Leadership', 'Docker', 'Agile'],
      },
    ],
    teamMembers: ['1445701'],
    recommended_pathway: ['Pathway A', 'Pathway B', 'Pathway C'],
  },
  {
    name: 'Project B',
    description: 'Description for Project B',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445701',
    technologies: ['Python', 'GitHub', 'Docker'],
    openRoles: [],
    teamMembers: ['1445703' , '1445704'],
    recommended_pathway: ['Pathway B', 'Pathway F'],
  },
  {
    name: 'Project C',
    description: 'Description for Project C',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['Figma', 'GitHub', 'AWS'],
    openRoles: [
      {
        job_role: 'Software Engineer',
        skill_requirement: ['JavaScript', 'AWS', 'React'],
      },
      {
        job_role: 'UI/UX Designer',
        skill_requirement: ['Figma', 'AWS'],
      },
    ],
    teamMembers: ['1445704'],
    recommended_pathway: ['Pathway D'],
  },
  {
    name: 'Project D',
    description: 'Description for Project D',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445704',
    technologies: ['Python', 'Cypress', 'Jest'],
    openRoles: [
      {
        job_role: 'QA Engineer',
        skill_requirement: ['Cypress', 'Jest'],
      },
      {
        job_role: 'FrontEnd Tester',
        skill_requirement: ['Python', 'Cypress'],
      },
    ],
    teamMembers: ['1445702', '1445701'],
    recommended_pathway: [],
  },
  {
    name: 'Project E',
    description: 'Description for Project E',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445701',
    technologies: ['JavaScript', 'GitHub', 'Docker'],
    openRoles: [
      {
        job_role: 'Senior Manager',
        skill_requirement: ['JavaScript', 'Python'],
      },
      {
        job_role: 'Software Engineer',
        skill_requirement: ['Azure', 'GCP'],
      },
    ],
    teamMembers: ['1445703', '1445705', '1445704'],
    recommended_pathway: ['Pathway A', 'Pathway C'],
  },
  {
    name: 'Project F',
    description: 'Description for Project F',
    start_date: new Date(),
    end_date: new Date(),
    project_lead: '1445702',
    technologies: ['Python', 'GitHub', 'CloverDX'],
    openRoles: [
      {
        job_role: 'Data Analyst',
        skill_requirement: ['CloverDX', 'PowerBI'],
      },
    ],
    teamMembers: [],
    recommended_pathway: ['Pathway F', 'Pathway I'],
  },
];


async function addProjects() {
  try {

    await Project.deleteMany();


    const seededProjects = await Project.create(projectsData);

    console.log('Projects seeded successfully:', seededProjects);
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {

    mongoose.connection.close();
  }
}

addProjects();


