import express from "express";
import {
  createExploreMore,
  getExploreMore,
  getExploreMoreById,
  updateExploreMore,
  deleteExploreMore,
  deleteInnerExploreMoreData,
} from "../controllers/exploreMoreController.js";
import { upload } from "../middlewares/upload.js";

export const exploreMoreRouter = express.Router();

exploreMoreRouter.post("/exploreMore/:id",upload.single("url"), createExploreMore);
exploreMoreRouter.get("/exploreMore", getExploreMore);
exploreMoreRouter.get("/exploreMore/:id", getExploreMoreById);
exploreMoreRouter.put("/exploreMore/:id",upload.single("url"), updateExploreMore);
exploreMoreRouter.delete("/exploreMore/:id", deleteExploreMore);
exploreMoreRouter.post("/innerExploreMore/:id", deleteInnerExploreMoreData);

