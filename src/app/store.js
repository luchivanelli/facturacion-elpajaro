import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/itemsSlice";
import infoReducer from "../features/infoSlice"

export const store = configureStore({
  reducer: { 
    items: itemsReducer,
    info: infoReducer 
  },
});