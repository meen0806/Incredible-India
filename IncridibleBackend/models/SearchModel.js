import mongoose from "mongoose";

// Place Schema
const PlaceSchema = new mongoose.Schema({
  placeId: {
    type: String,
    required: true
  },
  placeName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  popularDestination:
   { type: String,
     required: false },
     
  imageUrls: { type: [String], default: [] },
});

// City Schema
const CitySchema = new mongoose.Schema({
  cityId:
  {
    type: String,
    required: true
  },
  cityName:
  {
    type: String,
    required: true
  },
  cityDescription:
  {
    type: String,
    required: true
  },
  popularCity:
  {
    type: String,
    required: false
  },
  bestTimeToVisit:
  {
    type: String,
    required: true
  },
  imageUrls:
  {
    type: [String],
    default: []
  },

  placesToVisit: [PlaceSchema],
  historicalPlaces: [PlaceSchema],
});

const SearchSchema = new mongoose.Schema({
  stateId: { type: String, required: true },
  stateName: { type: String, required: true },
  stateDescription: { type: String, required: true },
  imageUrls: { type: [String], default: [] },
  cities: [CitySchema],
});

export const Search = mongoose.model("Search", SearchSchema);
