// Find Your Hat - a command line game! Requires Node and prompt-sync module.

const prompt = require('C:/Users/cassa/node_modules/prompt-sync')({sigint: true});

class Field {
  constructor(field) {
    this.field = field;
  }
  print() {
    for (let i = 0; i < this.field.length; i++) {
      let row = '';
      for (let column = 0; column < this.field[i].length; column++) {
        row += this.field[i][column];
      }
      console.log(row);
    }
  }
  static generateField() {
    // get player input for field size
    let rows = 0;
    while (rows < 3 || rows > 15) {
      rows = Math.floor(Number(prompt('How many rows should your field have? (3-15) ')));
    }
    let columns = 0;
    while (columns < 3 || columns > 15) {
      columns = Math.floor(Number(prompt('How many columns should your field have? (3-15) ')));
    }
    // initialize field as empty array
    let field = [];
    // populate field with rows and columns of blank spaces
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        row.push('░');
      }
      field.push(row);
    }
    // set starting point to upper left corner
    field[0][0] = '*';
    // function to generate random position
    function positionGenerator() {
      const y = Math.floor(Math.random() * rows);
      const x = Math.floor(Math.random() * columns);
      return [y, x];
    }
    // randomly place hat, ensuring it's not at starting point
    let hatPosition = positionGenerator();
    while (hatPosition[0] === 0 && hatPosition[1] === 0) {
      hatPosition = positionGenerator();
    }
    field[hatPosition[0]][hatPosition[1]] = '^';
    // calculate approximately 25% of field area to fill with holes
    const numHoles = Math.floor((rows * columns) * .25);
    // randomly place holes, ensuring it doesn't replace hat, starting point, or previously placed holes
    let holesFilled = 0;
    while (holesFilled < numHoles) {
      let holePosition = positionGenerator();
      if (field[holePosition[0]][holePosition[1]] !== '*' && field[holePosition[0]][holePosition[1]] !== '^' && field[holePosition[0]][holePosition[1]] !== 'O') {
        field[holePosition[0]][holePosition[1]] = 'O';
        holesFilled++;
      }
    }
    return field;
  }
}

function playGame() {
  let sessionOver = false;
  while (!sessionOver) {
    let gameOver = false;
    console.log('---------------------\n~~~ FIND YOUR HAT ~~~\n---------------------');
    console.log('Welcome! Let\'s set up your playing field.');
    // generate field
    const playingField = new Field(Field.generateField());
    playingField.print();
    console.log('The * indicates your current path.');
    console.log('Your goal is to find your hat (^). Make sure to avoid any holes! (O)');
    // start at position [0][0] - top left corner
    let row = 0;
    let column = 0;
    while (!gameOver) {
      let direction;
      // get direction from player
      while (direction !== 'l' && direction !== 'r' && direction !== 'u' && direction !== 'd') {
        direction = prompt('Which direction do you want to go? (l/r/u/d) ').toLowerCase();
      }
      // move in the given direction
      if (direction === 'l') {
        column--;
      } else if (direction === 'r') {
        column++;
      } else if (direction === 'u') {
        row--;
      } else {
        row++;
      }
      // if new position out of bounds, terminate game
      if (!(row in playingField.field) || !(column in playingField.field[row])) { 
        console.log('You\'ve gone out of bounds! Game over.');
        gameOver = true;
      }
      // if user landed in hole, terminate game
      else if (playingField.field[row][column] === 'O') {
        console.log('You fell into a hole! Game over.');
        gameOver = true;
      }
      // if user found hat, game over and won
      else if (playingField.field[row][column] === '^') {
        console.log('You found your hat. You won!');
        gameOver = true;
      }
      // otherwise, continue the game
      else {
        playingField.field[row][column] = '*';
        playingField.print();
      }
    }
    // when game over, ask player whether to continue
    let continueSession;
    while (continueSession !== 'y' && continueSession !== 'n') {
      continueSession = prompt('Play again? (y/n) ').toLowerCase();
    }
    if (continueSession === 'n') {
      sessionOver = true;
    }
  }
}

playGame();