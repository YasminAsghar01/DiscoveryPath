const express = require('express');
const router = express.Router();
const { Employee, validate } = require('../models/employee');
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Define your project-related routes

router.post('/', async (req, res) => {

  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await Employee.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid email or password" });
    console.log(user.password, req.body.password)
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(validPassword)
    if (!validPassword)
      return res.status(401).send({ message: "Invalid password" });
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ id: user._id, name:user.name }, secretKey, { expiresIn: '7d' });
    res.send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
