import express from "express";
import {
  getAllDestinations,
  getDestinationsByCategoryId,
  createDestination,
  deleteDestination,
  updateDestination,
} from "../controllers/destinationController.js";
import { upload } from "../middlewares/upload.js";


export const destinationRouter = express.Router()
destinationRouter.get("/destinations", getAllDestinations);
destinationRouter.get(
  "/destinations/category/:categoryID",
  getDestinationsByCategoryId
);
destinationRouter.post("/destinations", upload.array("url"), createDestination);
destinationRouter.put("/destinations/:id",upload.array("url"), updateDestination);
destinationRouter.post("/destinations/:_id", deleteDestination);
