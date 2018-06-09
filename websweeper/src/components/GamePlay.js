// Gameplay.js

function convertEventData(square) {
  // in order for a square to be click in any point, I needed to
  // put the e.listener on both the text and game square
  // the section determines what event listener I am working with
  if (square.startsWith("text")) {
    console.log('text clicked - ' + square);
    var textSquareId = document.getElementById(`${square}`);
    var squareRowIndex = textSquareId.getAttribute('data-rowIndex');
    var squareColIndex = textSquareId.getAttribute('data-colIndex');
    var splitTextId = square.split("-", 3);
    splitTextId = splitTextId[2];
    var gameSquareId = document.getElementById(`${splitTextId}`);
  } else if ( square.startsWith("row") ) {
    console.log('game clicked- ' + square);
    var gameSquareId = document.getElementById(`${square}`);
    var squareRowIndex = gameSquareId.getAttribute('data-rowIndex');
    var squareColIndex = gameSquareId.getAttribute('data-colIndex');
    var textSquareId = document.getElementById(`text-id-${square}`);
  }
  // convert squareRow/ColIndex from string to int
  squareRowIndex = parseInt(squareRowIndex, 10);
  squareColIndex = parseInt(squareColIndex, 10);
  return { squareRowIndex, squareColIndex, gameSquareId, textSquareId };
}

function checkingBlankNeighbors(gameParams,neighborArr,clearArr) {
  // checkingBlankNeighbors() -- checking surrounding positions while neighborArr has value > 0.

  // 2D array with 8 potential values/positions... aka all the possible positions around a give square.
  var neighborOffsets = [ [-1, -1], [-1, 0], [-1, 1], [0, -1],/*,['0, 0'],*/ [0, 1], [1, -1], [1, 0], [1, 1] ];
  var lengthOfNeighborArr = neighborArr.length;
  // begin checking each position around the clicked square
  while ( lengthOfNeighborArr > 0 ) {
      // get values from neighbor check array
      var squareRowIndex = document.getElementById(neighborArr[0]).getAttribute('data-rowIndex');
      var squareColIndex = document.getElementById(neighborArr[0]).getAttribute('data-colIndex');
      squareRowIndex = parseInt(squareRowIndex, 10);
      squareColIndex = parseInt(squareColIndex, 10);
      
      neighborOffsets.forEach(offset => {  
        var neighborRowIndex = squareRowIndex + offset[0];
        var neighborColIndex = squareColIndex + offset[1];
         // ... if ( the tile is valid aka not null / off the board ) ...
        if (neighborRowIndex >= 0 && neighborRowIndex < gameParams.lastRow && neighborColIndex >= 0 && neighborColIndex < gameParams.lastCol) {
          var neighborSquare = document.getElementById(`text-id-row${neighborRowIndex}col${neighborColIndex}`);
          if ( neighborSquare.innerHTML === '#' ) {
            if ( clearArr.includes(neighborSquare.id) ) {
                // max adding attemps should be: corner square = 3, edge square = 5, 'mid square' = 8;
              } else {
                  neighborArr.push(neighborSquare.id);
                  clearArr.push(neighborSquare.id);
              }

          }
        }
      });
      // remove position 0 and continue to next 0 position if not empty
      neighborArr.splice(0, 1, );
      lengthOfNeighborArr = neighborArr.length;
  }
  return clearArr;
}

function checkingNumberedNeighbors(gameParams,neighborArr,clearArr,cleanBlankSquares) {
  // checkingNumberedNeighbors() -- checking surrounding positions while neighborArr has value > 0.

  // 2D array with 8 potential values/positions... aka all the possible positions around a give square.
  var neighborOffsets = [ [-1, -1], [-1, 0], [-1, 1], [0, -1],/*,['0, 0'],*/ [0, 1], [1, -1], [1, 0], [1, 1] ];
  neighborArr = cleanBlankSquares;
  var lengthOfNeighborArr = neighborArr.length;
  clearArr = [];
  // begin checking each position around the fed blank squares
  while ( lengthOfNeighborArr > 0 ) {
      // get values from neighbor check array
      var squareRowIndex = document.getElementById(neighborArr[0]).getAttribute('data-rowIndex');
      var squareColIndex = document.getElementById(neighborArr[0]).getAttribute('data-colIndex');
      squareRowIndex = parseInt(squareRowIndex, 10);
      squareColIndex = parseInt(squareColIndex, 10);
      
      neighborOffsets.forEach(offset => {  
        var neighborRowIndex = squareRowIndex + offset[0];
        var neighborColIndex = squareColIndex + offset[1];
         // ... if ( the tile is valid aka not null / off the board ) ...
        if (neighborRowIndex >= 0 && neighborRowIndex < gameParams.lastRow && neighborColIndex >= 0 && neighborColIndex < gameParams.lastCol) {
          var neighborSquare = document.getElementById(`text-id-row${neighborRowIndex}col${neighborColIndex}`);

          switch (neighborSquare.innerHTML) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                 if ( clearArr.includes(neighborSquare.id) ) {
                     // max adding attemps should be: corner square = 3, edge square = 5, 'mid square' = 8;
                   } else {
                       clearArr.push(neighborSquare.id);
                   }
            default:
                //console.log(`${neighborSquare.id} is not a numbered square.`);
          }    
        }
      });
      // remove position 0 and continue to next 0 position if not empty
      neighborArr.splice(0, 1, );
      lengthOfNeighborArr = neighborArr.length;
  }
  return clearArr;
}

