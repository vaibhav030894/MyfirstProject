const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/authMiddleware');

// Get all projects
router.get('/', auth, async (req,res)=>{
  const projects = await Project.find({owner:req.user.id});
  res.json(projects);
});

// Get single project
router.get('/:id', auth, async (req,res)=>{
  const project = await Project.findOne({_id:req.params.id,owner:req.user.id});
  if(!project) return res.status(404).json({message:"Project not found"});
  res.json(project);
});

// Create project
router.post('/', auth, async (req,res)=>{
  const {title,description} = req.body;
  const project = new Project({title,description,owner:req.user.id});
  await project.save();
  res.json(project);
});

module.exports = router;
