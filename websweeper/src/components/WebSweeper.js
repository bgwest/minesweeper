// "Game": 'WebSweeper',
// "created by": 'benjamin g. west',
// "when": 'may 2018',
// "message": 'project collaboration is invited :)'

// express needed me to end file name with extension '.js'
import MakeBoard from './MakeBoard.js';
import playerClick from './GamePlay.js';

var gameType = '';
var htmlForm = document.getElementById("htmlform");
htmlForm.addEventListener("submit", receiveGameType);
 
function receiveGameType() {
    var formDiv = document.getElementById("sizeSelection");
    for (let i = 0; i < htmlForm.length; i++) {
     if (htmlForm[i].checked) {
      gameType = htmlForm[i].value;
      console.log(gameType);
      console.log(submitsize.value);
      formDiv.style.display = "none";
      // note:
      // instead of hiding the form, it could be changed to 
      // generating a new UI menu with "pause, restart, etc"
      // for sake of initial development, just hiding it for now
     }
    }
    var newGame = new WebSweeper(gameType);
    newGame.testReplaceById(col5row6);
}

var gameSquares = document.getElementsByClassName("game-squares");
// once game-squares exist, create event handlers for gameplay
var checkExist = setInterval(function() {
  if (gameSquares.length) {
    console.log("Exists!");
    // event listener for newly generated board
    var boardSquares = document.getElementsByClassName("game-squares");
    for ( let i = 0; i < boardSquares.length; i++ ) {
      boardSquares[i].addEventListener("click", onPlayerClick, false);
    }
    console.log('Number of boardSquares= ' + boardSquares.length);
    clearInterval(checkExist);
  }
}, 100);

function onPlayerClick(e) {
  alert("game-square clicked");
}

class WebSweeper {
  constructor(gameType) {
    this._gameBoard = new MakeBoard(gameType);
  }

  testReplaceById(colNumRowNum) {
    // replace attribute
    colNumRowNum.style.fill='black';
  } 

}