const mongoose = require('mongoose');

//this creates the Project model
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date, default: Date.now },
  project_lead: { type: String, required: true },
  technologies: { type: [String], default: [] }, 
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
