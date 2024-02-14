// projectRoutes.js
const express = require('express');
const router = express.Router();
const Pathway = require('../models/pathway');

// Define your pathway-related routes

router.get('/', async (req, res) => {
  try {
    const pathways = await Pathway.find();
    res.json(pathways);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific pathway by name
router.get('/:pathwayName', async (req, res) => {

  const { pathwayName } = req.params;

  try {
    const pathway = await Pathway.findOne({ name: pathwayName });
    if (!pathway) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(pathway);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
