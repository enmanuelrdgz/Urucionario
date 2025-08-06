// store/gameSlice.ts
import { saveLevel } from '@/db/db';
import { Word } from '@/domain/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { saveDataSuccess } from './dataSlice';

interface GameState {
  hint: string;
  targetWordArray: string[];
  targetWordLength: number;
  currentGuessArray: string[];
  match: boolean;
  currentGuessLength: number;
  targetWordId: number;
  level: number;
  showWinScreen: boolean;
}

const initialState: GameState = {
  hint: "",
  targetWordArray: [],
  targetWordLength: 0,
  currentGuessArray: [],
  match: false,
  currentGuessLength: 0,
  targetWordId: 0,
  level: 0,
  showWinScreen: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<string>) => {
      if (state.currentGuessLength < state.targetWordLength) {
        state.currentGuessArray[state.currentGuessLength] = action.payload;
        state.currentGuessLength++;

        // Solo comparar si ya se ingresaron todas las letras
        if (state.currentGuessLength === state.targetWordLength) {
          state.match = JSON.stringify(state.currentGuessArray) == JSON.stringify(state.targetWordArray);
        }
      }
    },
    removeCharacter: (state) => {
      if (state.currentGuessLength > 0) {
        state.currentGuessLength--;
        state.currentGuessArray[state.currentGuessLength] = "";
      }
    },
    startGame: (state, action: PayloadAction<Word>) => {
      const wordArray = action.payload.word.split('');
      state.hint = action.payload.hint;
      state.targetWordArray = wordArray;
      state.currentGuessArray = Array(wordArray.length).fill('');
      state.match = false;
      state.currentGuessLength = 0;
      state.targetWordLength = wordArray.length;
      state.targetWordId = action.payload.id;
    },
  },
});

export const {
  addCharacter,
  removeCharacter,
  startGame
} = gameSlice.actions;

export default gameSlice.reducer;

// Thunks

export const startGameThunk = (levelId: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const levels = getState().data.levels;
    const level = levels.find(l => l.id === levelId);
    if (!level || level.unGessedWords.length === 0) return;

    const word = level.unGessedWords[0];
    dispatch(startGame(word));
  };

export const wordGuessedThunk = () =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const selectedLevelId = getState().home.selectedLevel;
    const levels = getState().data.levels;
    const originalLevel = levels.find(l => l.id === selectedLevelId);
    if (!originalLevel) return;
    const level = {
      ...originalLevel,
      guessedWords: [...originalLevel.guessedWords],
      unGessedWords: [...originalLevel.unGessedWords],
    };
    const wordIndex = level.unGessedWords.findIndex(
      w => w.id === getState().game.targetWordId
    );

    if (wordIndex === -1) {
      return;
    };
    const word = level.unGessedWords[wordIndex];

    // Mover la palabra de unGessedWords a guessedWords
    console.log(`Moviendo palabra "${word.word}" a guessedWords`);
    level.unGessedWords.splice(wordIndex, 1);
    console.log(`Palabra "${word.word}" eliminada de unGessedWords`);
    level.guessedWords.push(word);
    console.log(`Palabra "${word.word}" movida a guessedWords`);
    // Guardar en base de datos
    try {
      const savedLevel = await saveLevel(level);
      console.log(`Nivel ${savedLevel.id} guardado con éxito.`);
      dispatch(saveDataSuccess(savedLevel));
    } catch (error) {
      console.error("Error al guardar el nivel:", error);
    }
  };
