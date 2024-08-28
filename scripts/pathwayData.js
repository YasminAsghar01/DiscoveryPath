const mongoose = require('mongoose');
const Pathway = require('../models/pathway');

// connects to MongoDB
mongoose.connect('mongodb://localhost:27017/discoverypath', { useNewUrlParser: true, useUnifiedTopology: true });


// adds sample project data
const pathwaysData = [
  {
    name: "Pathway A",
    description: "This pathway is designed for web developers using GitHub and Azure cloud services.",
    duration: "3 months",
    technologies: ["GitHub", "Azure"],
    certification: "Microsoft Azure Fundamentals (AZ-900)",
    link: "http://www.w3schools.com",
    completedUsers: ["1445702", "1445701"]
  },
  {
    name: "Pathway B",
    description: "Embark on a journey to become a data scientist using Python and AWS ",
    duration: "6 months",
    technologies: ["Python", "AWS"],
    certification: "AWS Certified Machine Learning Specialty",
    link: "http://www.python.org",
    completedUsers: ["1445703"]
  },
  {
    name: "Pathway C",
    description: "Learn ethical hacking techniques and cybersecurity practices.",
    duration: "4 months",
    technologies: ["Kali Linux", "Wireshark"],
    certification: "Certified Ethical Hacker (CEH)",
    link: "http://www.kali.org",
    completedUsers: []
  },
  {
    name: "Pathway D",
    description: "Become a proficient mobile application developer using Flutter",
    duration: "9 months",
    technologies: ["Flutter", "Dart"],
    certification: "Google Associate Android Developer (GADD)",
    link: "http://www.flutter.dev",
    completedUsers: ["1445705"]
  },
  {
    name: "Pathway E",
    description: "Automate software development processes with Jenkins and Docker",
    duration: "5 months",
    technologies: ["Jenkins", "Docker"],
    certification: "Docker Certified Associate",
    link: "http://www.jenkins.io",
    completedUsers: ['1445703', '1445704', '1445702']
  },
  {
    name: "Pathway F",
    description: "Master the art of full stack development using JavaScript",
    duration: "6 months",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    certification: "MERN Stack Developer Certification",
    link: "http://www.reactjs.org",
    completedUsers: ["1445701"]
  },
  {
    name: "Pathway G",
    description: "Dive into the world of artificial intelligence and machine learning",
    duration: "8 months",
    technologies: ["Python", "TensorFlow", "PyTorch"],
    certification: "AI and Machine Learning Certification",
    link: "http://www.tensorflow.org",
    completedUsers: []
  },
  {
    name: "Pathway H",
    description: "Explore cloud computing solutions offered by Google Cloud Platform (GCP).",
    duration: "4 months",
    technologies: ["Google Cloud Platform", "Compute Engine", "Cloud Storage", "Kubernetes"],
    certification: "Google Cloud Associate Cloud Engineer",
    link: "http://www.cloud.google.com",
    completedUsers: ['1445702', '1445705']
  },
  {
    name: "Pathway I",
    description: "Develop decentralized applications (DApps) using Ethereum blockchains",
    duration: "7 months",
    technologies: ["Ethereum", "Solidity", "Web3.js"],
    certification: "Certified Blockchain Developer",
    link: "http://www.ethereum.org",
    completedUsers: []
  },
];

async function addPathways() {
  try {

    await Pathway.deleteMany();

    const seededPathways = await Pathway.create(pathwaysData);

    console.log('Projects seeded successfully:', seededPathways);
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {

    mongoose.connection.close();
  }
}

addPathways();



