export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
  /* Note to self:
      this is the first time I have seen a function being called from the same class it is within, 
      without 'this' keyword. I assume it's because it is inside the constructor? 
      A scope definition I may not know yet? */
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  
  get playerBoard () {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!')
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
        //return gameOver = true;
    } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        //return gameOver = false;
    }
    this._numberOfTiles--;
  } // comment out the semicolon? are arrow functions supported in classes??
  
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    
    // 8 arrays within an array - a two dimensional array
    // aka the possible positions of a bomb at any given point, some pos's may be
    // null in which no check for a bomb is needed
    const neighborOffsets = [
      [-1, -1], [-1, 0], [-1, 1], [0, -1],/*,['0, 0'],*/ [0, 1], [1, -1], [1, 0], [1, 1],
    ];
    
    const numberOfRows = this._bombBoard.length;
    // just needs one of the rows element count, all cols in this example are the
    // same length
    const numberOfColumns = this._bombBoard[0].length;
    
    let numberOfBombs = 0;
    
    neighborOffsets.forEach(offset => {
      // iterates through each array element referencing each of it's properties,
      // 0,1. +1 to whatever that index happens to be
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        // if the tile is valid aka not "off the board"
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
         }
      }
    });
    return numberOfBombs;
  } // ; commented out the semicolon, are arrow functions supported in classes??

  hasSafeTiles() {
    // truthy, implicit return
    return this._numberOfTiles !== this._numberOfBombs;
  }

/* Iterate through the null values returned with playerBoard or bombBoard, at run time. 
     It is taking the null value and joining it with a |
     e.g. " | " " | " " | ".\n (the escaped n adds a new line at the end of each
   array element, within the nested array */

  print() {
    //console.log(this._board.map(row => row.join(' | ')).join('\n'));
    //console.log(this._board.playerBoard.map(row => row.join(' | ')).join('\n'));
    console.log(this._playerBoard.map(function (row) {
      return row.join(' | ');
    }).join('\n'));
  }

  // Player board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for ( let rowIndex = 0; rowIndex <= numberOfRows - 1; rowIndex++ ) {
      let row = [];
      for ( let colIndex = 0; colIndex <= numberOfColumns - 1; colIndex++ ){
        row.push(' ');
      } board.push(row);
    } return board;
  }

  // Bomb board
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for ( let rowIndex = 0; rowIndex <= numberOfRows - 1; rowIndex++ ) {
      let row = [];
      for ( let colIndex = 0; colIndex <= numberOfColumns - 1; colIndex++ ) {
        row.push(null);
      } board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while ( numberOfBombsPlaced < numberOfBombs ) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColIndex] !== 'B'){
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }

}
