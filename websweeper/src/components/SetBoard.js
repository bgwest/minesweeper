// SetBoard.js

var squareDecoration = {
  "bomb": { "color": 'red', "text": '*'},
  // 'official colors'
  0: { "color": 'white'},
  1: { "color": 'blue' },
  2: { "color": 'green' },
  3: { "color": 'red' },
  4: { "color": 'purple' },
  5: { "color": 'maroon' },
  6: { "color": 'turquoise' },
  7: { "color": 'black' },
  8: { "color": 'gray'}
}

// named export - genGuiPlaceBombs
var genGuiPlaceBombs = function (lastRow, lastCol, numOfBombs) {
  let numberOfBombsPlaced = 0;
  while ( numberOfBombsPlaced < numOfBombs ) {
    var randomRow = Math.floor(Math.random() * lastRow);
    var randomCol = Math.floor(Math.random() * lastCol);
    var randomGameSquare = document.getElementById(`text-id-row${randomRow}col${randomCol}`);
    randomGameSquare.setAttribute("fill", `${squareDecoration.bomb.color}`);
    // place text bombs
    randomGameSquare.innerHTML = `${squareDecoration.bomb.text}`;
    numberOfBombsPlaced++;
  }
  console.log('Total bombs placed: ' + numberOfBombsPlaced);
}

// named export - genGuiPlaceNumbers
var genGuiPlaceNumbers = function (lastRow, lastCol) {
  // once bombs are laid, place numbers so Gameplay.js just consists of:
  // clicking, square clearing, single square clear, and or game over

  // look at every square on the board
  // if that square has a bomb, skip, and run neighbor check on next square.
  // skip again if it's a bomb and so on...
  var i;
  var textSquares = document.getElementsByClassName("text-squares");
  for ( i = 0; i < textSquares.length; i++ ) {
    var numberOfBombs = 0;
    var neighborOffsets = [
      [-1, -1], [-1, 0], [-1, 1], [0, -1],/*,['0, 0'],*/ [0, 1], [1, -1], [1, 0], [1, 1],
    ];
    //console.log('i= ' + i);
    var squareRowIndex = textSquares[i].getAttribute('data-rowIndex');
    var squareColIndex = textSquares[i].getAttribute('data-colIndex');
    // convert squareRow/ColIndex from string to int
    squareRowIndex = parseInt(squareRowIndex, 10);
    squareColIndex = parseInt(squareColIndex, 10);
    neighborOffsets.forEach(offset => {
      // first thing we want to do is check if the innerHTML on current 
      // iteration is a *, if it is, we can skip for now since we are just
      // placing the numbers.
      if ( textSquares[i].innerHTML === '*' ){
        //console.log('bomb found on ' + textSquares[i] + ' ... skipping');
      } else {
          // iterates through each array element referencing each of it's properties,
          // 0,1. +1 to whatever that index happens to be
          var neighborRowIndex = squareRowIndex + offset[0];
          var neighborColumnIndex = squareColIndex + offset[1];
          if (neighborRowIndex >= 0 && neighborRowIndex < lastRow && neighborColumnIndex >= 0 && neighborColumnIndex < lastCol) {
            var checkingSquare = document.getElementById(`text-id-row${neighborRowIndex}col${neighborColumnIndex}`);
            //console.log(`checking square...`);
            //console.dir(checkingSquare);
            //checkingSquare = checkingSquare.innerHTML;
            // if the tile is valid aka not "off the board"
            if (checkingSquare.innerHTML === '*') {
              numberOfBombs++;
              //console.log('numberOfBombs= ' + numberOfBombs);
             }
          }
        }
      });
      // write value to tile
      var placeNumber = numberOfBombs;
      var placeColor = squareDecoration[placeNumber].color;
      if ( placeNumber >= 1 ) {
      //gameSquareId.setAttribute("fill-opacity", "0.0");
      textSquares[i].innerHTML = `${placeNumber}`;
      textSquares[i].setAttribute("fill", `${placeColor}`)
      // comment out after testing
      //textSquares[i].setAttribute("fill-opacity", "1.0");
      }
  }
}

export { genGuiPlaceBombs, genGuiPlaceNumbers };