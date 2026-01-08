const Progress = require("../models/Progress");

// Fetch project progress
exports.getProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;
    const progress = await Progress.findOne({ projectId });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found for this project" });
    }

    res.status(200).json({ progress: progress.progress });
  } catch (error) {
    console.error("Error fetching project progress:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update project progress
exports.updateProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ message: "Progress must be between 0 and 100" });
    }

    const updatedProgress = await Progress.findOneAndUpdate(
      { projectId },
      { $set: { progress } },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ message: "Project progress updated", progress: updatedProgress.progress });
  } catch (error) {
    console.error("Error updating project progress:", error);
    res.status(500).json({ message: "Server error", error });
  }
};