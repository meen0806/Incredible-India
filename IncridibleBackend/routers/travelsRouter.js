import express from "express";
import {
  createTravel,
  getAllTravels,
  getTravelsByCategoryId,
  deleteTravels,
  updateTravels
} from "../controllers/travelController.js";
import { upload } from "../middlewares/upload.js";

export const travelRouter = express.Router();

travelRouter.get("/travels", getAllTravels);
travelRouter.get("/travels/category/:categoryID", getTravelsByCategoryId);
travelRouter.post("/travels", upload.array("url"), createTravel);
travelRouter.put("/travels/:id",  upload.array("url"),updateTravels);
travelRouter.post("/travels/:_id", deleteTravels);


