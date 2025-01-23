import express from "express";
import {
  getAllHotels,
  createHotel,
  getHotelByCityId,
  deleteHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import { upload } from "../middlewares/upload.js";

export const HotelRouter = express.Router();
HotelRouter.get("/hotels", getAllHotels);
//find hotels for the particular city
HotelRouter.get("/hotels/:cityId", getHotelByCityId);
HotelRouter.delete("/hotels/:id", deleteHotel);
HotelRouter.patch("/hotels/:id", upload.array("imageUrl", 5), updateHotel);
HotelRouter.post("/hotels", upload.array("url", 5), createHotel);

