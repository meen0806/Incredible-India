import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./slice/PlaceSlice";
import locationReducer from "./slice/locationSlice";
import categoryReducer from "./slice/categorySlice";

const store = configureStore({
    reducer:{
       places : placeReducer,
       locations : locationReducer,
       categories : categoryReducer
    }
})

export default store;