import { Level } from "@/domain/types";

const levels: Level[] = [
  {
    id: 1,
    name: "ANIMALES DEL BOSQUE",
    image: require("@/assets/images/capibara.png"),
    description: "ADIVINA LOS ANIMALES QUE VIVEN EN EL BOSQUE.",
    guessedWords: [],
    unGessedWords: [
      { id: 1, word: "ZORRO", hint: "ANIMAL ASTUTO DE PELAJE ROJIZO" },
      { id: 2, word: "BÚHO", hint: "AVE NOCTURNA DE GRANDES OJOS" },
      { id: 3, word: "CIERVO", hint: "MAMÍFERO CON ASTAS" }
    ]
  },
  {
    id: 2,
    name: "FRUTAS TROPICALES",
    image: require("@/assets/images/capibara.png"),
    description: "ENCUENTRA LAS FRUTAS TÍPICAS DE CLIMAS CÁLIDOS.",
    guessedWords: [
      { id: 4, word: "MANGO", hint: "FRUTA JUGOSA DE COLOR ANARANJADO" }
    ],
    unGessedWords: [
      { id: 5, word: "PIÑA", hint: "FRUTA CON CORONA Y PIEL RUGOSA" },
      { id: 6, word: "PAPAYA", hint: "FRUTA DE PULPA NARANJA Y SEMILLAS NEGRAS" }
    ]
  },
  {
    id: 3,
    name: "INSTRUMENTOS MUSICALES",
    image: require("@/assets/images/capibara.png"),
    description: "INSTRUMENTOS USADOS EN ORQUESTAS Y BANDAS.",
    guessedWords: [
      { id: 7, word: "VIOLÍN", hint: "INSTRUMENTO DE CUERDA TOCADO CON ARCO" },
      { id: 8, word: "TROMPETA", hint: "INSTRUMENTO DE VIENTO METÁLICO" }
    ],
    unGessedWords: [
      { id: 9, word: "PIANO", hint: "INSTRUMENTO DE CUERDAS Y TECLAS" }
    ]
  }
];

export default levels;
