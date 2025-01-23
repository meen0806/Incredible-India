import express from "express";
import {
  getStatesWithCities,
  getCitiesByStateId,
  getPlacesByCityId
} from "../controllers/stateController.js";

export const stateRouter = express.Router();

stateRouter.get("/states", getStatesWithCities);
stateRouter.get("/states/cities/:stateId", getCitiesByStateId);
stateRouter.get("/states/cities/:cityId",getPlacesByCityId);

stateRouter.get("/states/:stateId/cities/:cityId/places", getPlacesByCityId);