// store/gameSlice.ts
import { Level } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  levels: Level[];
  selectedLevel: Level | null;
}

const initialState: GlobalState = {
  levels: [],
  selectedLevel: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    loadLevels: (state, action: PayloadAction<Level[]>) => {
      state.levels = action.payload;
    },
    selectLevel: (state, action: PayloadAction<Level>) => {
      state.selectedLevel = action.payload
    }
  },
});

export const {
  loadLevels,
  selectLevel
} = globalSlice.actions;

export default globalSlice.reducer;