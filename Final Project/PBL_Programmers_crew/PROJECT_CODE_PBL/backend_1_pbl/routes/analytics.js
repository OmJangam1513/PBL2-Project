const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Project = require("../models/Project");

// Employee: Task completion stats per project
router.get("/task-stats/:employeeId", async (req, res) => {
  const { employeeId } = req.params;

  const taskStats = await Task.aggregate([
    { $match: { assignedTo: employeeId } },
    {
      $group: {
        _id: "$projectId",
        totalTasks: { $sum: 1 },
        completedTasks: {
          $sum: {
            $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
          },
        },
      },
    },
  ]);

  res.json(taskStats);
});

// Project Head: Project task completion stats per project
router.get("/project-stats/:projectHeadId", async (req, res) => {
  const { projectHeadId } = req.params;

  const projects = await Project.find({ projectHead: projectHeadId });
  const projectIds = projects.map((p) => p._id);

  const stats = await Task.aggregate([
    { $match: { projectId: { $in: projectIds } } },
    {
      $group: {
        _id: "$projectId",
        totalTasks: { $sum: 1 },
        completedTasks: {
          $sum: {
            $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
          },
        },
      },
    },
  ]);

  res.json(stats);
});

module.exports = router;
