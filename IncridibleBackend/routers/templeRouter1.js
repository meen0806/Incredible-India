import express from "express";
import {
  getTemples,
  updateTemple,
  deleteTemple,
  getTemplesByCityId,
} from "../controllers/templeController2.js";
import { upload } from "../middlewares/upload.js";

export const Templerouter1 = express.Router();

Templerouter1.get("/temples1", getTemples);
Templerouter1.put("/temples1/:id", upload.single("url"), updateTemple);
Templerouter1.delete("/temples1/:id", deleteTemple);
//get temple by city id
Templerouter1.get("/temples1/:cityId", getTemplesByCityId);
