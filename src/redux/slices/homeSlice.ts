// store/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
    selectedCategory: number
}

const initialState: HomeState = {
  selectedCategory: 1
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    selectLevel: (state, action:PayloadAction<number>) => {
        state.selectedCategory = action.payload
    }
  },
});

export const {
    selectLevel
} = homeSlice.actions;

export default homeSlice.reducer;
