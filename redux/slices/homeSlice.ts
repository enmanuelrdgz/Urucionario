// store/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
    selectedLevel: number
}

const initialState: HomeState = {
  selectedLevel: 1
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    selectLevel: (state, action:PayloadAction<number>) => {
        state.selectedLevel = action.payload
    }
  },
});

export const {
    selectLevel
} = homeSlice.actions;

export default homeSlice.reducer;
