const Task = require('../models/Task');

// Create Task (Only Project Head)
exports.createTask = async (req, res) => {
    try {
        const { title, description, projectId } = req.body;

        if (!title || !description || !projectId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const task = await Task.create({
            title,
            description,
            project: projectId,
            assignedBy: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate('project', 'title');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Assign Task (Only Project Head)
exports.assignTask = async (req, res) => {
    try {
        const { employeeId } = req.body;
        const taskId = req.params.taskId;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.assignedTo.push(employeeId);
        await task.save();

        res.status(200).json({ message: "Task assigned successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
