// GamePlay.js

var squareDecoration = {
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

function checkClickedSquare(squareRowIndex, squareColIndex, gameSquareId, textSquareId, gameParams) {
  // when a player clicks, the surrounding squares are checked for a bomb '*'
  var neighborOffsets = [
    [-1, -1], [-1, 0], [-1, 1], [0, -1],/*,['0, 0'],*/ [0, 1], [1, -1], [1, 0], [1, 1],
  ];
  var numberOfBombs = 0;
  neighborOffsets.forEach(offset => {
  // iterates through each array element referencing each of it's properties,
  // 0,1. +1 to whatever that index happens to be
  var neighborRowIndex = squareRowIndex + offset[0];
  var neighborColumnIndex = squareColIndex + offset[1];
  if (neighborRowIndex >= 0 && neighborRowIndex < gameParams.lastRow && neighborColumnIndex >= 0 && neighborColumnIndex < gameParams.lastCol) {
    var checkingSquare = document.getElementById(`text-id-col${neighborColumnIndex}row${neighborRowIndex}`);
    console.log(`checking square...`);
    console.dir(checkingSquare);
    checkingSquare = checkingSquare.innerHTML;
    // if the tile is valid aka not "off the board"
    if (checkingSquare === '*') {
      numberOfBombs++;
      console.log('numberOfBombs= ' + numberOfBombs);
     }
  }
  });
  var placeNumber = numberOfBombs;
  console.log('placeNumber(numberOfBombs) is = ' + placeNumber);
  var placeColor = squareDecoration[placeNumber].color;
  if ( placeNumber === 0 ) {
    // clear first square if it's surrounded by blank squares and call
    // clearSquares() to check the rest
    gameSquareId.setAttribute("fill-opacity", "1.0");
    gameSquareId.setAttribute("fill", `${placeColor}`);
    // clear squares and place numbers
    clearRemainingSquares(neighborOffsets);
  } else if ( placeNumber >= 1 ) {
  gameSquareId.setAttribute("fill-opacity", "0.0");
  textSquareId.innerHTML = `${placeNumber}`;
  textSquareId.setAttribute("fill", `${placeColor}`)
  textSquareId.setAttribute("fill-opacity", "1.0");
  }
}

function clearRemainingSquares(neighborOffsets) {
  // if a square is clicked and is blank, begin searching 8 positions around
  // square to clear. if 1 or more bombs are found surrounding the cleared tile,
  // print number do not move to that square to clear around it's perimeter.
}

// named export - Gameplay.js
var playGame = function (e, gameParams) {
var square = e.id;
console.log('gameParams.lastRow = ' + gameParams.lastRow)
// in order for a square to be click in any point, I needed to
// put the e.listener on both the text and game square
// the section determines what event listener I am working with
if ( square.startsWith("text") ) {
  console.log('text clicked - ' + square);
  var textSquareId = document.getElementById(`${square}`);
  var squareColIndex = textSquareId.getAttribute('data-colIndex');
  var squareRowIndex = textSquareId.getAttribute('data-rowIndex');
  var splitTextId = square.split("-", 3);
  splitTextId = splitTextId[2];
  var gameSquareId = document.getElementById(`${splitTextId}`);
} else if ( square.startsWith("col") ) {
  console.log('game clicked- ' + square);
  var gameSquareId = document.getElementById(`${square}`);
  var squareColIndex = gameSquareId.getAttribute('data-colIndex');
  var squareRowIndex = gameSquareId.getAttribute('data-rowIndex');
  var textSquareId = document.getElementById(`text-id-${square}`);
}
// convert squareRow/ColIndex from string to int
squareColIndex = parseInt(squareColIndex, 10);
squareRowIndex = parseInt(squareRowIndex, 10);
console.log('squareColIndex= ' + squareColIndex + ', ' + 'squareRowIndex= ' + squareRowIndex);
// Game play conditions and actions
var textSquareInnerHtml = textSquareId.innerHTML;
if ( textSquareInnerHtml === "#" ) {
  checkClickedSquare(squareRowIndex, squareColIndex, gameSquareId, textSquareId, gameParams);
} else if ( textSquareInnerHtml === "*" ) {
  gameSquareId.setAttribute("fill-opacity", "0.0");
  textSquareId.setAttribute("fill-opacity", "1.0");
  console.log('Game over.');
}
console.log('squareColIndex= ' + squareColIndex);
console.log('squareRowIndex= ' + squareRowIndex);
//console.log('gameSquareId = ' + gameSquareId.id);
//console.log('textSquareId = ' + textSquareId.id);
//alert("game-square clicked");
}

export { playGame };