const mongoose = require('mongoose');
const Project = require('../models/project');

// connects to MongoDB
mongoose.connect('mongodb://localhost:27017/discoverypath', { useNewUrlParser: true, useUnifiedTopology: true });


// adds sample project data
const projectsData = [
  {
    name: "Project A: Web Application Development",
    description: "Develop a web application for managing tasks and projects.",
    start_date: "2024-04-29T00:00:00.000Z",
    end_date: "2024-07-29T00:00:00.000Z",
    project_lead: "1445702",
    technologies: ["JavaScript", "GitHub", "Docker"],
    openRoles: [
      {
        job_role: "Software Engineer Apprentice",
        skill_requirement: ["JavaScript", "GitHub", "Docker"]
      },
      {
        job_role: "Senior Engineer",
        skill_requirement: ["Leadership", "Docker", "Agile"]
      }
    ],
    teamMembers: ["1445701", "1445703"],
    recommended_pathway: ["Pathway A", "Pathway B"]
  },
  {
    name: "Project B: Mobile App Development",
    description: "Create a mobile application for managing personal finances",
    start_date: "2024-05-15T00:00:00.000Z",
    end_date: "2024-09-15T00:00:00.000Z",
    project_lead: "1445704",
    technologies: ["React Native", "Firebase", "UI/UX Design"],
    openRoles: [
      {
        job_role: "Mobile App Developer",
        skill_requirement: ["React Native", "Firebase", "UI/UX Design"]
      }
    ],
    teamMembers: ["1445705", "1445702"],
    recommended_pathway: ["Pathway D", "Pathway E"]
  },
  {
    name: "Project C: Data Analysis Platform",
    description: "Build a platform for analyzing and visualizing large datasets.",
    start_date: "2024-06-01T00:00:00.000Z",
    end_date: "2024-11-01T00:00:00.000Z",
    project_lead: "1445705",
    technologies: ["Python", "Django", "PostgreSQL", "Data Visualization"],
    openRoles: [
      {
        job_role: "Data Engineer",
        skill_requirement: ["Python", "Django", "PostgreSQL"]
      }
    ],
    teamMembers: ["1445701", "1445702", "1445703"],
    recommended_pathway: [],
  },
  {
    name: "Project D: Cloud Migration Initiative",
    description: "Migrate existing on-premises infrastructure to cloud services",
    start_date: "2024-07-01T00:00:00.000Z",
    end_date: "2024-12-01T00:00:00.000Z",
    project_lead: "1445701",
    technologies: ["AWS", "Azure", "Google Cloud Platform", "DevOps"],
    openRoles: [
      {
        job_role: "Cloud Engineer",
        skill_requirement: ["AWS", "Azure", "Google Cloud Platform", "DevOps"]
      }
    ],
    teamMembers: [],
    recommended_pathway: ["Pathway G"]
  },
  {
    name: "Project E: Blockchain Application",
    description: "Design and develop a DApp leveraging blockchain technology for transactions.",
    start_date: "2024-08-01T00:00:00.000Z",
    end_date: "2025-02-01T00:00:00.000Z",
    project_lead: "1445702",
    technologies: ["Ethereum", "Solidity", "Web3.js", "Blockchain"],
    openRoles: [],
    teamMembers: ["1445705", "1445704"],
    recommended_pathway: ["Pathway H"]
  }
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


