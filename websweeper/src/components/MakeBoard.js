// express needed me to end file name with extension '.js'
import { placeMines, countMines } from './SetBoard.js';

class MakeBoard {
  constructor(gameType) {
    this._gameType = gameType;
    this._setBoard = MakeBoard.genGuiBoard(gameType);
  }

  get setBoard () {
    return this._setBoard;
  }
  
  // needs to be static to call directly on class -- failed without it
  static genGuiBoard(gameType) {
    // make base elements and set attributes
    var boardTile = document.getElementById("board");
    var width = 20;
    var height = width;
    var row = 0;
    var col = 0;
    var xcord = 0;
    var ycord = 0;
    
    // bombs
    var numberOfBombs = 0;
    // testing -- may be changed
    var whatToPlaceAndHideAtStart = {
      "bomb": { "color": 'red', "number": '*', "quantity": numberOfBombs },
      "one": { "color": 'blue', "number": 1 },
      "two": { "color": 'green', "number": 2 },
      "3": { "color": 'red', "number": 3 },
      "4": { "color": 'purple', "number": 4 },
      "5": { "color": 'maroon', "number": 5 },
      "6": { "color": 'turquoise', "number": 6 },
      "7": { "color": 'black', "number": 7 },
      "8": { "color": 'gray', "number": 8 }
    }
    
    // text element coords
    var textXcord = 6;
    var textYcord = 15;
    
    // affected by user input
    var lastRow = 0;
    var lastCol = 0;
    
    var tile = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tile.setAttribute("width", "1000");
    tile.setAttribute("height", "1000");
    boardTile.appendChild(tile);

    if ( gameType === 'Large' ) {
        lastRow = 16;
        lastCol = 32;
        whatToPlaceAndHideAtStart.bomb.quantity = 99;
    } else if ( gameType === 'Medium' ) {
        lastRow = 16;
        lastCol = 16;
        whatToPlaceAndHideAtStart.bomb.quantity = 40;
    } else if ( gameType === 'Small' ) {
        lastRow = 10;
        lastCol = 10;
        whatToPlaceAndHideAtStart.bomb.quantity = 10;
    }
    // row
    for (row = 0; row < lastRow; row++) {
      let bombCount = 0;
      // col
      for (col = 0; col < lastCol; col++) {
        // rect
        var squareElem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        squareElem.setAttribute("class", "game-squares");
        squareElem.setAttribute("id", `col${col}row${row}`);
        squareElem.setAttribute("width", `${width}px`);
        squareElem.setAttribute("height", `${height}px`);
        squareElem.setAttribute("x", `${xcord}`)
        squareElem.setAttribute("y", `${ycord}`)
        squareElem.setAttribute("stroke", "black");
        squareElem.setAttribute("stroke-opacity", "0.8");
        squareElem.setAttribute("fill", "grey");
        squareElem.setAttribute("fill-opacity", "0.5");
        //squareElem.setAttribute("onclick", `newGame.testReplaceById(col${col}row${row})`);    
        tile.appendChild(squareElem);
        
        // associated text / img with that square
        var textElem = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElem.setAttribute("class", `text-col${col}-row${row}`);
        textElem.setAttribute("id", `text-col${col}row${row}`);
        textElem.setAttribute("x", `${textXcord}`);
        textElem.setAttribute("y", `${textYcord}`);
        textElem.setAttribute("font-size", "1.0em");
        // should be 0.0 once testing is done
        textElem.setAttribute("fill-opacity", "0.8");
        textElem.setAttribute("fill", `${whatToPlaceAndHideAtStart.bomb.color}`);
        textElem.innerHTML = `${whatToPlaceAndHideAtStart.bomb.number}`;
        tile.appendChild(textElem);
  
        xcord+=width;
        textXcord+=width;
        bombCount+=1;
        // debug console - uncomment if needed
        //console.log(`colloop: ycord=${ycord}, row=${row} | xcord=${xcord}, col=${col}`);
      }
      // reset x
      xcord=0;
      textXcord=6;
      // continue y
      ycord+=width;
      textYcord+=width;
    }
  }
}

export default MakeBoard;