import { configureStore } from "@reduxjs/toolkit";
import contentSlice from "./slicers";

export const store = configureStore({
  reducer: {
    transactions: contentSlice,
  },
});
