import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve frontend static files if available
const __dirname = path.resolve();
const frontendBuildPath = path.join(__dirname, 'frontend', 'dist');

console.log('Looking for frontend build folder at:', frontendBuildPath);

if (fs.existsSync(frontendBuildPath)) {
  console.log('✅ Frontend build folder found. Serving static files.');
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  console.error(
    '❌ Frontend build folder not found. Please run `npm run build` inside the frontend folder.'
  );
}

// Start server and connect to DB
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
