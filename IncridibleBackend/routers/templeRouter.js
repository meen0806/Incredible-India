import express from "express";
import {
  getAllTemples,
  createTemple,
  updateTemple,
  deleteTemple,
} from "../controllers/templeController.js";
import { upload } from "../middlewares/upload.js";

export const TempleRouter = express.Router();

TempleRouter.get("/temples", getAllTemples);
TempleRouter.post("/temples", upload.single("url"), createTemple);
TempleRouter.put("/temples/:id", upload.single("url"), updateTemple);
TempleRouter.delete("/temples/:id", deleteTemple);
