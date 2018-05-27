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
  "bomb": { "color": 'red', "number": '*'},
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
var gameType = '';
var lastRow = 0;
var lastCol = 0;

var tile = document.createElementNS("http://www.w3.org/2000/svg", "svg");
tile.setAttribute("width", "1000");
tile.setAttribute("height", "1000");
boardTile.appendChild(tile);

var formDiv = document.getElementById("sizeSelection");
var htmlForm = document.getElementById("htmlform");

function getValue() {
  for (let i = 0; i < htmlForm.length; i++) {
   if (htmlForm[i].checked) {
    // alert(htmlForm[i].value);
    gameType = htmlForm[i].value;
    console.log(gameType);
    genGuiBoard(gameType);
    // hide user input for board selection for now
    // this might be changed to a new menu with "pause, restart, etc"
    formDiv.style.display = "none";
   }
  }
  console.log(submitsize.value);
}

function testReplaceClass(colNumRowNum) {
  // getAttributes - future function
  //var svgElement = document.getElementsByTagName("rect")[0].getAttribute("class");
  //var countRects = document.getElementsByTagName("rect").length;
  //console.log(svgElement);
  //console.log(`Number of rect elements=${countRects}`);

  //var svgSelectElement = document.getElementsByClassName(svgElement); 
  //console.log(svgSelectElement);
  // replace attribute
  colNumRowNum.style.fill='black';

}

function genGuiBoard(gameType) {
    if ( gameType === 'Large' ) {
        lastRow = 20;
        lastCol = 20;
    } else if ( gameType === 'Medium' ) {
        lastRow = 15;
        lastCol = 15;
    } else if ( gameType === 'Small' ) {
        lastRow = 10;
        lastCol = 10;
    }
  // row
  for (row = 0; row < lastRow; row++) {
    // col
    for (col = 0; col < lastCol; col++) {
      // rect
      var squareElem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      squareElem.setAttribute("class", `rect-col${col}-row${row}`);
      squareElem.setAttribute("id", `col${col}row${row}`);
      squareElem.setAttribute("width", `${width}px`);
      squareElem.setAttribute("height", `${height}px`);
      squareElem.setAttribute("x", `${xcord}`)
      squareElem.setAttribute("y", `${ycord}`)
      squareElem.setAttribute("stroke", "black");
      squareElem.setAttribute("stroke-opacity", "0.8");
      squareElem.setAttribute("fill", "grey");
      squareElem.setAttribute("fill-opacity", "0.5");
      squareElem.setAttribute("onclick", `testReplaceClass(col${col}row${row})`);    
      tile.appendChild(squareElem);
      
      // associated text / img with that square
      var textElem = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textElem.setAttribute("class", `text-col${col}-row${row}`);
      textElem.setAttribute("id", `text-col${col}row${row}`);
      textElem.setAttribute("x", `${textXcord}`);
      textElem.setAttribute("y", `${textYcord}`);
      textElem.setAttribute("font-size", "1.0em");
      textElem.setAttribute("fill", `${whatToPlaceAndHideAtStart.bomb.color}`);
      // should be 0.0 once testing is done
      textElem.setAttribute("fill-opacity", "0.8");
      textElem.innerHTML = `${whatToPlaceAndHideAtStart.bomb.number}`
      tile.appendChild(textElem);

      xcord+=width;
      textXcord+=width;
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
