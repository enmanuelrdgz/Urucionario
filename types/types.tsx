export type Word = {
    word: string,
    hint: string,
    isGuessed: boolean
}

export type Level = {
    name: string,
    isBlocked: boolean
    words: Word[]
    image: number
    description: string
}

export type Game = {
    level: Level,
    targetWord: Word,
    currentGuess: string
}