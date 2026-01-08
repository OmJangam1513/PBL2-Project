const mongoose = require("mongoose")

const UserSettingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preferences: {
      type: Map,
      of: String,
      default: {},
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
    },
    // Add any other settings that you want to store for the user
  },
  { timestamps: true }
)

const UserSettings = mongoose.model("UserSettings", UserSettingsSchema)
module.exports = UserSettings
