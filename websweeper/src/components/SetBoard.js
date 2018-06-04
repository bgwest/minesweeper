// SetBoard.js

// may be changed
var whatToPlaceAndHideAtStart = {
    "bomb": { "color": 'red', "number": '*', "quantity": 1 }
}

// named export - genGuiPlaceBombs
var genGuiPlaceBombs = function (lastCol, lastRow, numOfBombs) {
  let numberOfBombsPlaced = 0;
  while ( numberOfBombsPlaced < numOfBombs ) {
    var randomCol = Math.floor(Math.random() * lastCol);
    var randomRow = Math.floor(Math.random() * lastRow);
    var randomGameSquare = document.getElementById(`text-id-col${randomCol}row${randomRow}`);
    randomGameSquare.setAttribute("fill", `${whatToPlaceAndHideAtStart.bomb.color}`);
    // place text bombs
    randomGameSquare.innerHTML = `${whatToPlaceAndHideAtStart.bomb.number}`;
    numberOfBombsPlaced++;
  }
  console.log('Total bombs placed: ' + numberOfBombsPlaced);
}

export { genGuiPlaceBombs };