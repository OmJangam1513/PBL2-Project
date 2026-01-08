const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

const locationSchema = new mongoose.Schema({
  building: { type: String },
  floor: { type: String },
  room: { type: String },
});


const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slogan: {
      type: String,
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
    },

    mission: {
      type: String,
    },
    vision: {
      type: String,
    },
    about: {
      type: String,
    },
    goals: [
      {
        type: String,
      },
    ],
    achievements: [achievementSchema],
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    location: locationSchema,

    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },

    employeeCount: {
      type: Number,
      default: 0,
    },
    employees_name: [
      {
        type: String,
      },
    ],
    projectCount: {
      type: Number,
      default: 0,
    },
    project_name: [
      {
        type: String,
      },
    ],
    completedProjects: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;
