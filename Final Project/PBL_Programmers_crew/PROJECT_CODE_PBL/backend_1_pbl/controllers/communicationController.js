const User = require("../models/User");

// Controller to handle fetching user communications
exports.getCommunications = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Temporary placeholder for meetings (Meeting model not implemented yet)
    const meetings = []; // TODO: Replace with actual Meeting.find(...) later

    // Get all other users except the current one
    const users = await User.find({ _id: { $ne: userId } });

    // Return the data as JSON response
    res.json({
      meetings,
      users, // fixed from 'employees'
    });
  } catch (error) {
    console.error("Error fetching communications:", error);
    res.status(500).json({ error: "Failed to load communications" });
  }
};
