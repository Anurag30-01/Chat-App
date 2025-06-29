import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
// import protectRoute from "../middleware/protectRoute.js";
// import { updateProfile } from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/signup",(req,res)=>{
    res.send("signup Route");
});
router.get("/login",(req,res)=>{
    res.send("Login Route");
});
router.get("/logout",(req,res)=>{
    res.send("Logout Route");
});
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
export default router;
