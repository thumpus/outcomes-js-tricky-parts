function guessingGame() {
    const answer = Math.floor(Math.random() * 100);
    let gameFinished = false;
    let numGuesses = 0;

    return function guess(num) {
        if (gameFinished) return "Game ended";
        numGuesses++;

        if (num === answer) {
            gameFinished = true;
            return `A winner is you! The number was ${answer}. It took you ${numGuesses} guesses.`
        }

        if (num < answer) return `Your guess is too low!`
        if (num > answer) return `Your guess is too high!`
    }
}

module.exports = { guessingGame };
