const mongoose = require('mongoose');

const pathwaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true }, // Date field with a default value of the current date
  technologies: { type: [String], default: [] }, // Array of technologies, initially empty
  certification: { type: String, required: false},
  link : { type: String, required: true},
  completedUsers: [
    {
      name: { type: String, required: true },
      email_address: {type: String, required: true },
    },
  ],
});

const Pathway = mongoose.model('Pathway', pathwaySchema);

module.exports = Pathway;
