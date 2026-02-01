import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./reducer/exampleSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
