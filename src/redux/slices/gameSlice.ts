// store/gameSlice.ts
import { updateWord } from '@/db/db';
import { Word } from '@/src/domain/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { dataActions } from './dataSlice';


// targetWordArray: es una array de caracteres que representa la palabra objetivo.
// targetWordLength: es la longitud de la palabra objetivo.
// match: indica si la palabra ingresada coincide con la palabra objetivo. Es true si son iguales y ambas tienen la misma longitud, false en caso contrario.
// currentGuessArray: es un array de caracteres que representa la palabra ingresada por el usuario.
// currentGuessLength: es la longitud de la palabra ingresada por el usuario.

//currentGuessArray empieza siendo ["","","","",""] y se va llenando a medida que el usuario ingresa letras, sin modificar su tamano
interface GameState {
  categoryId: number;
  targetWordId: number;
  targetWordArray: string[];
  targetWordLength: number;
  currentGuessArray: string[];
  currentGuessLength: number;
  hint: string;
  match: boolean;
}

const initialState: GameState = {
  categoryId: 0,
  targetWordId: 0,
  targetWordArray: [],
  targetWordLength: 0,
  currentGuessArray: [],
  currentGuessLength: 0,
  hint: "",
  match: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Este reducer es llamado cuando el usuario escribe una nueva letra
    addCharacter: (state, action: PayloadAction<string>) => {
      if (state.currentGuessLength < state.targetWordLength) {
        state.currentGuessArray[state.currentGuessLength] = action.payload;
        state.currentGuessLength++;

        // Solo comparar si ya se ingresaron todas las letras
        if (state.currentGuessLength === state.targetWordLength) {
          state.match = JSON.stringify(state.currentGuessArray) === JSON.stringify(state.targetWordArray);
        }
      }
    },
    removeCharacter: (state) => {
      if (state.currentGuessLength > 0) {
        state.currentGuessLength--;
        state.currentGuessArray[state.currentGuessLength] = "";
      }
    },
    startGame: (state, action: PayloadAction<{word: Word, categoryId: number}>) => {
      state.targetWordId = action.payload.word.id;
      state.targetWordArray = action.payload.word.word.split('');
      state.targetWordLength = state.targetWordArray.length;
      state.hint = action.payload.word.hint;
      state.currentGuessArray = Array(state.targetWordLength).fill('');
      state.currentGuessLength = 0;
      state.match = false;
      state.categoryId = action.payload.categoryId;
    },
  },
});

// exportamos los action creators, excepto startGame porque se usa internamente
export const {
  addCharacter,
  removeCharacter,
} = gameSlice.actions;

// exportamos el reducer
export default gameSlice.reducer;

export const startGameThunk = (categoryId: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const category = getState().data.categories.find(category => category.id === categoryId)
    // si la categoria no tiene palabras, no hacemos nada
    if (!category || category.words.length == 0) return;

    const word = category.words.find(word => !word.isGuessed);

    // si no quedan palabras por adivinar, el thunk no hace nada
    if (!word) return;

    dispatch(gameSlice.actions.startGame({word, categoryId}));
  };

// este thunk se llama cuando el usuario adivina la palabra.
// lo que hace el thunk: actualizar el array global de categorias, de tal forma que la palabra que se adivio
// quede marcada como isGuessed: true. Ademas actualiza la palabra en la base de dato
export const wordGuessedThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
  debugger;
  const categoryId = getState().game.categoryId;
  const targetWordId = getState().game.targetWordId;
  const categories = getState().data.categories;

  const updatedCategories = categories.map(category => {
    if (category.id !== categoryId) return { ...category, words: [...category.words] }; // copia superficial de words

    return {
      ...category,
      words: category.words.map(word =>
        word.id === targetWordId ? { ...word, isGuessed: 1 } : { ...word }
      )
    };
  });

  dispatch(dataActions.loadcategories(updatedCategories));
  updateWord(targetWordId);

};
