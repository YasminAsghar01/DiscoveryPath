const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');

// handles requests made to "/profile"

//gets all employees
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

//gets a specific employee
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
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' })
    }
    if (employee.skills.find(skill => skill.name === req.body.name)) { // errors if skills already exists
      const existingSkill = employee.skills.find(skill => skill.name === req.body.name);
      if (existingSkill.proficiency_level === req.body.level) {
        return res.status(400).json({ error: 'Skill already exists and no fields to update' })
      }
      else { //updates proficiency level of skill
        existingSkill.proficiency_level = req.body.level
        await employee.save();
        return res.sendStatus(200);
      }
    }
    else { // adds a skill to users profile
      const addSkill = {
        $push: { skills: [{ name: req.body.name, proficiency_level: req.body.level }] }
      };
      const result = await Employee.updateOne({ employee_id: userId }, addSkill);
      if (result.modifiedCount === 1) {
        res.sendStatus(200)
        return
      } else {
        res.sendStatus(401)
        return
      }
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
    const addExperience = { // add project experience to users profile
      $push: { project_experience: [{ name: req.body.name, role: req.body.role, skills_gained: req.body.skills, end_date: req.body.date }] }
    };
    const result = await Employee.updateOne({ employee_id: userId }, addExperience);
    if (result.modifiedCount === 1) {
      res.sendStatus(200)
      return
    } else {
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
    const addFavourite = { // add project to users favourites
      $push: { favouriteProjects: [req.body.name] }
    };
    const result = await Employee.updateOne({ employee_id: userId }, addFavourite);
    if (result.modifiedCount === 1) {
      res.sendStatus(200)
      return
    } else {
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
    const deleteFavourite = { // remove project in favourites
      $pull: { favouriteProjects: projectName }
    };
    const result = await Employee.updateOne({ employee_id: userId }, deleteFavourite);
    if (result.modifiedCount === 1) {
      res.sendStatus(200)
      return
    } else {
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
    const addFavourite = { // add pathway to users favourites
      $push: { favouritePathways: [req.body.name] }
    };
    const result = await Employee.updateOne({ employee_id: userId }, addFavourite);
    if (result.modifiedCount === 1) {
      res.sendStatus(200)
      return
    } else {
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
    const deleteFavourite = { // remove pathway in favourites
      $pull: { favouritePathways: pathwayName }
    };
    const result = await Employee.updateOne({ employee_id: userId }, deleteFavourite);
    if (result.modifiedCount === 1) {
      res.sendStatus(200)
      return
    } else {
      res.sendStatus(401)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
