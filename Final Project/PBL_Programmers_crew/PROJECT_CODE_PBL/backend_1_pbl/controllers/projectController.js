const Project = require('../models/Project');

// Create Project (Only Department Head)
exports.createProject = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;
        
        if (!title || !description || !deadline) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const project = await Project.create({ title, description, deadline, createdBy: req.user.id });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get All Projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('employees', 'name email');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
