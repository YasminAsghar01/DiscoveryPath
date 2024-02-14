const mongoose = require('mongoose');
const Joi = require('joi')

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: {type: String, required: true },
  password: {type: String, required: true },
  work_number:{type: String, required: true },
  grade: {type: String, required: true },
  cost_centre: {type: String, required: true },
  lead: {type: String, required: true },
  team: {type: String, required: true },
  home_office: {type: String, required: true },
  manager: {type: String, required: true },
  technologies: { type: [String], default: [] },
});

const Employee = mongoose.model('Employee', employeeSchema);

const validate = (data) => {
  const schema =  Joi.object({
    email: Joi.string().email().required().label("Email Address"),
    password: Joi.string().required().label("Password")
  })
  return schema.validate(data)
}

module.exports = {Employee, validate}
