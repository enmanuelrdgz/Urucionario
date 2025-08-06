export type Word = {
    id: number,
    word: string,
    hint: string,
}

export type Level = {
    id: number,
    name: string,
    image: number
    description: string
    guessedWords: Word[],
    unGessedWords: Word[]
}