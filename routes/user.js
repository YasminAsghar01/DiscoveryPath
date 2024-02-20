// projectRoutes.js
const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');

// Get a specific pathway by name
router.get('/:userName', async (req, res) => {

  const { userName } = req.params;

  try {
    const employee = await Employee.findOne({ name: userName });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:userName/skills', async (req, res) => {

  const { userName } = req.params;

  try {
    const employee = await Employee.findOne({ name: userName });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
      // also if skills exists just update with new level
    const addSkill = {
      $push: { skills: [{name: req.body.name, proficiency_level: req.body.level}] } // Add a new attribute to the document
    };
    const result = await Employee.updateOne({ name: userName }, addSkill);
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
    } else {
      console.log('No documents matched the filter');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:userName/experience', async (req, res) => {

  const { userName } = req.params;

  try {
    const employee = await Employee.findOne({ name: userName });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
      // also if skills exists just update with new level
    const addExperience = {
      $push: { project_experience: [{name: req.body.name, role: req.body.role, skills_gained: req.body.skills, end_date: req.body.date}] } // Add a new attribute to the document
    };
    const result = await Employee.updateOne({ name: userName }, addExperience);
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
    } else {
      console.log('No documents matched the filter');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
