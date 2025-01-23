import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    default: () => Math.floor(Math.random() * 1000000), // or any other logic to generate a unique id
  },  name: { type: String, required: true },
  cityId: { type: Number, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: [String], required: true },
  website: { type: String, required: true },
  rating: { type: String, required: true },
});

export const Hotel = mongoose.model("Hotel", hotelSchema);
