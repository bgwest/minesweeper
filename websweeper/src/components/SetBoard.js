// SetBoard.js

var gameTimer = document.getElementById("gameTimer");
var timerText = document.getElementById("timerText");
var numberOfLegalSquares = 0;
var playerTimer;
var seconds = 0;
var minutes = 0;
var hours = 0; 

var neighborOffsets = [
  [-1, -1], [-1, 0], [-1, 1], [0, -1],/*,['0, 0'],*/ [0, 1], [1, -1], [1, 0], [1, 1],
];

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
  console.log('numOfBombs to be placed = ' + numOfBombs);
  while ( numberOfBombsPlaced < numOfBombs ) {
    var randomRow = Math.floor(Math.random() * lastRow);
    var randomCol = Math.floor(Math.random() * lastCol);
    var randomGameSquare = document.getElementById(`text-id-row${randomRow}col${randomCol}`);
    // avoid placing on squares that are already bombs, throws off the bomb count
    if ( randomGameSquare.innerHTML !== '*' ) {
       // place text bombs
      randomGameSquare.setAttribute("fill", `${squareDecoration.bomb.color}`);
      randomGameSquare.innerHTML = `${squareDecoration.bomb.text}`;
      numberOfBombsPlaced++;
    } 
  }
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

var genGuiPlayerHUD = function(submitButton) {

  function genGuiPlaceGameReset(submitButton) {
    // replace game selection form with a reset button for now
    var resetButton = document.createElement("button");
    resetButton.setAttribute("id","resetButton");
     // for now, reset button will refresh page but not remove gamedata
    resetButton.setAttribute("onclick", "location.reload();");
    resetButton.setAttribute("onmouseover", "this.style.borderWidth='3px'");
    resetButton.setAttribute("onmouseout", "this.style.borderWidth='1px'");
    resetButton.setAttribute("value","restart game");
    resetButton.innerHTML = 'reset';
    document.getElementsByClassName("sizeSelectionText")[0].style.display = 'none';
    // submitButton = htmlfrom -- so this replaces the entire intro form
    submitButton.parentNode.replaceChild(resetButton, submitButton);
  }
  
  function genGuiPlaceTimer() {
    timerText.innerHTML = `${hours}:${minutes}:${seconds}`;
  }

  genGuiPlaceGameReset(submitButton);
  genGuiPlaceTimer();
  timerOperations('on');
}

var getNumberOfLegalSquares = function() {
  var textSquares = document.getElementsByClassName('text-squares');
  for ( let i = 0; i !== textSquares.length; i++ ) {
    if ( textSquares[i].innerHTML !== "*" ) {
      numberOfLegalSquares+=1;
    }
  }
  console.log('numberOfLegalSquares = ' + numberOfLegalSquares);
  return numberOfLegalSquares;
}

var genGuiLegalSquaresRemaining = function() {
  var textSquares = document.getElementsByClassName('text-squares');
  var legalSquaresRemainingVal = 0;
  var uncoveredSquares = 0;
  for ( let i = 0; i < textSquares.length; i++ ) {
    if ( textSquares[i].innerHTML !== "*" && textSquares[i].getAttribute('fill-opacity') === '1.0' ) {
      uncoveredSquares+=1;
    }
  }
  legalSquaresRemainingVal = numberOfLegalSquares - uncoveredSquares;
  //console.log('legalSquares = ' + legalSquaresRemainingVal + ', numberOfBombsPlaced = ' + numberOfBombsPlaced);
  return legalSquaresRemainingVal;
}

var timerOperations = function(toggle) {
  
  var timerToggle = toggle;
  
  function startTimer() {
    seconds+= 1;
    if (seconds === 60 ){
      seconds = 0;
      minutes+= 1;
    }
    if (minutes === 60) {
      minutes = 0;
      hours+=1;
    }
    timerText.innerHTML = `${hours}:${minutes}:${seconds}`;
  }
  
  if ( timerToggle === 'on' ) {
    document.getElementsByClassName("timerElements")[0].style.display = 'grid';
    playerTimer = setInterval(function() {
      startTimer();
    }, 1000);
    return playerTimer;
  }

  if ( timerToggle === 'off' ) {
    //console.log('timerToggle = ' + timerToggle);
    clearInterval(playerTimer);
  }

}

var refreshLeaderBoard = function() {
  // check leaderBoard array if there is any new data to update
  // only update the best 5 games a player has played
  // game times are added to an array, fastest time first

    //<div class="playedGame">Game 1</div><div class="playedResult">empty</div>
}

export { genGuiPlaceBombs, genGuiPlaceNumbers, genGuiPlayerHUD, timerOperations, refreshLeaderBoard, getNumberOfLegalSquares, genGuiLegalSquaresRemaining };