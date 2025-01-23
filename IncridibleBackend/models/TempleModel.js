import mongoose from "mongoose";

const templeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    default: () => Math.floor(Math.random() * 1000000), // or any other logic to generate a unique id
  },
  stateId: { type: String, required: true },
  cityId: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String, required: false },
  city: { type: String, required: false },
  url: { type: String, required: true },
  description: { type: String, required: true },
});

export const Temple = mongoose.model("Temple", templeSchema);
