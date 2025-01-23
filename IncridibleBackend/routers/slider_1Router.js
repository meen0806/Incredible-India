import express from "express";

import {
  getAllSlider1Data,
  getAllSlider1DataById,
  AddSlider1Data,
  updateSlider1Data,
  deleteSlider1Data,
} from "../controllers/slider_1Controller.js";
import { upload } from "../middlewares/upload.js";
export const sliderRouter = express.Router();

sliderRouter.get("/sliderData", getAllSlider1Data);
sliderRouter.get("/sliderData/:id", getAllSlider1DataById);
sliderRouter.post("/sliderData", upload.single("url"), AddSlider1Data);
sliderRouter.put("/sliderData/:id",upload.single("url"), updateSlider1Data);
sliderRouter.delete("/sliderData/:id", deleteSlider1Data);
