import express from "express";
import {
  createExperiences,
  deleteExperiences,
  getAllExperiences,
  getExperiencesByCategoryId,
  updateExperiences,
} from "../controllers/experiencesController.js";
import { upload } from "../middlewares/upload.js";

export const experiencesRouter = express.Router();

experiencesRouter.get("/experiences", getAllExperiences);
experiencesRouter.get("/experiences/category/:categoryID",
  getExperiencesByCategoryId
);
experiencesRouter.post("/experiences", upload.array("url"), createExperiences);
experiencesRouter.put("/experiences/:id", upload.array("url"), updateExperiences);
experiencesRouter.post("/experiences/:_id", deleteExperiences);

