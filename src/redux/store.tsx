import { configureStore } from '@reduxjs/toolkit';
import { dataReducer } from './slices/dataSlice';
import gameReducer from "./slices/gameSlice";
import homeReducer from "./slices/homeSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    game: gameReducer,
    home: homeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;