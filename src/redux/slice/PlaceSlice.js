import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/contant";

export const fetchPlace = createAsyncThunk("place/fetchPlace", async () => {
  try{
    const response = await axios.get(`${BASE_URL}/places/`);
    console.log("response of place data ", response);
    console.log("response of place data ", response.data);
  return response.data;
}catch(err){
console.log("Error fetching places",err);
}});

const placeSlice = createSlice({
  name: "places",
  initialState: {
    places: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPlace.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(fetchPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;  
      });
  },
});

export default placeSlice.reducer;
