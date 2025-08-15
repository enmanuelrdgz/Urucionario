// store/gameSlice.ts
import { getCategories, initDB } from '@/src/db/db';
import { Category } from '@/src/domain/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

interface DataState {
  categories: Category[];
  loading: boolean;
  error: string | null
  selectedLevel: number;
}

const initialState: DataState = {
  categories: [],
  loading: true,
  error: null,
  selectedLevel: 0,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    // este reducer se encarga de setear las categorias en la aplicacionss
    loadcategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
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
  },
});

const dataActions = dataSlice.actions;

const dataReducer = dataSlice.reducer;

// este thunk se encarga obtener las categorias desde la base de datos
// y actualizar el dataSlice con las categorias obtenidass
const initGameThunk = () => 
  async (dispatch: AppDispatch) => {
    debugger
    initDB();
    dispatch(dataSlice.actions.fetchDataRequest());
    const categories = getCategories();
    dispatch(dataActions.loadcategories(categories));
    dispatch(dataSlice.actions.fetchDataSuccess());
};

export { dataActions, dataReducer, initGameThunk };
