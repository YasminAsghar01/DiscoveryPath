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
      skill_requirement: { type: [String], default: []},
    },
  ],
  teamMembers : [{type: String}],
  recommended_pathway: [{type: String}],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
