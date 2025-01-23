import mongoose from "mongoose";

const experiencesSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: [{ type: String, required: true }],
  state: { type: String, required: true },
  bestTimeToVisit: { type: String, required: true },
  idealDuration: { type: String, required: true },
  category: { type: String, required: true },
  categoryID: { type: String, required: true },
});

export const Experiences = mongoose.model("Experiences", experiencesSchema);
