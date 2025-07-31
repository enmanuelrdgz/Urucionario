// store/gameSlice.ts
import { Level } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  level: Level | null;
  hint: string | null,
  targetWord: string[] | null,
  currentGuess: string[] | null;
  correctMatch: boolean;
  wrongMatch: boolean,
  currentGuessPos: number
}

const initialState: GameState = {
  level: null,
  hint: null,
  targetWord: null,
  currentGuess: null,
  correctMatch: false,
  wrongMatch: false,
  currentGuessPos: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setTargetWord: (state, action: PayloadAction<string[]>) => {
        state.targetWord = action.payload
    },
    addCharacter: (state, action: PayloadAction<string>) => {
        if(state.currentGuess != null){
            state.currentGuess[state.currentGuessPos] = action.payload
            state.currentGuessPos++;
          if(state.currentGuessPos == (state.currentGuess.length - 1)) {
            if(JSON.stringify(state.currentGuess) != JSON.stringify(state.targetWord)) {
              state.correctMatch = true
            } else {
              state.wrongMatch = false
            }
          }
        }
    },
    removeCharacter: (state) => {
      if(state.currentGuess != null) {
        state.currentGuess[state.currentGuessPos] = " ";
        state.currentGuessPos--;
      }

    },
    exitGame: () => {
      
    },
    startGame: (state, action: PayloadAction<Level>) => {
        let word = undefined
        let lenght = undefined;
        for (let i = 0; i < action.payload.words.length; i++) {
          if (!action.payload.words[i].isGuessed) {
            state.targetWord = action.payload.words[i].word.split("");
            state.hint = action.payload.words[i].hint;
            lenght = action.payload.words[i].word.length;
            break;
        }
      }
        state.level = action.payload;
        state.currentGuess = Array(lenght).fill(" ");
    }
  },
});

export const {
  addCharacter,
  removeCharacter,
  startGame
} = gameSlice.actions;

export default gameSlice.reducer;