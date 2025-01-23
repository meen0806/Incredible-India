import mongoose from "mongoose";

const templeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    default: () => Math.floor(Math.random() * 1000000), 
  },
  stateId: { type: String, required: true },
  cityId: { type: String, required: true },
  city: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  nearTemple: { type: String, required: true },
  state: { type: String, required: true },
  slug: String,
});

export const Temple1 = mongoose.model("Temple1", templeSchema);

