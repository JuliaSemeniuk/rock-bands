import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//default export
import rockBandsReducer from "./rock-bands-slice";

export const store = configureStore({
  reducer: {
    rockBands: rockBandsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
