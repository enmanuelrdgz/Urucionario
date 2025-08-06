// store/gameSlice.ts
import { fetchLevels } from '@/db/db';
import { Level } from '@/domain/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

interface DataState {
  levels: Level[];
  loading: boolean;
  error: string | null
  selectedLevel: number;
}

const initialState: DataState = {
  levels: [],
  loading: true,
  error: null,
  selectedLevel: 0,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    loadLevels: (state, action: PayloadAction<Level[]>) => {
      state.levels = action.payload;
    },
    selectLevel: (state, action: PayloadAction<number>) => {
      state.selectedLevel = action.payload
    },
    fetchDataError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state) => {
      state.loading = false;
    },
    saveDataRequest: (state) => {

    },
    saveDataSuccess: (state, action: PayloadAction<Level>) => {

    },
  },
});

export const {
  loadLevels,
  selectLevel,
  saveDataSuccess
} = dataSlice.actions;

export default dataSlice.reducer;

export const fetchDataThunk = () => 
  async (dispatch: AppDispatch) => {
    try {
      dispatch(dataSlice.actions.fetchDataRequest());
      const levels = await fetchLevels();
      dispatch(loadLevels(levels));
      dispatch(dataSlice.actions.fetchDataSuccess());
    } catch (error: any) {
      dispatch(dataSlice.actions.fetchDataError(error.message));
    }
};