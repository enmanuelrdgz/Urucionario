import { Level } from "@/domain/types";

export function getTotalWords(level: Level): number {
    return 0
}

export function getGessedWords(level: Level): number {
    return 0
}

export function getNextUnguessedWOrd(level: Level) {
    const next = level.words.find(word => !word.isGuessed);
    return next || null;
}

export function wordGuessed(targetWord: string, guess: string): boolean {
    if(targetWord == guess) {
        return true
    } else {
        return false
    }
}

