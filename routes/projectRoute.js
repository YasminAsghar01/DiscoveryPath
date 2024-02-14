// projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Define your project-related routes

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
