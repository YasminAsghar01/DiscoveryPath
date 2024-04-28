const express = require('express');
const router = express.Router();
const Pathway = require('../models/pathway');

// handles requests made to "/pathways"

//gets all pathways
router.get('/', async (req, res) => {
  try {
    const pathways = await Pathway.find();
    res.json(pathways);
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Gets a specific pathway by name
router.get('/:pathwayName', async (req, res) => {

  const { pathwayName } = req.params;

  try {
    const pathway = await Pathway.findOne({ name: pathwayName });
    if (!pathway) {
      return res.status(404).json({ error: 'Pathway not found' });
    }
    res.json(pathway);
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// creates new pathway
router.post('/:pathwayName', async (req, res) => {

  const { pathwayName } = req.params;

  try {
    const existingPathway = await Pathway.findOne({ name: pathwayName }); //checks if pathway exists
    if (existingPathway) {
      return res.status(409).json({ error: 'Pathway already exists' });
    }
    const result = await Pathway.create({ name: pathwayName, description: req.body.description, duration: req.body.duration, certification: req.body.certification, link: req.body.pathway_link, technologies: req.body.skills_gained });
    if (result instanceof Pathway) {
      res.sendStatus(200)
      return
    } else {
      res.sendStatus(500)
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
