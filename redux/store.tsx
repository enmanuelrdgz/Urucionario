import { configureStore } from '@reduxjs/toolkit';
import gameReducer from "./slices/gameSlice";
import globalReducer from './slices/globalSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    game: gameReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;