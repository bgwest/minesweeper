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
  gameParams = { lastRow: 0, lastCol: 0, numOfBombs: 0 };
  if ( value === 'Large' ) {
      gameParams.lastRow = 16;
      gameParams.lastCol = 32;
      gameParams.numOfBombs = 99;
  } else if ( value === 'Medium' ) {
      gameParams.lastRow = 16;
      gameParams.lastCol = 16;
      gameParams.numOfBombs = 40;
  } else if ( value === 'Small' ) {
      gameParams.lastRow = 10;
      gameParams.lastCol = 10;
      gameParams.numOfBombs = 12;
  }
  return gameParams;
}

export { gameParams, submitButton };