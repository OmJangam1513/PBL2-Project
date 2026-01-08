const EmployeeProfile = require("../models/EmployeeProfile");
const Task = require("../models/Task");
const Project = require("../models/Project");

// Get Employee Profile
exports.getEmployeeProfile = async (req, res) => {
    try {
        const profile = await EmployeeProfile.findOne({ user: req.params.userId })
            .populate('projects')
            .populate('performance.projectId');

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Update Employee Profile
exports.updateEmployeeProfile = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            position,
            department,
            profileImage,
            about,
            skills,
            pastExperience,
        } = req.body;

        // Update personal profile details
        const updatedProfile = await EmployeeProfile.findOneAndUpdate(
            { user: req.params.userId },
            {
                $set: {
                    "personalDetails.name": name,
                    "personalDetails.email": email,
                    "personalDetails.phone": phone,
                    "personalDetails.position": position,
                    "personalDetails.department": department,
                    "personalDetails.profileImage": profileImage,
                    about,
                    skills,
                    pastExperience,
                },
            },
            { new: true } // Return the updated profile
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Update Task Performance (Trigger when task is completed)
exports.updateTaskPerformance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { taskId, status } = req.body;

    // Validate if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Validate if task is already completed
    if (task.status === "Completed") {
      return res.status(400).json({ message: "Task is already completed" });
    }

    // Update the task status to completed
    task.status = "Completed";
    await task.save();

    // Update Employee Profile to include the task completion
    const profile = await EmployeeProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Employee profile not found" });
    }

    // Find project and push task to employee's performance (task completion)
    const project = await Project.findById(task.project);
    const taskDetails = {
      taskId: task._id,
      projectId: project._id,
      taskDetails: task.description, // You can modify this based on your requirement
    };

    // Update the profile's performance
    profile.performance.push(taskDetails);
    await profile.save();

    return res.status(200).json({ message: "Task completed and performance updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
