const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Pathway = require('../models/pathway')
const { Employee } = require('../models/employee');

// finds projects to suggest to specific user
router.get('/projects/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const employeeRole = employee.role // uses users role and skills to find projects of interest
    const employeeSkills = employee.skills.map(skill => skill.name)
    let allSuggestions = await Project.find({ $or: [{ "openRoles.job_role": employeeRole }, { technologies: { $in: employeeSkills } }], openRoles: { $exists: true, $ne: [] } }).limit(4)
    if (allSuggestions.length < 4) { // adds extra projects f less that 4 found
      var newSuggestions = await Project.find({ openRoles: { $exists: true, $ne: [] }}).limit(4 - allSuggestions.length)
      allSuggestions = allSuggestions.concat(newSuggestions)
    }
    res.json(allSuggestions)
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// finds pathways to suggest to specific user
router.get('/pathways/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const employeeSkills = employee.skills.map(skill => skill.name) // uses users skills to find pathways of interest
    var allSuggestions = await Pathway.find({ technologies: { $in: employeeSkills } }).limit(4)
    if (allSuggestions.length < 4) { // adds extra pathways if less that 4 found
      var newSuggestions = await Pathway.find({ technologies: {$not: { $in: employeeSkills }}}).limit(4 - allSuggestions.length)
      allSuggestions = allSuggestions.concat(newSuggestions)
    }
    res.json(allSuggestions)
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
