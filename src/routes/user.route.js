import { Router } from "express";
import { currentuser, loginUser, registerUser } from "../controllers/user.controller.js";
import { tokenValidator } from "../middleware/tokenValidator.js";

const userRoute = Router();

// Public Routes
userRoute.route("/register").post(registerUser);
userRoute.route("/login").post(loginUser);

// Protected Route
userRoute.route("/current").get(tokenValidator, currentuser);

export { userRoute };
