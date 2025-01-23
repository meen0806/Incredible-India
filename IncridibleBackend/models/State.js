// import mongoose from "mongoose";

// const citySchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
// });
// const stateSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   cities: { type: [citySchema], required: true },
// });


// export const State = mongoose.model("State", stateSchema);


import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  cityName: { type: String, required: true },
  placeNames: { type: [String], required: true }, // Array of places in the city
});

const stateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  stateName: { type: String, required: true },  // State name
  cities: { type: [citySchema], required: true }, // Array of cities in the state
});

export const State = mongoose.model("State", stateSchema);
