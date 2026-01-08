const UserSettings = require("../models/UserSettings")
const User = require("../models/User")

// Get Settings for a user
exports.getSettings = async (req, res) => {
  try {
    const { userId } = req.params

    // Check if the user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Fetch the user settings (you can modify this to match your schema)
    const settings = await UserSettings.findOne({ user: userId })
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" })
    }

    return res.status(200).json(settings)
  } catch (err) {
    console.error("Error fetching settings:", err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
}

// Update Settings for a user
exports.updateSettings = async (req, res) => {
  try {
    const { userId } = req.params
    const settingsData = req.body

    // Check if the user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update the settings (you can modify this to match your schema)
    const updatedSettings = await UserSettings.findOneAndUpdate(
      { user: userId },
      settingsData,
      { new: true } // Return the updated document
    )

    if (!updatedSettings) {
      return res.status(404).json({ message: "Settings not found for update" })
    }

    return res.status(200).json(updatedSettings)
  } catch (err) {
    console.error("Error updating settings:", err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
}
