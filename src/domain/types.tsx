export type Word = {
    id: number,
    word: string,
    hint: string,
    isGuessed: number,
}

export type Category = {
    id: number,
    name: string,
    description: string
    words: Word[]
}