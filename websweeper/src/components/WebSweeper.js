// "Game": 'WebSweeper',
// "created by": 'benjamin g. west',
// "when": 'June 2018',
// "message": 'project collaboration is invited :)'

// scriptName
var scriptName = 'WebSweeper.js';

// named imports
import { gameParams, submitButton } from './GetGameParameters.js';
import { genGuiBaseBoard } from './MakeBaseBoard.js';
import { genGuiPlaceBombs } from './SetBoard.js';
import { playGame } from './Gameplay.js';

// wait to create game board
document.addEventListener('DOMContentLoaded', function() { 
  waitForGameParams(); 
});
  
function waitForGameParams() {
  submitButton.addEventListener('submit', function() { 
  checkForGameParams(); },
false)};

function checkForGameParams() {
  if ( typeof gameParams.lastCol === 'undefined' ) {
      console.log(`${scriptName} - gameParams.lastCol = ${gameParams.lastCol}`);
      // if not found keep check again in a couple seconds
      setTimeout(checkForGameParams, 2000);
  } else {
      console.log(`${scriptName} - ready - gameParams.lastCol = ${gameParams.lastCol}`);
      makeGame();
  }
}

function makeGame() {
  // if gameParams have been given let's make the game!
  WebSweeper.MakeBaseBoard(gameParams.lastCol, gameParams.lastRow);
  WebSweeper.AddListeners();
  WebSweeper.SetBoard(gameParams.lastCol, gameParams.lastRow, gameParams.numOfBombs);
}

// Game Builder and click handler!
class WebSweeper {
  constructor(lastCol, lastRow, numOfBombs) {
      this._lastRow = lastRow;
      this._lastCol = lastCol;
      this._numOfBombs = numOfBombs;
  }
  
  static MakeBaseBoard(x, y) {
    console.log('called MakeBaseBoard');
    genGuiBaseBoard(x, y);
  }

  static AddListeners() {
    console.log('called AddListeners');
    var gameSquares = document.getElementsByClassName("game-squares");
    var textSquares = document.getElementsByClassName("text-squares");
    // event listeners for newly generated board squares
    for ( let i = 0; i < gameSquares.length; i++ ) {
      gameSquares[i].addEventListener("click", function() { 
        WebSweeper.GamePlay(gameSquares[i]) }, false);
      textSquares[i].addEventListener("click", function() { 
        WebSweeper.GamePlay(textSquares[i]) }, false);
    }
    //console.log('Number of boardSquares= ' + gameSquares.length);
  }

  static SetBoard(x, y, z) {
    console.log('called SetBoard');
    genGuiPlaceBombs(x, y, z);
  }

  static GamePlay(e) {
    playGame(e, gameParams);
  }

}
