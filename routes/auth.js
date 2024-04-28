const express = require('express');
const router = express.Router();
const { Employee, validate } = require('../models/employee');
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// API endpoint for "/login" handling post request
router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body); //validates users email and password
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await Employee.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid email" });
    const validPassword = await bcrypt.compare(req.body.password, user.password); //compares users password with hashed password
    if (!validPassword)
      return res.status(401).send({ message: "Invalid password" });
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ id: user._id, employeeId: user.employee_id, name:user.name, role:user.role }, secretKey, { expiresIn: '7d' }); //creates JWT
    res.send({ data: token, message: "Logged in successfully" });
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
