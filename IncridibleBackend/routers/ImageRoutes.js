import express from "express";
import { register } from "../controllers/ImageUpload.js";
import { upload } from "../middlewares/upload.js";
export const UploadRouter = express.Router();

UploadRouter.post("/upload", upload.single("picture"), register);
