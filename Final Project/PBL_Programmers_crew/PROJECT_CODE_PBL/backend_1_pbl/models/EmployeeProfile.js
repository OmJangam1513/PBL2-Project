const mongoose = require("mongoose");

const EmployeeProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      position: { type: String },
      department: { type: String },
      profileImage: { type: String }, // URL of the image
    },
    skills: [String], // List of skills
    certifications: [
      {
        title: { type: String },
        institution: { type: String },
        date: { type: Date },
        description: { type: String },
      },
    ],
    about: { type: String },
    pastExperience: [
      {
        position: { type: String },
        company: { type: String },
        duration: { type: String },
        description: { type: String },
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        title: { type: String },
        ref: "Project",
      },
    ],
    performance: [
      {
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          required: true,
        },
        tasksCompleted: {
          type: Number,
          default: 0,
        },
        taskDetails: [
          {
            type: mongoose.Schema.Types.ObjectId,
            description: { type: String },
            ref: "Task",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const EmployeeProfile = mongoose.model("EmployeeProfile", EmployeeProfileSchema);
module.exports = EmployeeProfile;
