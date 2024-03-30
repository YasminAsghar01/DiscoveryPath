// projectRoutes.js
const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:userId/skills', async (req, res) => {
  const { userId } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // also if skills exists just update with new level
    const addSkill = {
      $push: { skills: [{ name: req.body.name, proficiency_level: req.body.level }] } // Add a new attribute to the document
    };
    const result = await Employee.updateOne({ employee_id: userId }, addSkill);
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
      res.sendStatus(200)
      return
    } else {
      console.log('No documents matched the filter 1');
      res.sendStatus(401)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:userId/experience', async (req, res) => {

  const { userId } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const addExperience = {
      $push: { project_experience: [{ name: req.body.name, role: req.body.role, skills_gained: req.body.skills, end_date: req.body.date }] }
    };
    const result = await Employee.updateOne({ employee_id: userId }, addExperience);
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
      res.sendStatus(200)
      return
    } else {
      console.log('No documents matched the filter 2 ');
      res.sendStatus(401)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:userId/favouriteProject', async (req, res) => {

  const { userId } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // also if skills exists just update with new level
    const addFavourite = {
      $push: { favouriteProjects: [req.body.name] } // Add a new attribute to the document
    };
    const result = await Employee.updateOne({ employee_id: userId }, addFavourite);
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
      res.sendStatus(200)
      return

    } else {
      console.log('No documents matched the filter 3');
      res.sendStatus(401)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:userId/favouriteProject/:projectName', async (req, res) => {

  const { userId, projectName } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // also if skills exists just update with new level
    const deleteFavourite = {
      $pull: { favouriteProjects: projectName } // Add a new attribute to the document
    };
    const result = await Employee.updateOne({ employee_id: userId }, deleteFavourite);
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
      res.sendStatus(200)
      return
    } else {
      console.log('No documents matched the filter 4');
      res.sendStatus(401)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:userId/favouritePathway', async (req, res) => {

  const { userId } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // also if skills exists just update with new level
    const addFavourite = {
      $push: { favouritePathways: [req.body.name] } // Add a new attribute to the document
    };
    const result = await Employee.updateOne({ employee_id: userId }, addFavourite);
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
      res.sendStatus(200)
      return

    } else {
      console.log('No documents matched the filter 3');
      res.sendStatus(401)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:userId/favouritePathway/:pathwayName', async (req, res) => {

  const { userId, pathwayName } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id: userId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // also if skills exists just update with new level
    const deleteFavourite = {
      $pull: { favouritePathways: pathwayName } // Add a new attribute to the document
    };
    const result = await Employee.updateOne({ employee_id: userId }, deleteFavourite);
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
      res.sendStatus(200)
      return
    } else {
      console.log('No documents matched the filter 4');
      res.sendStatus(401)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
