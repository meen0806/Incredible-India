import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
});

export const Slider1 = mongoose.model("Slider1", sliderSchema);
