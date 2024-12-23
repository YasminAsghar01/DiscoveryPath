const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// handles requests made to "/projects"

//gets all projects
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

// gets a specific project by name
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
    let project = await Project.findOne({ name: projectName }); // Checks if project exists
    if (project) {
      const updatedFields = Object.keys(req.body); // If project exists, check if any fields are being updated
      if (updatedFields.length === 0) {
        return res.status(400).json({ error: 'Project already exists and No fields to update' });
      }
      project.teamMembers.push(req.body.employee_id); // adds employee as team member on project
      project = await project.save();
      res.sendStatus(200)
      return
    } else { // If the project doesn't exist, create a new one
      project = await Project.create({ name: projectName, description: req.body.description, start_date: req.body.start_date, end_date: req.body.end_date, project_lead: req.body.project_lead, technologies: req.body.technologies, teamMembers: req.body.team_members })
      if (project instanceof Project) {
        res.sendStatus(200)
        return
      } else {
        res.sendStatus(500)
        return
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
