import express from "express";
import { register, login } from "../controllers/authController.js";
export const authRouter = express.Router();

// @route POST /api/auth/register
authRouter.post("/Register", register);

// @route POST /api/auth/login
authRouter.post("/Login", login);
