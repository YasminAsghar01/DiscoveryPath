const mongoose = require('mongoose');

//this creates the Pathway model
const pathwaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  technologies: { type: [String], default: [] }, 
  certification: { type: String, required: false},
  link : { type: String, required: true},
  completedUsers: [{type: String}],
});

const Pathway = mongoose.model('Pathway', pathwaySchema);

module.exports = Pathway;
