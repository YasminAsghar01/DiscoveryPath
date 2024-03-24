// projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific project by ID
router.get('/:projectName', async (req, res) => {

  const { projectName } = req.params;

  try {
    const project = await Project.findOne({ name: projectName });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:projectName', async (req, res) => {

  const { projectName } = req.params;

  try {
    const existingProject = await Project.findOne({ name: projectName });
    if (existingProject) {
      return res.status(404).json({ error: 'Project already exists' });
    }
    const result = await Project.create({ name: projectName, description: req.body.description, start_date: req.body.start_date, end_date: req.body.end_date, project_lead: req.body.project_lead, technologies: req.body.technologies });
    if (result instanceof Project) {
      console.log('Document created successfully');
      res.sendStatus(200)
      return
    } else {
      console.log('Document not created');
      res.sendStatus(500)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
