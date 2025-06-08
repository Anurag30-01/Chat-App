import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar } from "../controllers/user.controller.js";
import { updateProfile } from "../controllers/user.controller.js";
import upload from "../middleware/upload.js"; // Import the multer upload middleware
const router = express.Router();

router.get("/", protectRoute, getUserForSidebar);

router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);

export default router;
