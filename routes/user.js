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

module.exports = router;
