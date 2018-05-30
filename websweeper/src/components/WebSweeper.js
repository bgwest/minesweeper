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



function onPlayerClick(e) {
  alert("game-square clicked");
}

class WebSweeper {
  constructor(gameType) {
    this._gameBoard = new MakeBoard(gameType);
    this._gameSquares =  document.getElementsByClassName("game-squares");
    this.initializeBoard();
  }

  initializeBoard() {
      if (this._gameSquares.length) {
        console.log("Exists!");
        // event listener for newly generated board
        for ( let i = 0; i < this._gameSquares.length; i++ ) {
          this._gameSquares[i].addEventListener("click", onPlayerClick, false);
        }
        console.log('Number of boardSquares= ' + this._gameSquares.length);
      }  
  }

  testReplaceById(colNumRowNum) {
    // replace attribute
    colNumRowNum.style.fill='black';
  } 

}