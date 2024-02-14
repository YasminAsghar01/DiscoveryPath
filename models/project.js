const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  start_date: { type: Date, default: Date.now }, // Date field with a default value of the current date
  end_date: { type: Date, default: Date.now }, // Date field with a default value of the current date
  project_lead: { type: String, required: true },
  technologies: { type: [String], default: [] }, // Array of technologies, initially empty
  openRoles: [
    {
      job_role: { type: String, required: true },
      skill_requirement: { type: [String], default: []  },
    },
  ],
  teamMembers: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true },
      email_address: {type: String, required: true },
      work_number:{type: String, required: true },
      grade: {type: String, required: true },
      home_office: {type: String, required: true },
      manager: {type: String, required: true },
      technologies: { type: [String], default: [] },
    },
  ],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
