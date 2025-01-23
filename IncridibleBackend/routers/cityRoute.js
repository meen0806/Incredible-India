import express from "express";
import { createCity, fetchCities, fetchCityById } from "../controllers/cityController.js";
// import { cityValidation } from "../middlewares/validations.js";

export const cityRoute = express.Router();

cityRoute.get("/cities",fetchCities)
cityRoute.get("/citie/:id",fetchCityById)

// cityRoute.post("/cities",cityValidation ,createCity)
