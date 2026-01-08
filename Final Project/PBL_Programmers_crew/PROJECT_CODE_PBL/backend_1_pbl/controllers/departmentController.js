const Department = require("../models/Department");

// Controller function to get department information by ID
exports.getDepartmentInfo = async (req, res) => {
  const { departmentId } = req.params;

  try {
    // Fetch the department from the database by departmentId
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json(department); // Return the department data as JSON
  } catch (error) {
    console.error("Error fetching department info:", error);
    res.status(500).json({ error: "Failed to fetch department information" });
  }
};
