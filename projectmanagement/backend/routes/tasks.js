const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

// Create task
router.post('/', auth, async (req,res)=>{
  const {projectId,title,description} = req.body;
  const task = new Task({title,description,project:projectId});
  await task.save();
  res.json(task);
});

// Update task status
router.put('/:id', auth, async (req,res)=>{
  const task = await Task.findById(req.params.id);
  if(!task) return res.status(404).json({message:"Task not found"});
  task.status = req.body.status;
  await task.save();
  res.json(task);
});

module.exports = router;
