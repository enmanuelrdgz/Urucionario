class Game {
    levelName: string | null;
    currentWord: string | null;
    spaces: number | null;
    answer: string[] | null;

    constructor() {
        this.levelName = null;
        this.currentWord = null;
        this.spaces = null;
        this.answer = null
    }

    answerPush(letter: string) {
        if(this.answer != null && this.spaces != null && this.answer.length < this.spaces && letter.length == 1)
            this.answer.push(letter)

        // en caso de que se llenen todos los slots
        this.compareWords()
    }

    answerPop() {
        if(this.answer != null)
            this.answer.pop();
    }

    answerClean() {
        if(this.answer != null)
            this.answer = [];
    }

    compareWords() {
        
    }

}