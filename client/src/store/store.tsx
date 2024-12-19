import { configureStore } from "@reduxjs/toolkit";
import { memoriesSlice } from "./memoriesSlice";

export const store = configureStore({
  reducer: {
    memories: memoriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
