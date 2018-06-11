// GetGameParameters.js

// scriptName
var scriptName = 'GetGameParams.js';
// submitButton = named export
var submitButton = document.getElementById('htmlform');

// Page loading too quicky sometimes, so I created an event listener for DOMContentLoaded.
// Also, the anonymous function() preceeding the addFormListener() seemed to also be required. 
// ('DOMContentLoaded', addFormListener()) invoked immediately before I added function(){}.
document.addEventListener('DOMContentLoaded', function() {
    addFormListener();
});

function addFormListener() {
  // use to set or get playerName default for homepage
  localStorage.getItem('playerName') || localStorage.setItem('playerName', 'HelloPlayer');
  document.getElementById('playerName').value = localStorage.getItem('playerName');
  localStorage.getItem('datePlayed') || localStorage.setItem('datePlayed', 'TBD');
  localStorage.getItem('timeFinished') || localStorage.setItem('timeFinished', 'TBD');
  document.getElementById("legalSquaresLeft").style.display = 'none';
  // also required an anonymous function to prevent auto executing here...
  submitButton.addEventListener('submit', function() {
    for (let i = 0; i < submitButton.length; i++) {
      if (submitButton[i].checked) {
        determineGameParams(submitButton[i].value)
      }
    }
  },false)
}

// gameParams = named export
var gameParams = {};
function determineGameParams(value) {
  // gameParams TBD below
  var sheetType = document.getElementById("websweepStyle").getAttribute("href");
  gameParams = { size: value, lastRow: 0, lastCol: 0, numOfBombs: 0, width: 0, height: 0, 'sheetType': sheetType };
  if ( value === 'Large' ) {
      gameParams.lastRow = 16;
      gameParams.lastCol = 32;
      gameParams.numOfBombs = 99;
      gameParams.width = 646;
      gameParams.height = 324;
      if ( gameParams.sheetType === '/css/webmobile.css' ) {
        // helps support mobile without need for lots of manual pinch-zooming
        gameParams.lastCol = 16;
        gameParams.lastRow = 32;
        gameParams.width = 324;
        gameParams.height = 646;
      }
  } else if ( value === 'Medium' ) {
      gameParams.lastRow = 16;
      gameParams.lastCol = 16;
      gameParams.numOfBombs = 40;
      gameParams.width = 324;
      gameParams.height = 324;
  } else if ( value === 'Small' ) {
      gameParams.lastRow = 10;
      gameParams.lastCol = 10;
      gameParams.numOfBombs = 12;
      gameParams.width = 206;
      gameParams.height = 206;
  }
  gameParams.gameState = 'inplay';
  return gameParams;
}

export { gameParams, submitButton };