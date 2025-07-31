import { Level } from '@/types/types';


export const initializeGame = async (): Promise<Level[]> => {
  return [
    {
      name: 'Nivel 1',
      isBlocked: false,
      words: [
        { word: 'manzana', hint: 'Fruta roja', isGuessed: false },
        { word: 'pera', hint: 'Fruta verde', isGuessed: false },
        { word: 'uva', hint: 'Fruta pequeña', isGuessed: false },
      ],
      image: require("@/assets/images/icon.png"),
      description: "nivel 1 description"
    },
    {
      name: 'Nivel 2',
      isBlocked: true,
      words: [
        { word: 'perro', hint: 'Animal doméstico', isGuessed: false },
        { word: 'gato', hint: 'Animal que maúlla', isGuessed: false },
      ],
      image: require("@/assets/images/icon.png"),
      description: "nivel 2 description"
    },
    {
      name: 'Nivel 3',
      isBlocked: false,
      words: [
        { word: 'manzana', hint: 'Fruta roja', isGuessed: false },
        { word: 'pera', hint: 'Fruta verde', isGuessed: false },
        { word: 'uva', hint: 'Fruta pequeña', isGuessed: false },
      ],
      image: require("@/assets/images/icon.png"),
      description: "nivel 2 description"
    },
    {
      name: 'Nivel 4',
      isBlocked: true,
      words: [
        { word: 'perro', hint: 'Animal doméstico', isGuessed: false },
        { word: 'gato', hint: 'Animal que maúlla', isGuessed: false },
      ],
      image: require("@/assets/images/icon.png"),
      description: "nivel 4 description"
    },
  ];
};