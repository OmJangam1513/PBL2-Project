require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const employeeProfileRoutes = require('./routes/employeeProfileRoutes');
const analyticsRoutes = require("./routes/analytics");
const communicationRoutes = require('./routes/communicationRoutes');
const departmentRoutes = require("./routes/departmentRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const projectProgressRoutes = require("./routes/projectProgressRoutes");
const notesRoutes = require("./routes/notesRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from any origin (adjust for production)
  },
});

// Make io accessible in routes via req.app.get("io")
app.set("io", io);

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend to access backend
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/employee-profile', employeeProfileRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use('/api/communications', communicationRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/users", settingsRoutes);
app.use("/api/project-progress", projectProgressRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/news", newsRoutes);

// Error Handling Middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// MongoDB Connection with Error Handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit process if DB fails to connect
  }
};
connectDB();

// Socket.io Logic 
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  console.log("MongoDB Disconnected");
  process.exit(0);
});
