function playGame(userChoice, guessingRange, prizeMultiplier, previousPrize) {
  if (!userChoice) {
    alert('You did not become a millionaire, but can.');
  } else if (userChoice) {
    const maxAttempsCount = 3;
    let addedOneRandom = 1;
    let randomNumber = Math.floor(Math.random() * guessingRange + addedOneRandom);
    
    let prize = previousPrize;
    let valueMax = 10;
    let maxPrize = valueMax * prizeMultiplier;
    let mediumPrize = Math.floor(maxPrize / 2);
    let smallPrize = Math.floor(mediumPrize / 2);
    let prizes = [maxPrize, mediumPrize, smallPrize];
    let guessed = false;

    let attempts = 0;

    while (attempts < maxAttempsCount) {
      let message = 'Enter a number from 0 to ' + guessingRange + '\n'
      + 'Attempts left: ' + (maxAttempsCount - attempts) + '\n'
      + 'Total prize: ' + previousPrize + '$' + '\n'
      + 'Possible prize in current attempt ' + prizes[attempts] + '$' + '\n';
      
      let pickNumber = +prompt(message);
      if (pickNumber === randomNumber && !guessed) {
        prize += prizes[attempts];
        guessed = true;        
        break;
      }
      attempts++;
    }

    if (!guessed) {
      alert('Thank you for a game. Your prize is: ' + prize);
      let playAgain = confirm('Do you want to play again?');
      let numRandomOne = 5;
      let numRandomTwo = 1;
      playGame(playAgain, numRandomOne, numRandomTwo, 0);
    } else {
      let continueGame = confirm('Congratulation! Your prize is: ' + prize + '$. Do you want to continue?');
      playGame(continueGame, guessingRange * 2, prizeMultiplier * 3, prize);

      if (!continueGame) {
        alert('Thank you for a game. Your prize is: ' + prize);
        let playAgain = confirm('Do you want to play again?');
        let pickNumOne = 5;
        let pickNumTwo = 1;
        playGame(playAgain, pickNumOne, pickNumTwo, 0);
      }
    }
  }
}

let userPlay = confirm('Do you want to play a game?');
let anyNumber = 5;
let anyNumberTwo = 1;

playGame(userPlay, anyNumber, anyNumberTwo, 0);
