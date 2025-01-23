import {State} from "../models/State.js"

export const getStatesWithCities = async (req, res) => {
  try {
    const states = await State.find().populate("cities");
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: "Error fetching states", error });
  }
};

export const getCitiesByStateId = async (req, res) => {
  const { stateId } = req.params;
  try {
    const state = await State.findOne({ id: stateId });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json(state.cities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities", error });
  }
};



export const getPlacesByCityId = async (req, res) => {
  const { stateId, cityId } = req.params; // Get stateId and cityId from the request parameters
  try {

    const state = await State.findOne({ id: stateId });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

   
    const city = state.cities.find((city) => city.id === cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found in the specified state" });
    }

   
    res.status(200).json(city.placeNames);
  } catch (error) {
    res.status(500).json({ message: "Error fetching places", error });
  }
};
