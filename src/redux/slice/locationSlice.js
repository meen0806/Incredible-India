import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constant/contant";
import axios from "axios";

export const fetchLocation = createAsyncThunk("locations/fetchLocation",async ()=>{
    try{
        const response = await axios.get(`${BASE_URL}/locations/`);
        return response.data;
    }catch(err){
        console.log("error in fetching location", err);
    }
})

const locationSlice = createSlice({
    name:"locations",
    initialState:{
        locations:[],
        loading:false,
        error:null,
    },
    
    extraReducers: (builder) => {
        builder
        .addCase(fetchLocation.pending, (state) => {
            state.loading = true; 
            state.error = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
          state.loading = false;
          state.locations = action.payload;
        })
        .addCase(fetchLocation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;  
        });
    },
})

export default locationSlice.reducer;