function findAndClearBlankSquares(textSquareId,squareRowIndex,squareColIndex,gameParams) {
  // findAndClearBlankSquares() - this is only called if clickEvent returns a blank square '#'. 
  //   This function is used to loop and build a 'clearing array' by feeding to checkingBlankNeighbors
  //   until all elements in the array have returned 0
  
  // controls when checkNeighbor loop is finished -- starts by checking the click value
  var neighborArr = [ `${textSquareId}` ];
  // "removal queue"
  var clearArr = [];
  // because a blank square ['#'] was clicked, add it first to be cleared
  clearArr.push(neighborArr[0]);
  var cleanBlankSquares = checkingBlankNeighbors(gameParams,neighborArr,clearArr);
  cleanBlankSquares.forEach(queuedSquare => {
    var textSquare = document.getElementById(queuedSquare);
    textSquare.setAttribute("fill-opacity", "1.0");
    textSquare.innerHTML = '';
    var splitTextId = textSquare.id.split("-", 3);
    splitTextId = splitTextId[2];
    var gameSquare = document.getElementById(`${splitTextId}`);
    gameSquare.setAttribute("fill-opacity", "0.0");
  });

  // now clearArry must be checked for neighboring numbers. 
  var cleanNumberedSquares = checkingNumberedNeighbors(gameParams,neighborArr,clearArr,cleanBlankSquares);
  cleanNumberedSquares.forEach(queuedSquare => {
    var textSquare = document.getElementById(queuedSquare);
    textSquare.setAttribute("fill-opacity", "1.0");
    var splitTextId = textSquare.id.split("-", 3);
    splitTextId = splitTextId[2];
    var gameSquare = document.getElementById(`${splitTextId}`);
    gameSquare.setAttribute("fill-opacity", "0.0");
  });
}

// named export - Gameplay.js
var playerClick = function (e, gameParams) {
  var square = e.id;
  // take in event, parse, and set variables
  var clickEventData = convertEventData(square);
  var gameSquareId = clickEventData.gameSquareId;
  var textSquareId = clickEventData.textSquareId;
  var squareRowIndex = clickEventData.squareRowIndex;
  var squareColIndex = clickEventData.squareColIndex;
  // Game play conditions & actions
  var textSquareInnerHtml = textSquareId.innerHTML;
  // If a square has already been cleared -- save the CPU and do nothing
  var gameSquareFillOpacity = gameSquareId.getAttribute("fill-opacity");
  if ( gameSquareFillOpacity !== "0.0" ) {
    if ( textSquareInnerHtml === "#" ) {
      // get initial neighbor squares
      findAndClearBlankSquares(textSquareId.id, squareRowIndex,squareColIndex,gameParams);
      return gameParams.gameState = 'inplay';
    } else if ( textSquareInnerHtml === "*" ) {
        gameSquareId.setAttribute("fill-opacity", "1.0");
        gameSquareId.setAttribute("fill", "black");
        textSquareId.setAttribute("fill-opacity", "1.0");
        var gamestatusDiv = document.getElementById("gamestatus");
        var newHeader = document.createElement("h1");
        newHeader.setAttribute("class", "gameover");
        newHeader.innerHTML = 'GAME OVER'
        gamestatusDiv.appendChild(newHeader);
        document.querySelector(".gameover").style.position = 'fixed';
        document.getElementById("board").scrollIntoView({behavior: "smooth", block: "start"});
        var browsBody = document.getElementById("browserBody");
        browsBody.setAttribute("style", "zoom: 110%;");
        return gameParams.gameState = 'gameover';
      } else {
          // if square is a number just reveal number and no square clearing...
          gameSquareId.setAttribute("fill-opacity", "0.0");
          textSquareId.setAttribute("fill-opacity", "1.0");
          return gameParams.gameState = 'inplay';
        }
  } else {
      console.log('Square no more.');
      return gameParams.gameState = 'inplay';
  }
}

export { playerClick };